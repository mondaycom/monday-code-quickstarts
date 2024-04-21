import logging

import monday_code
from monday_code import ApiException
from monday_code.exceptions import NotFoundException
from urllib3.exceptions import RequestError

from errors import MondayCodeAPIError, APIErrorType


class SecureStorage:
    def __init__(self, monday_code_configuration):
        self.monday_code_configuration = monday_code_configuration
        self.logger = logging.getLogger(__name__)

    def _api_call(self, method, *args, **kwargs):
        with monday_code.ApiClient(self.monday_code_configuration) as api_client:
            api_instance = monday_code.SecureStorageApi(api_client)
            try:
                return getattr(api_instance, method)(*args, **kwargs)
            except NotFoundException:
                return None
            except (ApiException, RequestError) as e:
                raise MondayCodeAPIError(f"Exception when calling SecureStorageApi->{method}: {e}",
                                         APIErrorType.SECURE_STORAGE)

    def delete(self, key: str) -> None:
        self._api_call('delete_secure_storage', key)

    def get(self, key: str) -> str:
        api_response = self._api_call('get_secure_storage', key)
        self.logger.info(f"The response of SecureStorageApi->get_secure_storage: {api_response}")
        return api_response.value if api_response else None

    def put(self, key: str, value: str) -> None:
        secure_storage_data_contract = monday_code.SecureStorageDataContract(value=value)
        self._api_call('put_secure_storage', key, secure_storage_data_contract)
