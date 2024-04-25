import json

from monday_code import PublishMessageParams

from services import with_monday_api
from models import APITypes


class QueueService:
    @staticmethod
    @with_monday_api(APITypes.QUEUE, "publish_message")
    def publish_message(api_instance, message: dict) -> None:
        publish_message_params = PublishMessageParams(message=json.dumps(message))
        api_response = api_instance.publish_message(publish_message_params)
        print(f"The response of QueueApi->publish_message:\n{api_response}")

    @staticmethod
    def parse_queue_message(message: dict) -> None:
        """
        This function will parse the message from the queue and do some long-running process according to it's content
        """
        # Some long-running process
        print(f"Received message: {message}")
