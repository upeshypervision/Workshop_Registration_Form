from flask import Blueprint, request, jsonify
from datetime import datetime
from database import get_attendees_collection

scan_qr = Blueprint("scanq", __name__)

@scan_qr.route("/scan", methods=["POST"])
def scan_qr():
    data = request.json
    sap_id = data.get("sapId")

    if not sap_id:
        return jsonify({"error": "SAP ID missing"}), 400

    attendees = get_attendees_collection()

    result = attendees.find_one_and_update(
        {"sapId": sap_id},
        {
            "$set": {
                "status": "scanned",
                "scannedAt": datetime.utcnow()
            }
        }
    )

    if not result:
        return jsonify({"message": "SAP ID not found"}), 404

    return jsonify({"message": "Attendance marked successfully"})
