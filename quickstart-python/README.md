# Monday-Code Python Quickstart

This is a Python project that uses Flask as a web framework. The project is structured around a service-oriented
architecture, with different services handling different aspects of the application.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing
purposes.

### Prerequisites

You need to have Python and pip installed on your machine. You can download Python
from [here](https://www.python.org/downloads/) and pip is included in Python 3.4 and later versions.

### Installing

To install the project, follow these steps:

1. Clone the repository
2. Navigate to the project directory
3. Install the required packages using pip:

```bash
pip install -r requirements.txt
```

## Running the Application

To run the application, use the following command in the project directory:

```bash
python main.py
```

The application will start running at `http://0.0.0.0:8080`.

## Services

The project includes the following services:

- `MondayApi`: Handles interactions with the Monday API.
- `SecretService`: Manages secrets within the application.
- `JWTService`: Handles JSON Web Token operations.
- `StorageService`: Manages storage operations.
- `MailService`: Handles mail operations.
- `QueueService`: Manages queue operations.
- `SecureStorage`: Handles secure storage operations.

## OAuth Flow

The project uses OAuth 2.0 for authentication. The `JWTService` is responsible for handling the OAuth flow. It generates
a JWT token after the user is authenticated. This token is then used for subsequent requests to the server.

Here is an example of how the OAuth flow works:

1. The user sends a request to the `/auth/login` endpoint.
2. The server redirects the user to the OAuth provider's authorization page.
3. The user logs in and authorizes the application.
4. The OAuth provider redirects the user back to the `/auth/callback` endpoint with an authorization code.
5. The server exchanges the authorization code for an access token.
6. The server generates a JWT token and sends it to the user.

## Example Functions

Here are some example functions from the `StorageService`:

- `get(key: str)`: Retrieves a value from storage by its key.
- `upsert(key: str, value: JSONType, version: str)`: Inserts or updates a value in storage.
- `delete(key: str)`: Deletes a value from storage by its key.

## Error Handling

The project includes custom error handlers for `HTTPException`, `MondayCodeAPIError`, and `BaseError`.
