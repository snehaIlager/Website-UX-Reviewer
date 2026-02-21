import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Review from "./pages/Review";
import Reviews from "./pages/Reviews";
import Status from "./pages/Status";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/review" element={<Review />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/status" element={<Status />} />
      </Routes>
    </div>
  );
}