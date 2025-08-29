import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Prediction from './pages/Prediction';
import PredictionDetails from "./pages/PredictionDetails";
import Login from './pages/Login';
import Register from './pages/Register';
import Fixtures from './pages/Fixtures';
import About from './pages/About';
import ContactUs from './pages/ContactUs';
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Profile from './pages/Profile';
import PrivateRoute from './components/PrivateRoute'; // ✅ Added

function App() {
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="bg-light min-vh-100 d-flex flex-column">
      <Navbar user={user} setUser={setUser} />
      
      <main className="flex-grow-1 container py-1">
        <Routes>
          <Route path="/" element={<Fixtures />} />
          <Route path="/predictions" element={<Prediction />} />
          <Route path="/predictions/:fixtureId" element={<PredictionDetails />} />
          <Route path="/fixtures" element={<Fixtures />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />

          {/* ✅ Protected Routes */}
          <Route element={<PrivateRoute />}>
            
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
