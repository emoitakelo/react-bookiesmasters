import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Predictions from "./pages/Predictions";
import PredictionDetails from "./pages/PredictionDetails";
import logo from "./assets/logo.png";

export default function App() {
  const [logoLoaded, setLogoLoaded] = useState(false);
  const [fixturesLoaded, setFixturesLoaded] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* ✅ Load the logo first, then show navbar */}
      {!logoLoaded && (
        <div className="flex justify-center items-center h-24">
          {/* Hidden img triggers load event */}
          <img
            src={logo}
            alt="BookiesMasters Logo"
            className="h-16 w-auto opacity-0 absolute"
            onLoad={() => setLogoLoaded(true)}
          />
        </div>
      )}

      {logoLoaded && <Navbar />}

      {/* ✅ Main content */}
      <main className="flex-grow">
        <Routes>
          {/* 🏠 Home route */}
          <Route
            path="/"
            element={
              <Predictions
                onAllFixturesLoaded={(loaded) => setFixturesLoaded(loaded)} // ✅ handles true/false
              />
            }
          />

          {/* 🎯 Prediction details */}
          <Route path="/predictions/:fixtureId" element={<PredictionDetails />} />

          {/* 🚀 Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* ✅ Show footer only after fixtures are fully loaded */}
      {fixturesLoaded && <Footer />}
    </div>
  );
}
