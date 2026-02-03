import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <h1 className="logo">Workshop Portal</h1>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/scan">Scan QR</Link>
      </div>
    </nav>
  );
}
