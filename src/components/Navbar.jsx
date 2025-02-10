import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi"; // Icons for menu toggle

const Navbar = ({ isLoggedIn }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <div className="text-xl font-bold">BeyondCampus</div>

      {/* Desktop Navigation */}
      <ul className="hidden md:flex space-x-6">
        <li><Link to="/" className="hover:underline">Home</Link></li>
        <li><Link to="/teams" className="hover:underline">Teams</Link></li>
        <li><Link to="/resources" className="hover:underline">Resources</Link></li>
        <li><Link to="/opportunities" className="hover:underline">Opportunities</Link></li>
      </ul>

      {/* Profile/Login Button - Always visible */}
      <div className="hidden md:block">
        {isLoggedIn ? (
          <Link to="/profile">
            <img
              src="https://via.placeholder.com/40"
              alt="Profile"
              className="rounded-full w-10 h-10"
            />
          </Link>
        ) : (
          <Link to="/login" className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-200">
            Login/SignUp
          </Link>
        )}
      </div>

      {/* Mobile Menu Toggle Button */}
      <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
      </button>

      {/* Mobile Navigation Menu */}
      {menuOpen && (
        <ul className="absolute top-16 left-0 w-full bg-blue-600 flex flex-col space-y-4 p-4 md:hidden">
          <li><Link to="/" className="hover:underline" onClick={() => setMenuOpen(false)}>Home</Link></li>
          <li><Link to="/teams" className="hover:underline" onClick={() => setMenuOpen(false)}>Teams</Link></li>
          <li><Link to="/resources" className="hover:underline" onClick={() => setMenuOpen(false)}>Resources</Link></li>
          <li><Link to="/opportunities" className="hover:underline" onClick={() => setMenuOpen(false)}>Opportunities</Link></li>
          <li>
            {isLoggedIn ? (
              <Link to="/profile" onClick={() => setMenuOpen(false)}>
                <img
                  src="https://via.placeholder.com/40"
                  alt="Profile"
                  className="rounded-full w-10 h-10"
                />
              </Link>
            ) : (
              <Link to="/login" className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-200" onClick={() => setMenuOpen(false)}>
                Login/SignUp
              </Link>
            )}
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
