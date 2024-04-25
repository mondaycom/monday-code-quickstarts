from flask import Blueprint, request

from services import publish_message, decode_monday_jwt

mail_bp = Blueprint('mail', __name__)


@mail_bp.route('/', methods=['POST'])
def send_mail():
    """
    Example of a route that receives a POST request and calls the Queue Service to handle the process in the background.
    """
    token = request.cookies.get('token')
    decode_monday_jwt(token)
    data = request.get_json()
    publish_message({'method': 'send_mail', 'data': data, 'token': token})
    return 'Received', 200
