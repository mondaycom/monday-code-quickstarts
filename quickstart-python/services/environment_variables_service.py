from monday_code import SecretApi

from services import with_monday_api
from models import APITypes


class EnvironmentVariablesService:
    @staticmethod
    @with_monday_api(APITypes.ENVIRONMENT_VARIABLES, "get_environment_variable")
    def get_environment_variable(key: str, api_instance: EnvironmentVariablesApi = None):
        return api_instance.get_environment_variable(key)
