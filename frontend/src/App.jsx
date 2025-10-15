import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Predictions from "./pages/Predictions";
export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow bg-gray-50">
        <Routes>
          <Route path="/" element={<Predictions />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
