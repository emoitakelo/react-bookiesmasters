import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Predictions from "./pages/Predictions";
import PredictionDetails from "./pages/PredictionDetails";

export default function App() {
  const [logoLoaded, setLogoLoaded] = useState(false);
  const [fixturesLoaded, setFixturesLoaded] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar + Logo visible only after logo is loaded */}
      {logoLoaded && <Navbar />}

      <main className="flex-grow">
        <Routes>
          <Route
            path="/"
            element={
              <Predictions
                onFixturesLoaded={() => setFixturesLoaded(true)}
                onLogoLoaded={() => setLogoLoaded(true)}
              />
            }
          />
          <Route path="/predictions/:fixtureId" element={<PredictionDetails />} />
                    <Route path="/" element={<Predictions />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Footer visible only after all fixtures have been displayed */}
      {fixturesLoaded && <Footer />}
    </div>
  );
}
