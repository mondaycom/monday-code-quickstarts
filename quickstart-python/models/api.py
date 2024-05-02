from enum import Enum


class APITypes(Enum):
    """Enum class to represent the different models of APIs available in Monday code"""
    QUEUE = "QueueApi"
    STORAGE = "StorageApi"
    SECURE_STORAGE = "SecureStorageApi"
    SECRETS = "SecretApi"
