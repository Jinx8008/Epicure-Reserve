import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../config/supabaseClient";
import { toast } from "react-toastify";
import logo from "../assets/Images/Epicure-R-bgr-img.png";
import "../Components/Navbar.css";
import { FaUserCircle } from "react-icons/fa";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    // Get current user on component mount
    const getCurrentUser = async () => {
      try {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error) {
          console.error("Error getting user:", error);
        } else {
          setUser(user);
        }
      } catch (error) {
        console.error("Error in getCurrentUser:", error);
      } finally {
        setLoading(false);
      }
    };

    getCurrentUser();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state changed in navbar:", event, session?.user);
      setUser(session?.user || null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
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
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const getUserDisplayName = (user) => {
    return user?.user_metadata?.full_name || user?.email?.split('@')[0] || "User";
  };

  const getUserAvatar = (user) => {
    return user?.user_metadata?.avatar_url;
  };

  return (
    <div className="navbar-section-wrapper">
      <div className="navbar-section-inner">
        <nav className="nav-container">
          <div className="nav-logo">
            <Link to="/">
              <img src={logo} alt="Epicure Logo" />
            </Link>
          </div>

          <div className="nav-link-p-container">
            <div className={`nav-links ${menuOpen ? "active" : ""}`}>
              <Link to="/" onClick={closeMenu}>Home</Link>
              <Link to="/menu" onClick={closeMenu}>Menu</Link>
              <Link to="/gallery" onClick={closeMenu}>Gallery</Link>
              <Link to="/about" onClick={closeMenu}>About</Link>
              <Link to="/contact" onClick={closeMenu}>Contact</Link>
            </div>

            <span className="profile-icon" onClick={handleProfileClick}>
              {loading ? (
                <div className="profile-loading">
                  <div className="mini-spinner"></div>
                </div>
              ) : user ? (
                getUserAvatar(user) ? (
                  <img 
                    src={getUserAvatar(user)} 
                    alt="Profile" 
                    className="profile-avatar" 
                  />
                ) : (
                  <div className="profile-initials">
                    {getInitials(getUserDisplayName(user))}
                  </div>
                )
              ) : (
                <FaUserCircle className="default-icon" />
              )}
            </span>

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
      </div>
    </div>
  );
}

export default Navbar;