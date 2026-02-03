import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ScanQR from "./pages/ScanQR";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/scan" element={<ScanQR />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
