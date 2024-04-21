import monday_code
from monday_code import ApiException
from urllib3.exceptions import RequestError

from consts import MondayConsts
from errors import APIErrorType, MondayCodeAPIError
from handlers import mcode_configuration


def get_secret(key: str):
    with monday_code.ApiClient(mcode_configuration) as api_client:
        api_instance = monday_code.SecretApi(api_client)
        try:
            return api_instance.get_secret(key)
        except (ApiException, RequestError) as e:
            raise MondayCodeAPIError(f"Exception when calling SecretApi->get_secret: {e}", APIErrorType.SECRETS)


def get_jwt_secret():
    return get_secret(MondayConsts.JWT_SECRET_KEY)
