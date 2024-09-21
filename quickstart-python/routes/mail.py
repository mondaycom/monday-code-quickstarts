from flask import Blueprint, request

from errors import InternalServerError
from middlewares import monday_request_auth
from services import QueueService, StorageService, SecureStorage
from services.logs_service import LogsService

mail_bp = Blueprint('mail', __name__)


@mail_bp.route('/send', methods=['POST'])
@monday_request_auth
def send_mail():
    """
    Example of a route that receives a POST request and calls the Queue Service to handle the process in the background.
    """
    user_id = request.session.get('userId')
    payload = request.get_json().get('payload')
    LogsService.info(f"##### {payload}")
    board_id = payload.get('inputFields').get('boardId', 'Example Board ID')
    # In real world scenarios, the relevant content and address can be extracted a graphQL query to monday's API
    # using the board_id and other input fields set in the workflow blocks in Monday developer center
    content = f"Some trigger just ran! check the board - {board_id}"
    address = payload.get('inputFields').get('text')

    monday_token = SecureStorage.get(user_id, default_value={}).get('monday_token', {}).get('access_token', None)
    if not monday_token:
        raise InternalServerError('monday_token not found')
    # Simulate mail address already saved in the storage, only for StorageService usage example
    StorageService(monday_token).upsert('mail_address', address)

    QueueService.publish_message({'method': 'send_mail', 'content': content, 'user_token': monday_token})
    return 'Received', 200
