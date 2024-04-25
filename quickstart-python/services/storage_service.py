import json
from typing import Any, Dict, List, Union

import monday_code

from services import with_monday_api
from models import APITypes

JSONType = Union[Dict[str, Any], List[Any], str, int, float, bool, None]


class SecureStorage:
    api_type = APITypes.SECURE_STORAGE

    @staticmethod
    @with_monday_api(api_type, 'delete_secure_storage')
    def delete(api_instance, key: str) -> None:
        api_instance.delete_secure_storage(str(key))

    @staticmethod
    @with_monday_api(api_type, 'get_secure_storage')
    def get(api_instance, key: str) -> JSONType:
        api_response = api_instance.get_secure_storage(str(key))
        return json.loads(api_response.value) if api_response else None

    @staticmethod
    @with_monday_api(api_type, 'put_secure_storage')
    def put(api_instance, key: str, value: JSONType) -> None:
        secure_storage_data_contract = monday_code.SecureStorageDataContract(value=json.dumps(value))
        api_instance.put_secure_storage(str(key), secure_storage_data_contract)
