from errors.base_error import BaseError


class GenericBadRequestError(BaseError):
    def __init__(self, message):
        super().__init__(message, 400)


class GenericUnauthorizedError(BaseError):
    def __init__(self, message):
        super().__init__(message, 401)
