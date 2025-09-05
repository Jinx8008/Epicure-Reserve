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
  
  // Reservation history states
  const [reservations, setReservations] = useState([]);
  const [reservationsLoading, setReservationsLoading] = useState(true);
  const [reservationFilter, setReservationFilter] = useState('all'); // all, upcoming, past
  
  const navigate = useNavigate();

  // Monitor authentication state
  useEffect(() => {
    const getUser = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const { data: { user }, error } = await supabase.auth.getUser();
        
        if (error) {
          setError(error.message);
          return;
        }

        if (user) {
          setUser(user);
          setEditForm({
            displayName: user.user_metadata?.full_name || "",
            email: user.email || ""
          });
          
          fetchReservations(user.id);
        }
      } catch (err) {
        setError("An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        setUser(session.user);
        setEditForm({
          displayName: session.user.user_metadata?.full_name || "",
          email: session.user.email || ""
        });
        setError(null);
        fetchReservations(session.user.id);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setEditForm({ displayName: "", email: "" });
        setReservations([]);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Fetch user reservations
  const fetchReservations = async (userId) => {
    try {
      setReservationsLoading(true);
      const { data, error } = await supabase
        .from('Reservations')
        .select('*')
        .eq('user_id', userId)
        .order('date', { ascending: false })
        .order('time', { ascending: false });

      if (!error) setReservations(data || []);
    } catch (err) {
      console.error("Unexpected error fetching reservations:", err);
    } finally {
      setReservationsLoading(false);
    }
  };

  const getFilteredReservations = () => {
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    const currentTime = now.toTimeString().slice(0, 5);

    return reservations.filter(reservation => {
      const reservationDate = reservation.date;
      const reservationTime = reservation.time;
      
      if (reservationFilter === 'all') return true;
      
      if (reservationFilter === 'upcoming') {
        return (
          reservationDate > today || 
          (reservationDate === today && reservationTime > currentTime)
        );
      }
      
      if (reservationFilter === 'past') {
        return (
          reservationDate < today || 
          (reservationDate === today && reservationTime <= currentTime)
        );
      }
      
      return true;
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    const time = new Date();
    time.setHours(parseInt(hours), parseInt(minutes));
    return time.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const isUpcoming = (date, time) => {
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    const currentTime = now.toTimeString().slice(0, 5);
    
    return (
      date > today || 
      (date === today && time > currentTime)
    );
  };

  const handleEditReservation = async (reservation) => {
    const newName = prompt("Update reservation name:", reservation.name);
    const newGuests = prompt("Update guest count:", reservation.guest);
    const newDate = prompt("Update date (YYYY-MM-DD):", reservation.date);
    const newTime = prompt("Update time (HH:MM):", reservation.time);

    if (newName && newGuests && newDate && newTime) {
      const { error } = await supabase
        .from("Reservations")
        .update({
          name: newName,
          guest: parseInt(newGuests),
          date: newDate,
          time: newTime,
        })
        .eq("id", reservation.id);

      if (error) {
        alert("Error updating reservation: " + error.message);
      } else {
        alert("Reservation updated!");
        fetchReservations(user.id);
      }
    }
  };

  const handleDeleteReservation = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this reservation?"))
      return;

    const { error } = await supabase.from("Reservations").delete().eq("id", id);

    if (error) {
      alert("Error deleting reservation: " + error.message);
    } else {
      alert("Reservation cancelled!");
      fetchReservations(user.id);
    }
  };

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

  // ✅ Corrected Upload
  const uploadProfileImage = async (file) => {
    if (!file || !user) return null;

    const filePath = `${user.id}/${Date.now()}_${file.name}`;
    const userId = user.id;

    const { error: uploadError } = await supabase.storage
      .from("avatars") // bucket name must be lowercase
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: true,
        metadata: {
          owner: userId, // ✅ Added owner metadata for RLS
        },
      });

    if (uploadError) {
      console.error(uploadError);
      alert("Error uploading image. Please try again.");
      return null;
    }

    const { data } = supabase.storage
      .from("avatars")
      .getPublicUrl(filePath);

    return data?.publicUrl || null;
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    if (!user) return;

    try {
      setIsUploading(true);
      let newPhotoURL = user.user_metadata?.avatar_url || null;

      if (selectedFile) {
        newPhotoURL = await uploadProfileImage(selectedFile);
        if (!newPhotoURL) return;
      }

      const { error: updateError } = await supabase.auth.updateUser({
        email: editForm.email,
        data: {
          full_name: editForm.displayName,
          avatar_url: newPhotoURL,
        },
      });

      if (updateError) throw updateError;

      const { data: { user: updatedUser } } = await supabase.auth.getUser();
      setUser(updatedUser);

      setIsEditing(false);
      setSelectedFile(null);
      setImagePreview(null);
      alert("Profile updated successfully!");
    } catch (error) {
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

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleDelete = async () => {
    alert("Account deletion must be handled from backend or with RLS policies.");
  };

  const getInitials = (name) =>
    name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

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

  const filteredReservations = getFilteredReservations();

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
              <p className="member-since">
                Member since:{" "}
                {new Date(user.created_at).toLocaleDateString()}
              </p>
              
              {/* Reservation History Section */}
              <div className="reservation-history">
                <h3>Reservation History</h3>
                
                <div className="reservation-filters">
                  <button 
                    className={`filter-btn ${reservationFilter === 'all' ? 'active' : ''}`}
                    onClick={() => setReservationFilter('all')}
                  >
                    All ({reservations.length})
                  </button>
                  <button 
                    className={`filter-btn ${reservationFilter === 'upcoming' ? 'active' : ''}`}
                    onClick={() => setReservationFilter('upcoming')}
                  >
                    Upcoming ({reservations.filter(r => isUpcoming(r.date, r.time)).length})
                  </button>
                  <button 
                    className={`filter-btn ${reservationFilter === 'past' ? 'active' : ''}`}
                    onClick={() => setReservationFilter('past')}
                  >
                    Past ({reservations.filter(r => !isUpcoming(r.date, r.time)).length})
                  </button>
                </div>

                <div className="reservations-list">
                  {reservationsLoading ? (
                    <div className="reservations-loading">
                      <div className="spinner"></div>
                      <p>Loading reservations...</p>
                    </div>
                  ) : filteredReservations.length > 0 ? (
                    filteredReservations.map((reservation) => (
                      <div 
                        key={reservation.id} 
                        className={`reservation-item ${isUpcoming(reservation.date, reservation.time) ? 'upcoming' : 'past'}`}
                      >
                        <div className="reservation-header">
                          <div className="reservation-date">
                            <span className="date">{formatDate(reservation.date)}</span>
                            <span className="time">{formatTime(reservation.time)}</span>
                          </div>
                          <div className={`reservation-status ${isUpcoming(reservation.date, reservation.time) ? 'upcoming' : 'past'}`}>
                            {isUpcoming(reservation.date, reservation.time) ? 'Upcoming' : 'Past'}
                          </div>
                        </div>
                        <div className="reservation-details">
                          <p><strong>Name:</strong> {reservation.name}</p>
                          <p><strong>Guests:</strong> {reservation.guest} {reservation.guest === 1 ? 'person' : 'people'}</p>
                          <p><strong>Booked:</strong> {new Date(reservation.created_at).toLocaleDateString()}</p>
                        </div>

                        {isUpcoming(reservation.date, reservation.time) && (
                          <div className="reservation-actions">
                            <button 
                              className="edit-res-btn"
                              onClick={() => handleEditReservation(reservation)}
                            >
                              ✏️ Edit
                            </button>
                            <button 
                              className="cancel-res-btn"
                              onClick={() => handleDeleteReservation(reservation.id)}
                            >
                              🗑️ Cancel
                            </button>
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="no-reservations">
                      <div className="no-reservations-icon">🍽️</div>
                      <h4>No {reservationFilter === 'all' ? '' : reservationFilter} reservations</h4>
                      <p>
                        {reservationFilter === 'all' 
                          ? "You haven't made any reservations yet." 
                          : `You don't have any ${reservationFilter} reservations.`}
                      </p>
                      {reservationFilter === 'all' && (
                        <button 
                          onClick={() => navigate('/reservation')} 
                          className="book-now-btn"
                        >
                          Book Your First Table
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>

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
