import asyncio
import inspect
from functools import wraps

from flask import request

from services import JWTService


def monday_request_auth(f):
    @wraps(f)
    async def authentication_middleware(*args, **kwargs):
        """
        Middleware to validate the JWT token in the request.
        Checks that the authorization token in the header is signed with your app's signing secret.
        Docs: https://developer.monday.com/apps/docs/integration-authorization#authorization-header
        @todo: Attach this middleware to every endpoint that receives requests from monday.com
        """
        # Retrieve the token from the 'Authorization' header or 'token' or 'sessionToken' query parameters
        token = request.headers.get('Authorization', request.args.get(
            'token', request.args.get('sessionToken')))

        # Decode the JWT token and attach the session to the request
        request.session = await JWTService.decode_monday_jwt(token)

        # Call the wrapped function (async or sync)
        if asyncio.iscoroutinefunction(f):
            return await f(*args, **kwargs)
        else:
            return f(*args, **kwargs)

    return authentication_middleware
