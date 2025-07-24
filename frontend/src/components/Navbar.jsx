import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
    window.location.reload();
  };

  // Collapse navbar after clicking a nav item
  const handleNavLinkClick = () => {
    const navbar = document.getElementById('navbarNav');
    if (navbar && navbar.classList.contains('show')) {
      const bsCollapse = new window.bootstrap.Collapse(navbar, {
        toggle: false,
      });
      bsCollapse.hide();
    }
  };

  return (
    <nav
      className="navbar navbar-expand-lg sticky-top"
      style={{
        backgroundColor: 'rgba(0, 77, 64, 0.9)',
        backdropFilter: 'blur(5px)',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
        zIndex: 1030,
        fontSize: 'clamp(14px, 2vw, 20px)'
      }}
    >
      <div className="container py-1 px-1">
        <Link className="navbar-brand" to="/" onClick={handleNavLinkClick}>
          <img
            src={logo}
            alt="Bookies Masters"
            width="75"
            height="75"
            className="d-inline-block align-top rounded"
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon custom-toggler">
            <div></div>
          </span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link navbar-custom-link" to="/" onClick={handleNavLinkClick}>Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link navbar-custom-link" to="/predictions" onClick={handleNavLinkClick}>Predictions</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link navbar-custom-link" to="/fixtures" onClick={handleNavLinkClick}>Fixtures</Link>
            </li>

            {!token ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link navbar-custom-link" to="/login" onClick={handleNavLinkClick}>Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link navbar-custom-link" to="/register" onClick={handleNavLinkClick}>Register</Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link navbar-custom-link" to="/profile" onClick={handleNavLinkClick}>
                    {user?.email}
                  </Link>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-sm btn-light ms-2"
                    onClick={() => {
                      handleLogout();
                      handleNavLinkClick();
                    }}
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
