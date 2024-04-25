from flask import Blueprint, request

from middlewares import auth_required
from services import QueueService, StorageService, SecureStorage

mail_bp = Blueprint('mail', __name__)


@mail_bp.route('/', methods=['POST'])
@auth_required
def send_mail():
    """
    Example of a route that receives a POST request and calls the Queue Service to handle the process in the background.
    """
    user_id = request.session.get('userId')
    monday_token = SecureStorage.get(user_id).get('monday_token')
    data = request.get_json()
    address = data.get('address')
    content = data.get('content')

    # Simulate mail address already saved in the storage
    StorageService(monday_token).upsert('mail_address', address, '1')

    QueueService.publish_message({'method': 'send_mail', 'content': content, 'token': monday_token})
    return 'Received', 200
