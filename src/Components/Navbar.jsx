import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/Images/Epicure-R-bgr-img.png";
import "../Components/Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="nav-container">
      <div className="nav-logo">
        <img src={logo} alt="Epicure Logo" />
      </div>

      {/* Hamburger icon */}
      <div
        className={`hamburger ${menuOpen ? "open" : ""}`}
        onClick={toggleMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Navigation links */}
      <div className={`nav-links ${menuOpen ? "active" : ""}`}>
        <Link to="/" onClick={closeMenu}>Home</Link>
        <Link to="/menu" onClick={closeMenu}>Menu</Link>
        <Link to="/gallery" onClick={closeMenu}>Gallery</Link>
        <Link to="/about" onClick={closeMenu}>About</Link>
        <Link to="/contact" onClick={closeMenu}>Contact</Link>
        <Link to="/book" className="book-now-btn" onClick={closeMenu}>
          Book A Reservation </Link>
      </div>
    </nav>
  );
}
export default Navbar;