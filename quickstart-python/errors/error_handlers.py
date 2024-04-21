from flask import jsonify

from errors import MondayCodeAPIError


def handle_general_http_exception(exception):
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


def handle_bad_request_error(exception):
    response = jsonify({
        'error': 'Bad Request',
        'message': str(exception)
    })
    response.status_code = 400
    return response
