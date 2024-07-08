from monday_code import EnvironmentVariablesApi

from models import APITypes
from services import with_monday_api


class EnvironmentVariablesService:
    @staticmethod
    @with_monday_api(APITypes.ENVIRONMENT_VARIABLES, "get_environment_variable")
    def get_environment_variable(key: str, api_instance: EnvironmentVariablesApi = None):
        response = api_instance.get_environment_variable(key)
        return response

