from typing import Any, Dict, List, Union

import monday_code
from monday_code import SecureStorageApi

from models import APITypes
from services import with_monday_api

JSONType = Union[Dict[str, Any], List[Any], str, int, float, bool, None]


class SecureStorage:
    api_type = APITypes.SECURE_STORAGE

    @staticmethod
    @with_monday_api(api_type, 'get_secure_storage')
    async def get(key: str, api_instance: SecureStorageApi = None, default_value=None) -> JSONType:
        api_response = await api_instance.get_secure_storage(str(key))
        return api_response.value if api_response and api_response.value else default_value

    @staticmethod
    @with_monday_api(api_type, 'put_secure_storage')
    async def put(key: str, value: JSONType, api_instance: SecureStorageApi = None) -> None:
        return await api_instance.put_secure_storage(str(key), monday_code.JsonDataContract(value=value))

    @staticmethod
    @with_monday_api(api_type, 'delete_secure_storage')
    async def delete(key: str, api_instance: SecureStorageApi = None) -> None:
        return await api_instance.delete_secure_storage(str(key))
