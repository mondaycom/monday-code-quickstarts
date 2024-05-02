import secrets
from urllib.parse import urlencode

from flask import request, Blueprint, redirect, make_response

from consts import SecretKeys
from errors import GenericBadRequestError
from middlewares import monday_request_auth
from services import SecureStorage, SecretService, JWTService

auth_bp = Blueprint('auth', __name__)


@auth_bp.route('/', methods=['GET'])
@monday_request_auth
def authorize():
    """
    Redirects the user to the monday.com OAuth2 authorization page.
    First stage of the OAuth flow, Invoked when the user clicks on `Use template` for instance
    """
    user_id = str(request.session.get('userId'))
    back_to_url = request.session.get('backToUrl')

    connection = SecureStorage.get(user_id)
    if connection and connection.get('monday_token'):
        return redirect(back_to_url)

    SecureStorage.put(user_id, {'back_to_url': back_to_url})

    # The state parameter is used for CSRF protection. It's a random string sent to the server and returned back.
    # The client should only trust the response if the returned state matches the sent state.
    state = secrets.token_urlsafe(16)  # Generate a random state for CSRF protection

    params = {'client_id': SecretService.get_secret(SecretKeys.MONDAY_OAUTH_CLIENT_ID), 'state': state}
    redirect_url = f"{SecretService.get_secret(SecretKeys.MONDAY_OAUTH_BASE_PATH)}?{urlencode(params)}"

    response = make_response(redirect(redirect_url))
    response.set_cookie('user_id', user_id)
    # Save the state in a cookie for later validation, can be stored in the server as well
    response.set_cookie('state', state)

    return response


@auth_bp.route('/monday/callback', methods=['GET'])
def monday_callback():
    """
    Callback URL for the OAuth2 flow.
    Saves the monday.com token in the storage for later access.
    """
    code = request.args.get('code')
    user_id = request.cookies.get('user_id')

    validate_state()

    monday_token = JWTService.get_monday_token(code)

    back_to_url = SecureStorage.get(user_id).get('back_to_url')
    SecureStorage.put(user_id, {'monday_token': monday_token})
    return redirect(back_to_url)


def validate_state() -> None:
    """
    Validates the state parameter from the OAuth2 callback.
    """
    returned_state = request.args.get('state')
    saved_state = request.cookies.get('state')
    if returned_state != saved_state:
        raise GenericBadRequestError('Invalid state')
