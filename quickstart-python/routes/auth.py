from urllib.parse import urlencode

from flask import request, Blueprint, redirect

from consts import SecretKeys
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
    user_id = request.session.get('userId')
    back_to_url = request.session.get('backToUrl')

    connection = SecureStorage.get(user_id)
    if connection and connection['monday_token']:
        return redirect(back_to_url)

    SecureStorage.put(user_id, {'back_to_url': back_to_url})

    params = {'client_id': SecretService.get_secret(SecretKeys.MONDAY_OAUTH_CLIENT_ID), 'state': user_id}
    redirect_url = f"{SecretService.get_secret(SecretKeys.MONDAY_OAUTH_BASE_PATH)}?{urlencode(params)}"
    return redirect(redirect_url)


@auth_bp.route('/monday/callback', methods=['GET'])
def monday_callback():
    """
    Callback URL for the OAuth2 flow.
    Saves the monday.com token in the storage for later access.
    """
    code = request.args.get('code')
    user_id = request.args.get('state')

    monday_token = JWTService.get_monday_token(code)

    back_to_url = SecureStorage.get(user_id).get('back_to_url')
    SecureStorage.put(user_id, {'monday_token': monday_token})
    return redirect(back_to_url)
