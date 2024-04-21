import os

from flask import Flask
from werkzeug.exceptions import HTTPException

from errors import QueueProcessingError, handle_queue_processing_error, handle_general_http_exception
from routes import worker_queue_bp, mail_bp

app = Flask(__name__)
app.register_blueprint(worker_queue_bp)
app.register_blueprint(mail_bp, url_prefix="/mail")
app.register_error_handler(HTTPException, handle_general_http_exception)
app.register_error_handler(QueueProcessingError, handle_queue_processing_error)


@app.route("/")
def hello_world():
    print(os.environ)
    name = os.environ.get("NAME", "World")
    return f"Hello from Python {name}!"


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=int(os.environ.get("PORT", 8080)))
