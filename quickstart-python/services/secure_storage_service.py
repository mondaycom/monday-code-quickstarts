import json
from typing import Any, Dict, List, Union

import monday_code
from monday_code import SecureStorageApi

from services import with_monday_api
from models import APITypes

JSONType = Union[Dict[str, Any], List[Any], str, int, float, bool, None]


class SecureStorage:
    api_type = APITypes.SECURE_STORAGE

    @staticmethod
    @with_monday_api(api_type, 'get_secure_storage')
    def get(key: str, api_instance: SecureStorageApi = None, default_value=None) -> JSONType:
        api_response = api_instance.get_secure_storage(str(key))
        return api_response.value if api_response and api_response.value else default_value

    @staticmethod
    @with_monday_api(api_type, 'put_secure_storage')
    def put(key: str, value: JSONType, api_instance: SecureStorageApi = None) -> None:
        api_instance.put_secure_storage(str(key), monday_code.JsonDataContract(value=value))

    @staticmethod
    @with_monday_api(api_type, 'delete_secure_storage')
    def delete(key: str, api_instance: SecureStorageApi = None) -> None:
        api_instance.delete_secure_storage(str(key))
