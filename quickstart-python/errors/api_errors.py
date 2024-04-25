from models import APITypes


class MondayCodeAPIError(Exception):
    """Exception raised for errors in the Monday code API.

    Attributes:
        message -- explanation of the error
        api_type -- type of the API where the error occurred
    """

    def __init__(self, message, api_type: APITypes):
        self.message = message
        self.api_type = api_type
        super().__init__(self.message)
