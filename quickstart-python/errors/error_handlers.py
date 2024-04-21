from flask import jsonify


def handle_general_http_exception(exception):
    response = jsonify({
        'error': 'HTTPException',
        'message': str(exception)
    })
    response.status_code = exception.code
    return response


def handle_queue_processing_error(error):
    print(str(error))
    response = jsonify({
        'error': 'Error in processing request',
        'message': str(error)
    })
    response.status_code = 500
    return response
