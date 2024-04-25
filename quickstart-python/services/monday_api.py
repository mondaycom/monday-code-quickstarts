from typing import Callable

import monday_code
from monday_code.exceptions import NotFoundException, ApiException
from urllib3.exceptions import RequestError

from errors import MondayCodeAPIError
from handlers import mcode_configuration
from models import APITypes


def api_instance_factory(api_type: APITypes, api_client):
    """Factory method to create an instance of the requested API type"""
    if api_type == APITypes.QUEUE:
        return monday_code.QueueApi(api_client)
    elif api_type == APITypes.SECURE_STORAGE:
        return monday_code.SecureStorageApi(api_client)
    elif api_type == APITypes.SECRETS:
        return monday_code.SecretApi(api_client)
    else:
        raise MondayCodeAPIError(f"Invalid API type", api_type)


def with_monday_api(api_type: APITypes, method_name: str):
    """Decorator that provides monday's api_instance to the function it decorates"""

    def decorator(func: Callable):
        def wrapper(*args, **kwargs):
            with monday_code.ApiClient(mcode_configuration) as api_client:
                api_instance = api_instance_factory(api_type, api_client)
                try:
                    return func(api_instance, *args, **kwargs)
                except NotFoundException:
                    return None
                except (ApiException, RequestError) as e:
                    raise MondayCodeAPIError(f"Exception when calling MondayApi->{method_name}: {e}",
                                             api_type)

        return wrapper

    return decorator
