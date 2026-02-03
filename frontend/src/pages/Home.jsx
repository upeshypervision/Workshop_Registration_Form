import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-card">
        <h1 className="home-title">Workshop Registration</h1>
        <p className="home-subtitle">
          QR-based Attendance System
        </p>

        <button
          className="primary-btn"
          onClick={() => navigate("/scan")}
        >
          Go to Scan Page
        </button>
      </div>
    </div>
  );
}

export default Home;
