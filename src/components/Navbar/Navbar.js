import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={toggleMenu}>
        <span className="logo-icon">❖</span>
        <p className="logo-text">High Dimensional Statistics</p>
      </div>

      <div className={`navbar-menu ${menuOpen ? "open" : ""}`}>
        <div className="menu-header">
          <span className="back-icon" onClick={closeMenu}>
            ←
          </span>
          <p className="menu-title">Menu</p>
        </div>

        <Link to="/" onClick={closeMenu}>
          Home
        </Link>
        <Link to="/Lectures" onClick={closeMenu}>
          Lectures
        </Link>
        <Link to="/TAClasses" onClick={closeMenu}>
          Supplementary Lectures
        </Link>
        <Link to="/HomeWorks" onClick={closeMenu}>
          Homeworks
        </Link>
        <Link to="/Seminar" onClick={closeMenu}>
          Seminar
        </Link>
        <Link to="/admin" onClick={closeMenu} className="admin-link">
          Admin
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
