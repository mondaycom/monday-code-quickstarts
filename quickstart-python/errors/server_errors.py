from errors import BaseError
from models import APITypes


class InternalServerError(BaseError):
    def __init__(self, message):
        super().__init__(message, 500)


class MondayCodeAPIError(InternalServerError):
    """Exception raised for errors in the Monday code API.

    Attributes:
        message -- explanation of the error
        api_type -- type of the API where the error occurred
    """

    def __init__(self, message, api_type: APITypes):
        self.message = message
        self.api_type = api_type
        super().__init__(self.message)
