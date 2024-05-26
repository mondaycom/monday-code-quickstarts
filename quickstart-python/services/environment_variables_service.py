from monday_code import SecretApi

from services import with_monday_api
from models import APITypes


class EnvironmentVariablesService:
    @staticmethod
    @with_monday_api(APITypes.ENVIRONMENT_VARIABLES, "get_env_var")
    def get_env_var(key: str, api_instance: EnvironmentVariablesApi = None):
        return api_instance.get_env_var(key)
