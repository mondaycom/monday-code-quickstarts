from flask import jsonify

from errors.api_errors import MondayCodeAPIError


def handle_general_http_exception(exception):
    response = jsonify({
        'error': 'HTTPException',
        'message': str(exception)
    })
    response.status_code = exception.code
    return response


def handle_monday_code_api_error(error: MondayCodeAPIError):
    print(f'Error: {error.api_type}, {error}')
    response = jsonify({
        'error': 'Error in processing request',
    })
    response.status_code = 500
    return response


def handle_bad_request_error(error):
    response = jsonify({
        'error': 'Bad Request',
        'message': str(error)
    })
    response.status_code = 400
    return response
