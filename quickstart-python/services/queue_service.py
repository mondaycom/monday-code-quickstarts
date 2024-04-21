import json

from monday_code import ApiException, ApiClient, QueueApi, PublishMessageParams
from urllib3.exceptions import RequestError

from errors import QueueProcessingError
from handlers import mcode_configuration


def publish_message(message: dict) -> None:
    with ApiClient(mcode_configuration) as api_client:
        api_instance = QueueApi(api_client)
        try:
            publish_message_params = PublishMessageParams(message=json.dumps(message))
            api_response = api_instance.publish_message(publish_message_params)
            print(f"The response of QueueApi->publish_message:\n{api_response}")
        except (ApiException, RequestError) as e:
            raise QueueProcessingError(f"Exception when calling QueueApi->publish_message: {e}")


def read_queue_message(message: dict) -> None:
    # Some long-running process
    print(f"Received message: {message}")
