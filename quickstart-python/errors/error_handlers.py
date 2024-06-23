from flask import jsonify
from werkzeug.exceptions import HTTPException

from errors import MondayCodeAPIError, BaseError, InternalServerError


def handle_general_http_exception(exception: HTTPException):
    print(f'Error: {exception}')
    response = jsonify({
        'error': 'HTTPException',
        'message': str(exception)
    })
    response.status_code = exception.code
    return response


def handle_internal_error(exception: InternalServerError):
    print(f'Error: {exception}')
    response = jsonify({
        'error': 'Error in processing request',
    })
    response.status_code = exception.status_code
    return response


def handle_base_error(exception: BaseError):
    response = jsonify({
        'error': exception.message,
    })
    response.status_code = exception.status_code
    return response
