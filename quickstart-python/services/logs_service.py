from monday_code import LogsApi, WriteLogRequestBody, LogMethods

from models import APITypes
from services import with_monday_api


class LogsService:
    @classmethod
    @with_monday_api(APITypes.LOGS, "write_log")
    def __log(cls, message: str, method: LogMethods, api_instance: LogsApi = None):
        write_log_request_body = WriteLogRequestBody(message=message, method=method)
        return api_instance.write_log(write_log_request_body)

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
