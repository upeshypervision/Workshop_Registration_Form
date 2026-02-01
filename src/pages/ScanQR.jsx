import { useEffect } from "react";

export default function ScanQR() {
  useEffect(() => {
    console.log("SCAN PAGE MOUNTED");

    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(() => {
        console.log("CAMERA ACCESS GRANTED");
      })
      .catch((err) => {
        console.error("CAMERA ERROR:", err);
      });
  }, []);

  return (
    <div style={{ color: "white", padding: "40px", fontSize: "24px" }}>
      SCAN PAGE RENDERED
    </div>
  );
}
