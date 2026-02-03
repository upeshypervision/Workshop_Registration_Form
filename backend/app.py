from flask import Flask, request, jsonify
from flask_cors import CORS
from database import get_db
from datetime import datetime

app = Flask(__name__)
CORS(app)

db = get_db()

@app.route("/", methods=["GET"])
def home():
    return "Backend running ✅"

@app.route("/scan", methods=["POST"])
def scan_qr():
    data = request.json

    if not data:
        return jsonify({"message": "No data received"}), 400

    sap_id = int(data.get("sapId"))


    if not sap_id:
        return jsonify({"message": "Invalid QR data"}), 400

    attendee = db.attendees.find_one({"sapId": sap_id})

    if not attendee:
        return jsonify({"message": "User not registered"}), 404

    if attendee.get("status") == "scanned":
        return jsonify({"message": "Already scanned"}), 200

    db.attendees.update_one(
        {"sapId": sap_id},
        {
            "$set": {
                "status": "scanned",
                "scannedAt": datetime.utcnow()
            }
        }
    )

    return jsonify({"message": f"Attendance marked for {attendee['name']} ✅"})
if __name__ == "__main__":
    app.run(debug=True)
