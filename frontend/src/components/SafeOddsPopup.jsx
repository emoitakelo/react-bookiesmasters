import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SafeOddsPopup.css';

const SafeOddsPopup = () => {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 3000); // Show after 3 seconds
    return () => clearTimeout(timer);
  }, []);

  const handleRequestTips = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/login");
    } else {
      navigate("/request-tips");
    }
  };

  if (!visible) return null;

  return (
    <div className="safe-odds-popup shadow-lg rounded">
      <button className="close-btn" onClick={() => setVisible(false)}>&times;</button>
      <div className="popup-content text-dark">
        <strong>🔥 3 Safe Odds for Highstakers! <br /> Payment after winning!!  </strong>
        <button
          className="btn btn-success btn-sm mt-2 w-100"
          onClick={handleRequestTips}
        >
          Request Tips
        </button>
      </div>
    </div>
  );
};

export default SafeOddsPopup;
