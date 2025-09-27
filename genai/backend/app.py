# app.py
from flask import Flask, send_file, jsonify
from flask_cors import CORS
import os

# Blueprints
from routes.ingest_routes import ingest_bp
from routes.generate_routes import generate_bp

app = Flask(__name__)
CORS(app)

app.register_blueprint(ingest_bp, url_prefix="/api/ingest")
app.register_blueprint(generate_bp, url_prefix="/api/generate")

@app.route("/")
def health():
    return jsonify({"status":"ok", "service":"mentora-genai-chroma"})

# serve ppt files (simple route for testing)
@app.route("/ppt/<path:filename>", methods=["GET"])
def get_ppt(filename):
    safe_dir = os.path.abspath("ppt_generated")
    file_path = os.path.join(safe_dir, filename)
    return send_file(file_path, as_attachment=True)

if __name__ == "__main__":
    os.makedirs("ppt_generated", exist_ok=True)
    app.run(host="0.0.0.0", port=8000, debug=True)
