import json

from monday_code import PublishMessageParams, QueueApi

from models import APITypes
from services import with_monday_api, StorageService, MailService, LogsService


class QueueService:
    @staticmethod
    @with_monday_api(APITypes.QUEUE, "publish_message")
    async def publish_message(message: dict, api_instance: QueueApi = None) -> None:
        """
        This function will publish a message to our queue
        """
        publish_message_params = PublishMessageParams(
            message=json.dumps(message))
        return await api_instance.publish_message(publish_message_params)

    @staticmethod
    async def parse_queue_message(message: dict) -> None:
        """
        This function will parse the message from the queue to do some long-running process according to it's content
        """
        # Some long-running process, for example, sending an email
        # todo: Implement better parsing and handling of the message
        await LogsService.debug(f"Received message: {message}")
        message = json.loads(message.get('content'))
        if message.get('method') == 'send_mail':
            monday_access_token = message.get('user_token')
            storage_service = StorageService(monday_access_token)
            mail_address = await storage_service.get('mail_address')
            content = message.get('content')
            await MailService.send_mail(mail_address, content)
