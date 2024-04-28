from flask import Blueprint, request

from middlewares import monday_request_auth
from services import QueueService, StorageService, SecureStorage

mail_bp = Blueprint('mail', __name__)


@mail_bp.route('/send', methods=['POST'])
@monday_request_auth
def send_mail():
    """
    Example of a route that receives a POST request and calls the Queue Service to handle the process in the background.
    """
    user_id = request.session.get('userId')
    payload = request.get_json().get('payload')
    board_id = payload.get('inputFields').get('boardId', 'Example Board ID')
    # In real world scenarios, the relevant content and address can be extracted a graphQL query to monday's API
    # using the board_id and other input fields set in the workflow blocks in Monday developer center
    content = f"Some trigger just ran! check the board - {board_id}"
    address = "admin.mail@example.com"

    monday_token = SecureStorage.get(user_id).get('monday_token').get('access_token')
    # Simulate mail address already saved in the storage, only for StorageService usage example
    StorageService(monday_token).upsert('mail_address', address, '1')

    QueueService.publish_message({'method': 'send_mail', 'content': content, 'user_token': monday_token})
    return 'Received', 200
