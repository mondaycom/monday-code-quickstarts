import asyncio
from flask import jsonify
from werkzeug.exceptions import HTTPException

from errors import BaseError, InternalServerError


def _log_error(message: str):
    """Simple async logging with fallback to print"""
    try:
        from services import LogsService
        asyncio.run(LogsService.error(message))
    except Exception:
        print(f'[Error] {message}')


def handle_general_http_exception(exception: HTTPException):
    _log_error(f'HTTPException: {exception}')
    response = jsonify({'error': 'HTTPException', 'message': str(exception)})
    response.status_code = exception.code
    return response


def handle_internal_error(exception: InternalServerError):
    _log_error(f'InternalServerError: {exception}')
    response = jsonify({'error': 'Error in processing request'})
    response.status_code = exception.status_code
    return response


def handle_base_error(exception: BaseError):
    response = jsonify({
        'error': exception.message,
    })
    response.status_code = exception.status_code
    return response
