from services import with_monday_api
from models import APITypes


@with_monday_api(APITypes.SECRETS, "get_secret")
def get_secret(api_instance, key: str):
    return api_instance.get_secret(key)
