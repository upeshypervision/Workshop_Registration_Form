import React, { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import "./ScanQR.css";

function parsePythonDict(text) {
  try {
    return JSON.parse(
      text
        .replace(/'/g, '"')
        .replace(/None/g, "null")
        .replace(/True/g, "true")
        .replace(/False/g, "false")
    );
  } catch {
    return null;
  }
}

export default function ScanQR() {
  const [message, setMessage] = useState("");
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    if (locked) return;

    const scanner = new Html5QrcodeScanner(
      "qr-reader",
      { fps: 10, qrbox: 260 },
      false
    );

    scanner.render(
      async (decodedText) => {
        if (locked) return;

        setLocked(true);
        scanner.clear();

        const data = parsePythonDict(decodedText);

        if (!data || !data.sapId) {
          setMessage(" Invalid QR Code");
          return;
        }

        try {
          const res = await fetch("http://127.0.0.1:5000/scan", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ sapId: data.sapId }),
          });

          const result = await res.json();
          setMessage(result.message);
        } catch {
          setMessage(" Backend not reachable");
        }
      },
      () => {} // ignore scan noise
    );

    return () => scanner.clear().catch(() => {});
  }, [locked]);

  return (
    <div className="scan-page">
      <div className="scan-card">
        <h1>Scan QR Code</h1>

        {!locked && <div id="qr-reader" />}

        {message && <div className="scan-message">{message}</div>}
      </div>
    </div>
  );
}
