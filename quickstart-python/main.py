import os

from flask import Flask, jsonify
from werkzeug.exceptions import HTTPException

from errors import handle_monday_code_api_error, handle_general_http_exception, \
    MondayCodeAPIError, handle_base_error, BaseError
from routes import worker_queue_bp, mail_bp, auth_bp

app = Flask(__name__)
app.register_blueprint(worker_queue_bp)
app.register_blueprint(mail_bp, url_prefix="/mail")
app.register_blueprint(auth_bp, url_prefix="/auth")

app.register_error_handler(HTTPException, handle_general_http_exception)
app.register_error_handler(BaseError, handle_base_error)
app.register_error_handler(MondayCodeAPIError, handle_monday_code_api_error)


@app.route("/")
def health_check():
    return jsonify({"message": "Healthy"}), 200


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 8080)))
