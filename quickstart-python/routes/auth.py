import bcrypt
from flask import make_response, request, jsonify, Blueprint

from decorators import validate_credentials_existence
from handlers import mcode_configuration
from services import create_jwt_token, SecureStorage, validate_jwt_token

auth_bp = Blueprint('auth', __name__)


@auth_bp.route('/login', methods=['POST'])
@validate_credentials_existence
def login():
    """
    Route that receives a POST request with a username and password to authenticate the user.
    """
    data = request.get_json()
    username, password = data.get('username'), data.get('password')
    hashed_password = SecureStorage(mcode_configuration).get(username)

    if hashed_password and bcrypt.checkpw(password.encode('utf-8'), hashed_password.encode('utf-8')):
        token = create_jwt_token({'user': username})
        response = make_response(jsonify({'message': 'Logged in'}), 200)
        response.set_cookie('token', token, httponly=True, samesite='Strict')
        return response
    return 'Unauthorized', 401


@auth_bp.route('/signup', methods=['POST'])
@validate_credentials_existence
def signup():
    """
    Route that receives a POST request with a username and password to create a new user.
    """
    data = request.get_json()
    username, password = data.get('username'), data.get('password')
    storage = SecureStorage(mcode_configuration)

    if storage.get(username):
        return 'User already exists', 409

    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    storage.put(username, hashed_password.decode('utf-8'))
    return 'User created', 201


@auth_bp.route('/log_out', methods=['POST'])
def log_out():
    """
    Route that receives a POST request to log out the user.
    """
    response = make_response(jsonify({'message': 'Logged out'}), 200)
    response.set_cookie('token', '', httponly=True, samesite='Strict')
    return response


@auth_bp.route('/delete_account', methods=['POST'])
def delete_account():
    """
    Route that receives a POST request to delete the user account.
    """
    token = request.cookies.get('token')
    username = validate_jwt_token(token).get('user')

    SecureStorage(mcode_configuration).delete(username)

    response = make_response(jsonify({'message': 'Logged out'}), 200)
    response.set_cookie('token', '', httponly=True, samesite='Strict')
    return response
