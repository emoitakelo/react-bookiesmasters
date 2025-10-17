import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Mail } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-5">
      {/* Main footer section */}
      <div className="max-w-7xl mx-auto px-2 md:px-4 py-5 grid grid-cols-1 md:grid-cols-3 gap-8 border-b border-gray-700">
        
        {/* Brand / About */}
        <div>
          <h3 className="text-medium font-semibold text-gray-300 mb-3">
            Bookiesmasters
          </h3>
          <p className="text-sm leading-relaxed">
            Get accurate football predictions, fixtures, and insights powered by
            data.Payment after win tips for highstakers .All in one place.
          </p>
        </div>

        

        {/* Contact / Socials */}
        <div>
          <h3 className="text-medium font-semibold text-gray-300 mb-3">
            Stay Connected
          </h3>
          <p className="text-sm mb-3">
            Have questions? Reach us anytime.
          </p>
          <a
            href="mailto:support@bookiesmasters.com"
            className="inline-flex items-center text-teal-400 hover:text-teal-300 text-sm mb-4"
          >
            <Mail size={18} className="mr-2" /> support@bookiesmasters.com
          </a>

          {/* Socials (optional) */}
          <div className="flex space-x-4 mt-2">
            <a href="#" className="text-gray-400 hover:text-teal-400 transition">
              <Facebook size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-teal-400 transition">
              <Twitter size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-teal-400 transition">
              <Instagram size={20} />
            </a>
          </div>
        </div>

 {/* Quick Links */}
        <div>
          <h3 className="text-medium font-semibold text-gray-300 mb-1">
            Quick Links
          </h3>
          <ul className="space-y-1 text-sm">
            <li>
              <Link to="/about" className="text-gray-300 hover:text-teal-400 transition ">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact-us" className="text-gray-300 hover:text-teal-400 transition">
                Contact Us
              </Link>
            </li>
            <li>
              <Link
                to="/terms-of-service"
                className="text-gray-300 hover:text-teal-400 transition"
              >
                Terms of Service
              </Link>
            </li>
            <li>
              <Link
                to="/privacy-policy"
                className="text-gray-300 hover:text-teal-400 transition"
              >
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>


      </div>

     
      {/* Bottom bar */}
      <div className="text-center text-gray-500 text-xs py-2">
        © {new Date().getFullYear()} Bookiesmasters. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
