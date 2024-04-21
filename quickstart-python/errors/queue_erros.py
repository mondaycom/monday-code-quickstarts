class QueueProcessingError(Exception):
    """Exception raised for errors in the queue processing.

    Attributes:
        message -- explanation of the error
    """

    def __init__(self, message):
        self.message = message
        super().__init__(self.message)