from flask import Blueprint

from services import SecureStorage, StorageService

developing_bp = Blueprint('developing', __name__)


@developing_bp.route('/delete_storage', methods=['DELETE'])
def delete_storage():
    """
    Route only made for developing purposes, to delete all keys from the storage
    """
    user_storage: dict = SecureStorage.get('57381536', default_value={})
    SecureStorage.delete('57381536')
    if user_storage:
        monday_token = user_storage.get('monday_token', {}).get('access_token', None)
        if monday_token:
            StorageService(monday_token).delete('mail_address')

    return 'Deleted', 200
