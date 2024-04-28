from flask import Blueprint, request

from services import QueueService

worker_queue_bp = Blueprint('worker_queue', __name__)


@worker_queue_bp.route('/mndy-queue', methods=['POST'])
def handle_queue_message():
    """
    This route will receive the callback from our queue and process it,
    Letting the queue wait instead of a user
    """
    data = request.get_json()
    QueueService.parse_queue_message(data)
    return 'Received', 200
