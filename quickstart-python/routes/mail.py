from flask import Blueprint, request, jsonify

from services import publish_message, validate_jwt_token

mail_bp = Blueprint('mail', __name__)


@mail_bp.route('/', methods=['POST'])
def send_mail():
    """
    Example of a route that receives a POST request and calls the Queue Service to handle the process in the background.
    """
    token = request.cookies.get('token')
    if not token or not validate_jwt_token(token):
        return jsonify({'error': 'Invalid or missing token'}), 401

    publish_message(request.get_json())
    return 'Received', 200
