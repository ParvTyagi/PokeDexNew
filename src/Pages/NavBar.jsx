import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/NavBar.css';
import logo from '../assets/pokedex-logo.svg';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="NavBar">
      {/* Logo */}
      <Link to="/">
        <img src={logo} alt="Pokedex Logo" className="logo-svg" />
      </Link>

      {/* Hamburger Menu */}
      <button 
        className="hamburger-menu" 
        onClick={toggleMenu}
        aria-label="Toggle navigation menu"
      >
        <span className="line"></span>
        <span className="line"></span>
        <span className="line"></span>
      </button>

      {/* Navigation Links */}
      <ul className={`nav-list ${isMenuOpen ? 'open' : ''}`}>
        <li><Link to="/home" className="nav-button" onClick={toggleMenu}><b>Home</b></Link></li>
        <li><Link to="/Pokedex" className="nav-button" onClick={toggleMenu}><b>Pokedex</b></Link></li>
        <li><Link to="/favourite" className="nav-button" onClick={toggleMenu}><b>Favourite</b></Link></li>
        <li><Link to="/SNE" className="nav-button" onClick={toggleMenu}><b>Seasons & Episodes</b></Link></li>
      </ul>
    </nav>
  );
};

export default NavBar;