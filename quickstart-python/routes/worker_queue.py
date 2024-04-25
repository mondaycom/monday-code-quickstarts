from flask import Blueprint, request

from services import parse_queue_message

worker_queue_bp = Blueprint('worker_queue', __name__)


@worker_queue_bp.route('/mndy-queue', methods=['POST'])
def handle_queue_message():
    try:
        data = request.get_json()
        parse_queue_message(data)
        return 'Received', 200
    except Exception as e:
        print(f"Error: {e}")
        return 'Error in processing request', 500
