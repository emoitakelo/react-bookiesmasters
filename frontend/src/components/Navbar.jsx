import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react"; // modern icons
import logo from "../assets/logo.png"; 




function Navbar({ user, setUser }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  const links = [
    { name: "Home", path: "/" },
    { name: "Predictions", path: "/predictions" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact-us" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-900 text-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between h-16">
        {/* Logo / Brand */}
        <Link
          to="/">
           <img
    src={logo}
    alt="BookiesMasters Logo"
    className="h-10 w-auto object-contain"
  />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="text-gray-300 hover:text-white transition"
            >
              {link.name}
            </Link>
          ))}

          {/* Auth Links */}
          {user ? (
            <div className="flex items-center space-x-4">
              <Link
                to="/profile"
                className="text-gray-300 hover:text-white transition"
              >
                {user.name || user.email || "Profile"}
              </Link>
              <button
                onClick={handleLogout}
                className="bg-teal-500 hover:bg-teal-600 text-white px-3 py-1 rounded-lg text-sm"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="text-gray-300 hover:text-white transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-teal-500 hover:bg-teal-600 text-white px-3 py-1 rounded-lg text-sm"
              >
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-teal-300 focus:outline-none focus:ring-0"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-800 border-t border-gray-700">
          <div className="flex flex-col px-4 py-3 space-y-3">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className="text-gray-300 hover:text-white transition"
              >
                {link.name}
              </Link>
            ))}

            {user ? (
              <>
                <Link
                  to="/profile"
                  onClick={() => setMenuOpen(false)}
                  className="text-gray-300 hover:text-white transition"
                >
                  {user.name || user.email || "Profile"}
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="bg-teal-500 hover:bg-teal-600 text-white px-3 py-2 rounded-lg text-sm"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="text-gray-300 hover:text-white transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="bg-teal-500 hover:bg-teal-600 text-white px-3 py-2 rounded-lg text-sm text-center"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
