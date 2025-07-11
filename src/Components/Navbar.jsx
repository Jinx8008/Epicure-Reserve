import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";
import { toast } from "react-toastify";
import logo from "../assets/Images/Epicure-R-bgr-img.png";
import "../Components/Navbar.css";
import { FaUserCircle } from "react-icons/fa";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleProfileClick = () => {
    if (user) {
      navigate("/profile");
    } else {
      toast.info("⚠️ Please log in or sign up to view your profile.");
      navigate("/login");
    }
    closeMenu();
  };

  const getInitials = (name) => {
    return name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <nav className="nav-container">
      {/* Logo */}
      <div className="nav-logo">
        <Link to="/">
          <img src={logo} alt="Epicure Logo" />
        </Link>
      </div>

      <div className="nav-link-p-container">
          {/* Links */}
      <div className={`nav-links ${menuOpen ? "active" : ""}`}>
        <Link to="/" onClick={closeMenu}>Home</Link>
        <Link to="/menu" onClick={closeMenu}>Menu</Link>
        <Link to="/gallery" onClick={closeMenu}>Gallery</Link>
        <Link to="/about" onClick={closeMenu}>About</Link>
        <Link to="/contact" onClick={closeMenu}>Contact</Link>
      </div>
       {/* Profile Icon */}
        <span className="profile-icon" onClick={handleProfileClick}>
          {user ? (
            user.photoURL ? (
              <img src={user.photoURL} alt="Profile" className="profile-avatar" />
            ) : (
              <div className="profile-initials">
                {getInitials(user.displayName || "U")}
              </div>
            )
          ) : (
            <FaUserCircle className="default-icon" />
          )}
        </span>
        {/* Hamburger */}
      <div
        className={`hamburger ${menuOpen ? "open" : ""}`}
        onClick={toggleMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      </div>

    
    </nav>
  );
}

export default Navbar;



