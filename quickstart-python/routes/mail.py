from flask import Blueprint, request

from services.queue_service import publish_message

mail_bp = Blueprint('mail', __name__)


@mail_bp.route('/', methods=['POST'])
def send_mail():
    """
    Example of a route that receives a POST request and calls the Queue Service to handle the process in the background.
    """
    publish_message(request.get_json())
    return 'Received', 200
