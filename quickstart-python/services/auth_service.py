import jwt

from services import get_jwt_secret


def create_jwt_token(payload: dict):
    """
    Create a JWT token with the given payload.
    """
    return jwt.encode(payload, get_jwt_secret(), algorithm='HS256')


def validate_jwt_token(token: str):
    """
    Validate a JWT token.
    """
    try:
        return jwt.decode(token, get_jwt_secret(), algorithms=['HS256'])
    except (jwt.ExpiredSignatureError, jwt.InvalidSignatureError, jwt.InvalidTokenError):
        return None
