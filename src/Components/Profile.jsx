import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { supabase } from "../config/supabaseClient";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [editForm, setEditForm] = useState({
    displayName: "",
    email: ""
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Monitor authentication state
  useEffect(() => {
    const getUser = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Get current user
        const { data: { user }, error } = await supabase.auth.getUser();
        
        console.log("Auth user data:", user); // Debug log
        
        if (error) {
          console.error("Error fetching user:", error.message);
          setError(error.message);
          return;
        }

        if (user) {
          setUser(user);
          setEditForm({
            displayName: user.user_metadata?.full_name || "",
            email: user.email || ""
          });
          console.log("User metadata:", user.user_metadata); // Debug log
        } else {
          console.log("No authenticated user found"); // Debug log
        }
      } catch (err) {
        console.error("Unexpected error:", err);
        setError("An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    getUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state changed:", event, session?.user); // Debug log
      if (event === 'SIGNED_IN' && session?.user) {
        setUser(session.user);
        setEditForm({
          displayName: session.user.user_metadata?.full_name || "",
          email: session.user.email || ""
        });
        setError(null);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setEditForm({ displayName: "", email: "" });
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Handle profile image selection
  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert("Image size should be less than 5MB");
        return;
      }

      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  // Upload profile image to Supabase Storage
  const uploadProfileImage = async (file) => {
    if (!file || !user) return null;

    const filePath = `profile-images/${user.id}/${Date.now()}_${file.name}`;
    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, file);

    if (uploadError) {
      console.error("Upload error:", uploadError);
      alert("Error uploading image. Please try again.");
      return null;
    }

    const { data: publicUrlData } = supabase.storage
      .from("avatars")
      .getPublicUrl(filePath);

    return publicUrlData?.publicUrl || null;
  };

  // Handle profile update
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    if (!user) return;

    try {
      setIsUploading(true);
      let newPhotoURL = user.user_metadata?.avatar_url || null;

      // Upload new image if selected
      if (selectedFile) {
        newPhotoURL = await uploadProfileImage(selectedFile);
        if (!newPhotoURL) return;
      }

      // Update user metadata in Supabase
      const { error: updateError } = await supabase.auth.updateUser({
        email: editForm.email,
        data: {
          full_name: editForm.displayName,
          avatar_url: newPhotoURL,
        },
      });

      if (updateError) throw updateError;

      // Refresh user
      const { data: { user: updatedUser } } = await supabase.auth.getUser();
      setUser(updatedUser);

      setIsEditing(false);
      setSelectedFile(null);
      setImagePreview(null);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error.message);
      alert("Error updating profile. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleInputChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setSelectedFile(null);
    setImagePreview(null);
    setEditForm({
      displayName: user.user_metadata?.full_name || "",
      email: user.email || "",
    });
  };

  // Logout
  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  // Delete account (Supabase needs backend/RLS for full delete)
  const handleDelete = async () => {
    alert("Account deletion must be handled from backend or with RLS policies.");
  };

  const getInitials = (name) =>
    name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  // Loading state
  if (loading) {
    return (
      <div className="profile-container loading">
        <div className="loading-card">
          <div className="spinner"></div>
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="profile-container error">
        <div className="error-card">
          <div className="error-icon">⚠️</div>
          <h2>Error Loading Profile</h2>
          <p>{error}</p>
          <button onClick={() => window.location.reload()} className="retry-btn">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // If user not logged in
  if (!user) {
    return (
      <div className="profile-container not-logged-in">
        <div className="not-logged-in-card">
          <div className="not-logged-in-icon">👤</div>
          <h2>You're not logged in</h2>
          <p>Please log in or create an account to view your profile</p>
          <div className="login-signup-buttons">
            <button onClick={() => navigate("/login")} className="login-btn">
              Log In
            </button>
            <button onClick={() => navigate("/signup")} className="signup-btn">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
    <Navbar/>
      <div className="profile-container">
      <div className="profile-card">
        <div className="avatar-section">
          <div className="avatar">
            {(imagePreview || user.user_metadata?.avatar_url) ? (
              <img
                src={imagePreview || user.user_metadata?.avatar_url}
                alt="Profile"
                className="avatar-img"
              />
            ) : (
              <div className="initials">
                {getInitials(user.user_metadata?.full_name || user.email || "U")}
              </div>
            )}
            {isEditing && (
              <div className="avatar-overlay">
                <label className="upload-btn">
                  📷
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelect}
                    hidden
                  />
                </label>
              </div>
            )}
          </div>
          {isUploading && (
            <div className="upload-progress">
              <div className="spinner"></div>
              <p>Uploading...</p>
            </div>
          )}
        </div>

        {!isEditing ? (
          <div className="profile-view">
            <h2>Welcome, {user.user_metadata?.full_name || user.email || "Guest"}!</h2>
            <p className="email">{user.email}</p>
            {/* <p className="user-id">User ID: {user.id}</p> */}
            <p className="member-since">
              Member since:{" "}
              {new Date(user.created_at).toLocaleDateString()}
            </p>
            
            {/* Debug info (remove in production) */}
            <details style={{ marginTop: '10px', fontSize: '12px' }}>
              <summary>Debug Info</summary>
              <pre style={{ textAlign: 'left', fontSize: '10px' }}>
                {JSON.stringify(user, null, 2)}
              </pre>
            </details>

            <div className="profile-actions">
              <button className="edit-btn" onClick={() => setIsEditing(true)}>
                Edit Profile
              </button>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
              <button className="delete-btn" onClick={handleDelete}>
                Delete Account
              </button>
            </div>
          </div>
        ) : (
          <div className="profile-edit">
            <h2>Edit Profile</h2>
            <form onSubmit={handleProfileUpdate} className="edit-form">
              <div className="form-group">
                <label>Display Name</label>
                <input
                  type="text"
                  name="displayName"
                  value={editForm.displayName}
                  onChange={handleInputChange}
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={editForm.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  required
                />
              </div>

              {selectedFile && (
                <div className="image-preview-section">
                  <p>New profile picture preview:</p>
                  <div className="preview-container">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="preview-img"
                    />
                  </div>
                </div>
              )}

              <div className="form-actions">
                <button type="submit" className="save-btn" disabled={isUploading}>
                  {isUploading ? "Saving..." : "Save Changes"}
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={handleCancelEdit}
                  disabled={isUploading}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default Profile;