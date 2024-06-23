from monday_code import LogsApi, WriteLogRequestBody, LogMethods

from models import APITypes
from services import with_monday_api


class LogsService:
    @classmethod
    @with_monday_api(APITypes.LOGS, "write_log")
    def __log(cls, message: str, method: LogMethods, api_instance: LogsApi = None):
        try:
            write_log_request_body = WriteLogRequestBody(message=message, method=method)
            api_instance.write_log(write_log_request_body)
        except Exception as e:
            print(f"Unable to log the following message: {message}")
            print(f"Additional error occurred in LogsService: {e}")

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
