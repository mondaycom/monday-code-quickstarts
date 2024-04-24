import bcrypt
from flask import make_response, request, jsonify, Blueprint

from decorators import validate_credentials_existence
from handlers import mcode_configuration
from services import create_jwt_token, SecureStorage

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
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    SecureStorage(mcode_configuration).put(username, hashed_password.decode('utf-8'))
    return 'User created', 201
