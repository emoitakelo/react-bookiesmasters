import { Routes, Route } from "react-router-dom";
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
          <Route path="/" element={<Predictions />} />
          <Route path="/predictions/:fixtureId" element={<PredictionDetails />} />

        </Routes>
      </main>

      <Footer />
    </div>
  );
}
