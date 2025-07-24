import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css'; // We’ll add styles here

function Footer() {
  return (
    <footer
      className="text-center mt-1 responsive-footer"
      style={{
        backgroundColor: 'rgba(0, 77, 64, 0.9)',
        color: '#fff',
        padding: '10px 0',
        marginBottom: '0',
        
      }}
    >
      <div className="footer-links">
        <Link to="/about">About</Link>
        <Link to="/contact-us">Contact Us</Link>
        <Link to="/terms-of-service">Terms of Service</Link>
        <Link to="/privacy-policy">Privacy Policy</Link>
        <Link to="/predictions">Predictions</Link>
        <Link to="/fixtures">Fixtures</Link>
      </div>
      <div style={{ marginTop: '8px' }}>
        © Bookies Masters
      </div>
    </footer>
  );
}

export default Footer;
