import inspect
from typing import Callable

import monday_code
from monday_code.exceptions import NotFoundException, ApiException
from urllib3.exceptions import RequestError

from errors import MondayCodeAPIError
from handlers import mcode_configuration
from models import APITypes

API_MAPPING = {
    APITypes.QUEUE: monday_code.QueueApi,
    APITypes.SECRETS: monday_code.SecretApi,
    APITypes.STORAGE: monday_code.StorageApi,
    APITypes.SECURE_STORAGE: monday_code.SecureStorageApi
}


def api_instance_factory(api_type: APITypes, api_client):
    """Factory method to create an instance of the requested API type"""
    api_class = API_MAPPING.get(api_type)
    if api_class is None:
        raise MondayCodeAPIError(f"Invalid API type: {api_type}", api_type)
    return api_class(api_client)


def with_monday_api(api_type: APITypes, method_name: str, **options):
    """Decorator that provides monday's api_instance to the function it decorates"""

    def decorator(func: Callable):
        def wrapper(*args, **kwargs):
            with monday_code.ApiClient(mcode_configuration) as api_client:
                api_instance = api_instance_factory(api_type, api_client)
                try:
                    return func(*args, **kwargs, **options, api_instance=api_instance)
                except NotFoundException:
                    return None
                except (ApiException, RequestError) as e:
                    raise MondayCodeAPIError(f"Exception when calling MondayApi->{method_name}: {e}",
                                             api_type)

        return wrapper

    return decorator
