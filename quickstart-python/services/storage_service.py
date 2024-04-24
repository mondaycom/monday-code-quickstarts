import json

import monday_code
from monday_code import ApiException
from monday_code.exceptions import NotFoundException
from urllib3.exceptions import RequestError

from errors import MondayCodeAPIError, APIErrorType
from typing import Any, Dict, List, Union

JSONType = Union[Dict[str, Any], List[Any], str, int, float, bool, None]


class SecureStorage:
    def __init__(self, monday_code_configuration):
        self.monday_code_configuration = monday_code_configuration

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
        self._api_call('delete_secure_storage', str(key))

    def get(self, key: str) -> JSONType:
        api_response = self._api_call('get_secure_storage', str(key))
        return json.loads(api_response.value) if api_response else None

    def put(self, key: str, value: JSONType) -> None:
        secure_storage_data_contract = monday_code.SecureStorageDataContract(value=json.dumps(value))

        self._api_call('put_secure_storage', key, secure_storage_data_contract)
