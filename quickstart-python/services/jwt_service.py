import jwt
import requests

from consts import SecretKeys, EnvironmentKeys
from errors import GenericUnauthorizedError, InternalServerError
from services import SecretService, EnvironmentVariablesService


class JWTService:
    @staticmethod
    def create_jwt_token(payload: dict):
        """
        Create a JWT token with the given payload.
        """
        return jwt.encode(payload, SecretService.get_secret(SecretKeys.MONDAY_SIGNING_SECRET), algorithm='HS256')

    @staticmethod
    def decode_monday_jwt(token: str, verify=True):
        """
        Validate a JWT token.
        """
        try:
            signing_secret = SecretService.get_secret(SecretKeys.MONDAY_SIGNING_SECRET)
            if not signing_secret:
                raise InternalServerError('No signing secret found')
            return jwt.decode(token, signing_secret,
                              options={"verify_aud": False, "verify_signature": verify}, algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise GenericUnauthorizedError('Token has expired')
        except jwt.InvalidSignatureError:
            raise GenericUnauthorizedError('Invalid signature, token validation failed')
        except jwt.InvalidTokenError:
            raise GenericUnauthorizedError('Invalid token')

    @staticmethod
    def get_monday_token(code):
        """
        Function that exchanges a code for a monday.com token.
        """
        response = requests.post(EnvironmentVariablesService.get_environment_variable(EnvironmentKeys.MONDAY_OAUTH_TOKEN_PATH),
                                 data={'code': code,
                                       'client_id': EnvironmentVariablesService.get_environment_variable(EnvironmentKeys.MONDAY_OAUTH_CLIENT_ID),
                                       'client_secret': SecretService.get_secret(
                                           SecretKeys.MONDAY_OAUTH_CLIENT_SECRET)})
        response.raise_for_status()  # Raises a HTTPError if the response status is 4xx, 5xx
        return response.json()
