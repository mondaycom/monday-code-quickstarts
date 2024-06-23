from monday_code import LogsApi, WriteLogRequestBody, LogMethods

from models import APITypes
from services import with_monday_api


class LogsService:
    """
    A service for logging messages with different levels.
    """

    @classmethod
    @with_monday_api(APITypes.LOGS, "write_log")
    def __send_log_to_api(cls, message: str, method: LogMethods, api_instance: LogsApi = None):
        """
        Writes a log message with the given level using the monday API.
        """
        write_log_request_body = WriteLogRequestBody(message=message, method=method)
        api_instance.write_log(write_log_request_body)

    @classmethod
    def __log(cls, message: str, method: LogMethods):
        """
        Logs a message with the given level. If an error occurs, raises a LoggingError.
        """
        try:
            cls.__send_log_to_api(message, method)
        except Exception as e:
            print(f"Unable to log the following message: {message}. Additional error: {e}")

    @classmethod
    def info(cls, message: str):
        return cls.__log(message, LogMethods.INFO)

    @classmethod
    def error(cls, message: str):
        return cls.__log(message, LogMethods.ERROR)

    @classmethod
    def debug(cls, message: str):
        return cls.__log(message, LogMethods.DEBUG)

    @classmethod
    def warning(cls, message: str):
        return cls.__log(message, LogMethods.WARN)
