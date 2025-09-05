import React, { useState } from "react";
import { bookReservation } from "./handleReservation";
import { supabase } from "../config/supabaseClient";
import bgimg from "../assets/Images/_Pngtree_restaurant_menu_background_material_1033618-removebg-preview.png";
import "./ReservationForm.css";
import { FaUser, FaCalendarAlt, FaClock, FaTimes, FaCheck, FaExclamationTriangle } from "react-icons/fa";

// Custom Toast Component
const CustomToast = ({ message, type, isVisible, onClose }) => {
  if (!isVisible) return null;

  const getIcon = () => {
    switch (type) {
      case 'success': return <FaCheck />;
      case 'error': return <FaExclamationTriangle />;
      case 'loading': return <div className="spinner"></div>;
      default: return null;
    }
  };

  const getToastClass = () => {
    switch (type) {
      case 'success': return 'toast-success';
      case 'error': return 'toast-error';
      case 'loading': return 'toast-loading';
      default: return '';
    }
  };

  return (
    <div className={`custom-toast ${getToastClass()}`}>
      <div className="toast-content">
        <div className="toast-icon">
          {getIcon()}
        </div>
        <span className="toast-message">{message}</span>
        {type !== 'loading' && (
          <button className="toast-close" onClick={onClose}>
            <FaTimes />
          </button>
        )}
      </div>
    </div>
  );
};

const ReservationForm = () => {
  const [formData, setFormData] = useState({
    name: "Guest",
    email: "",
    date: "",
    time: "",
    people: "1",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Custom toast state
  const [toast, setToast] = useState({
    isVisible: false,
    message: '',
    type: 'success'
  });

  // Show toast function
  const showToast = (message, type = 'success', duration = 3000) => {
    setToast({ isVisible: true, message, type });
    
    if (type !== 'loading') {
      setTimeout(() => {
        setToast(prev => ({ ...prev, isVisible: false }));
      }, duration);
    }
  };

  // Close toast function
  const closeToast = () => {
    setToast(prev => ({ ...prev, isVisible: false }));
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // 🔐 Get current user info from Supabase
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      showToast("❌ You must be logged in to make a reservation.", 'error');
      setIsSubmitting(false);
      return;
    }

    // 🔄 Show loading toast
    showToast("Checking availability...", 'loading');

    // ✅ Prepare reservation data aligned with DB
    const result = await bookReservation({
      user_id: user.id, // Supabase user ID (uuid)
      name: user.user_metadata?.full_name || formData.name,
      email: user.email,
      guests: parseInt(formData.people, 10), // map people -> guests
      date: formData.date,
      time: formData.time,
      phone: null, // optional for now
      special_request: null, // optional for now
    });

    if (result.success) {
      showToast("✅ Reservation Successful!", 'success', 4000);

      setFormData({
        name: "Guest",
        email: "",
        date: "",
        time: "",
        people: "1",
      });
    } else {
      showToast(`❌ ${result.message}`, 'error', 5000);
    }
    
    setIsSubmitting(false);
  };

  return (
    <section className="reservation-wrapper" id="reservation-form">
      <div className="section-inner">
        <div className="form-main-container">
          <h2 className="reservation-title">
            Our Chef Is Very Busy <br /> Book A Table
          </h2>

          <form className="reservation-box" onSubmit={handleSubmit}>
            {/* 🔸 People Dropdown */}
            <div className="input-group">
              <FaUser className="icon" />
              <select
                name="people"
                value={formData.people}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option value="1">1 Person</option>
                <option value="2">2 People</option>
                <option value="3">3 People</option>
                <option value="4">4 People</option>
                <option value="5">5 People</option>
              </select>
            </div>

            <div className="midtext">
              <p>For</p>
            </div>

            {/* 🔸 Date Picker */}
            <div className="input-group">
              <FaCalendarAlt className="icon" />
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>

            <div className="midtext">
              <p>At</p>
            </div>

            {/* 🔸 Time Picker */}
            <div className="input-group">
              <FaClock className="icon" />
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
              />
            </div>

            {/* 🔸 Submit Button */}
            <button 
              type="submit" 
              className="book-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="btn-spinner"></span>
                  BOOKING...
                </>
              ) : (
                "BOOK A TABLE"
              )}
            </button>
          </form>

          {/* Custom Toast Notification */}
          <CustomToast
            message={toast.message}
            type={toast.type}
            isVisible={toast.isVisible}
            onClose={closeToast}
          />
        </div>
      </div>
    </section>
  );
};

export default ReservationForm;