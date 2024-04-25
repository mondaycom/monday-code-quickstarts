class BaseError(Exception):
    def __init__(self, message, status_code):
        self.message = message
        self.status_code = status_code
        super().__init__(self.message)


class GenericBadRequestError(BaseError):
    def __init__(self, message):
        super().__init__(message, 400)


class GenericUnauthorizedError(BaseError):
    def __init__(self, message):
        super().__init__(message, 401)
