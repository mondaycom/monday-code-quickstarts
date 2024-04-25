from monday_code import SecretApi

from services import with_monday_api
from models import APITypes


class SecretService:
    @staticmethod
    @with_monday_api(APITypes.SECRETS, "get_secret")
    def get_secret(key: str, api_instance: SecretApi = None):
        return api_instance.get_secret(key)
