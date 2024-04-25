from urllib.parse import urlencode

from flask import request, Blueprint, redirect

from consts import SecretKeys
from handlers import mcode_configuration
from middlewares import auth_required
from services import SecureStorage, get_secret
from services import get_monday_token

auth_bp = Blueprint('auth', __name__)


@auth_bp.route('/', methods=['GET'])
@auth_required
def authorize():
    """
    Redirects the user to the monday.com OAuth2 authorization page.
    First stage of the OAuth flow, Invoked when the user clicks on `Use template` for instance
    """
    user_id = request.session.get('userId')
    back_to_url = request.session.get('backToUrl')
    storage = SecureStorage(mcode_configuration)

    connection = storage.get(user_id)
    if connection and not connection['monday_token']:
        return redirect(back_to_url)

    storage.put(user_id, {'back_to_url': back_to_url})

    params = {'client_id': get_secret(SecretKeys.MONDAY_OAUTH_CLIENT_ID), 'state': user_id}
    redirect_url = f"{get_secret(SecretKeys.MONDAY_OAUTH_BASE_PATH)}?{urlencode(params)}"
    return redirect(redirect_url)


@auth_bp.route('/monday/callback', methods=['GET'])
def monday_callback():
    """
    Callback URL for the OAuth2 flow.
    Saves the monday.com token in the storage for later access.
    """
    code = request.args.get('code')
    user_id = request.args.get('state')
    storage = SecureStorage(mcode_configuration)

    monday_token = get_monday_token(code)

    back_to_url = storage.get(user_id).get('back_to_url')
    storage.put(user_id, {'monday_token': monday_token})
    return redirect(back_to_url)
