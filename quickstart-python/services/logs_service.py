from monday_code import LogsApi, WriteLogRequestBody, LogMethods

from models import APITypes
from services import with_monday_api


class LogsService:
    """
    A service for logging messages with different levels.
    """

    @classmethod
    @with_monday_api(APITypes.LOGS, "write_log")
    async def __send_log_to_api(cls, message: str, method: LogMethods, payload: dict = None, api_instance: LogsApi = None):
        """
        Writes a log message with the given level using the monday API.
        """
        write_log_request_body = WriteLogRequestBody(
            message=message, method=method, payload=payload)
        return await api_instance.write_log(write_log_request_body)

    @classmethod
    async def __log(cls, message: str, method: LogMethods, payload: dict = None):
        """
        Logs a message with the given level. If an error occurs, raises a LoggingError.
        """
        try:
            await cls.__send_log_to_api(message, method, payload)
        except Exception as e:
            print(
                f"Unable to log the following message: {message}. Additional error: {e}")

    @classmethod
    def __log_sync(cls, message: str, method: LogMethods, payload: dict = None):
        """
        Synchronous logging with fallback to print. Used for error handlers.
        """
        try:
            import asyncio
            asyncio.run(cls.__log(message, method, payload))
        except Exception:
            print(f'[{method.value.upper()}] {message}')

    @classmethod
    async def info(cls, message: str, payload: dict = None):
        return await cls.__log(message, LogMethods.INFO, payload)

    @classmethod
    async def error(cls, message: str, payload: dict = None):
        return await cls.__log(message, LogMethods.ERROR, payload)

    @classmethod
    async def debug(cls, message: str, payload: dict = None):
        return await cls.__log(message, LogMethods.DEBUG, payload)

    @classmethod
    async def warning(cls, message: str, payload: dict = None):
        return await cls.__log(message, LogMethods.WARN, payload)

    @classmethod
    def error_sync(cls, message: str, payload: dict = None):
        """Synchronous error logging for use in error handlers"""
        return cls.__log_sync(message, LogMethods.ERROR, payload)
