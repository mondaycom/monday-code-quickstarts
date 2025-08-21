import secrets
from urllib.parse import urlencode

from flask import request, Blueprint, redirect, make_response

from consts import EnvironmentKeys
from errors import GenericBadRequestError
from middlewares import monday_request_auth
from services import SecureStorage, JWTService, EnvironmentVariablesService, LogsService

auth_bp = Blueprint('auth', __name__)


@auth_bp.route('/', methods=['GET'])
@monday_request_auth
async def authorize():
    """
    Redirects the user to the monday.com OAuth2 authorization page.
    First stage of the OAuth flow, Invoked when the user clicks on `Use template` for instance
    """
    user_id = str(request.session.get('userId'))
    back_to_url = request.session.get('backToUrl')

    # Check for existing connection
    connection = await SecureStorage.get(user_id)
    if connection and connection.get('monday_token'):
        return redirect(back_to_url)

    # Store back_to_url for later use
    await SecureStorage.put(user_id, {'back_to_url': back_to_url})

    # Generate a random state for CSRF protection
    state = secrets.token_urlsafe(16)

    # Get OAuth configuration
    client_id = await EnvironmentVariablesService.get_environment_variable(
        EnvironmentKeys.MONDAY_OAUTH_CLIENT_ID)
    oauth_base_path = await EnvironmentVariablesService.get_environment_variable(
        EnvironmentKeys.MONDAY_OAUTH_BASE_PATH)

    params = {'client_id': client_id, 'state': state}
    redirect_url = f"{oauth_base_path}?{urlencode(params)}"

    # Create response with cookies
    response = make_response(redirect(redirect_url))
    response.set_cookie('user_id', user_id)
    response.set_cookie('state', state)

    await LogsService.info("OAuth flow started", {'user_id': user_id})
    return response


@auth_bp.route('/monday/callback', methods=['GET'])
async def monday_callback():
    """
    Callback URL for the OAuth2 flow.
    Saves the monday.com token in the storage for later access.
    """
    code = request.args.get('code')
    user_id = request.cookies.get('user_id')

    validate_state()

    monday_token = await JWTService.get_monday_token(code)

    back_to_url = (await SecureStorage.get(user_id)).get('back_to_url')
    await SecureStorage.put(user_id, {'monday_token': monday_token})
    return redirect(back_to_url)


def validate_state() -> None:
    """
    Validates the state parameter from the OAuth2 callback.
    """
    returned_state = request.args.get('state')
    saved_state = request.cookies.get('state')
    if returned_state != saved_state:
        raise GenericBadRequestError('Invalid state')
