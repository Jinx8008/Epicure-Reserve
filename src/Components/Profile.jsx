import React, { useEffect, useState } from "react";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut, deleteUser } from "firebase/auth";
import "./Profile.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Monitor authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe(); // Cleanup
  }, []);

  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Handle account deletion
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      try {
        await deleteUser(auth.currentUser);
        navigate("/signup");
      } catch (error) {
        alert("Error deleting account. Try again.");
        console.error(error);
      }
    }
  };

  // If user is not logged in
  if (!user) {
    return (
      <div className="profile-container not-logged-in">
        <h2>You're not logged in.</h2>
        <p>
          <span onClick={() => navigate("/login")}>Log in</span> or{" "}
          <span onClick={() => navigate("/signup")}>Create an account</span>.
        </p>
      </div>
    );
  }

  // Extract initials for profile fallback
  const getInitials = (name) => {
    return name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="avatar">
          {user.photoURL ? (
            <img src={user.photoURL} alt="Profile" />
          ) : (
            <div className="initials">{getInitials(user.displayName)}</div>
          )}
        </div>

        <h2>Welcome, {user.displayName || "Guest"}!</h2>
        <p className="email">{user.email}</p>

        <div className="profile-actions">
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
          <button className="delete-btn" onClick={handleDelete}>
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
