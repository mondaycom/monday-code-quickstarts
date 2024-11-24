from services import LogsService


class MailService:
    @staticmethod
    def send_mail(mail_address: str, content: str):
        """
        Function that sends an email to the given address with the given content.
        """
        # Send email logic
        LogsService.info(f"Sending mail to {mail_address} with content: {content}",
                         payload={'content': content, 'mail_address': mail_address})
        pass
