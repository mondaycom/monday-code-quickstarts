from functools import wraps

from flask import request

from errors import GenericBadRequestError


def validate_credentials_existence(func):
    """
    Basic decorator to validate if the username and password are present in the request.
    """

    @wraps(func)
    def wrapper(*args, **kwargs):
        data = request.get_json()
        username, password = data.get('username'), data.get('password')

        if not username or not password:
            raise GenericBadRequestError('`username` and `password` must be provided')
        if not isinstance(username, str) or not isinstance(password, str):
            raise GenericBadRequestError('`username` and `password` must be strings')

        return func(*args, **kwargs)

    return wrapper
