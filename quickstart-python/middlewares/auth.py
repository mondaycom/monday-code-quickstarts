from functools import wraps

from flask import request

from services import JWTService


def auth_required(f):
    @wraps(f)
    def authentication_middleware(*args, **kwargs):
        """
        Middleware to validate the JWT token in the request.
        Checks that the authorization token in the header is signed with your app's signing secret.
        Docs: https://developer.monday.com/apps/docs/integration-authorization#authorization-header
        @todo: Attach this middleware to every endpoint that receives requests from monday.com
        """
        authorization = request.headers.get('Authorization', None)
        if not authorization and request.args.get('token'):
            authorization = request.args.get('token')
        request.session = JWTService.decode_monday_jwt(authorization)
        return f(*args, **kwargs)

    return authentication_middleware
