import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import ScanQR from "./pages/ScanQR";

export default function App() {
  return (
    <>
      <Link to="/scan">
        <button>Go to Scan Page</button>
      </Link>

      <Routes>
        <Route
          path="/"
          element={<h1 style={{ color: "green" }}>HOME PAGE ✅</h1>}
        />
        <Route path="/scan" element={<ScanQR />} />
      </Routes>
    </>
  );
}
