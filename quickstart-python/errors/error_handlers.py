from flask import jsonify
from werkzeug.exceptions import HTTPException

from errors import MondayCodeAPIError, BaseError


def handle_general_http_exception(exception: HTTPException):
    print(f'Error: {exception}')
    response = jsonify({
        'error': 'HTTPException',
        'message': str(exception)
    })
    response.status_code = exception.code
    return response


def handle_monday_code_api_error(exception: MondayCodeAPIError):
    print(f'Error: {exception.api_type}, {exception}')
    response = jsonify({
        'error': 'Error in processing request',
    })
    response.status_code = 500
    return response


def handle_base_error(exception: BaseError):
    response = jsonify({
        'error': exception.message,
    })
    response.status_code = exception.status_code
    return response
