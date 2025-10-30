import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Predictions from "./pages/Predictions";
import PredictionDetails from "./pages/PredictionDetails";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow bg-gray-50">
        <Routes>
          {/* 🏠 Home route */}
          <Route path="/" element={<Predictions />} />
          {/* 🎯 Prediction details */}
          <Route path="/predictions/:fixtureId" element={<PredictionDetails />} />
          {/* 🚀 Catch-all fallback (important for mobile initial load) */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
