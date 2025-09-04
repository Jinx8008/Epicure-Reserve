import React, { useState } from "react";
import { bookReservation } from "./handleReservation";
import { supabase } from "../config/supabaseClient";
import bgimg from "../assets/Images/_Pngtree_restaurant_menu_background_material_1033618-removebg-preview.png";
import "./ReservationForm.css";
import { FaUser, FaCalendarAlt, FaClock } from "react-icons/fa";

// ✅ Toastify Imports
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ReservationForm = () => {
  const [formData, setFormData] = useState({
    name: "Guest",
    email: "",
    date: "",
    time: "",
    people: "1",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

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
      toast.error("❌ You must be logged in to make a reservation.");
      setIsSubmitting(false);
      return;
    }

    // 🔄 Show loading toast
    const loadingId = toast.loading("Checking availability...");

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
      toast.update(loadingId, {
        render: "✅ Reservation Successful!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      setFormData({
        name: "Guest",
        email: "",
        date: "",
        time: "",
        people: "1",
      });
    } else {
      toast.update(loadingId, {
        render: `❌ ${result.message}`,
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
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

          {/* ✅ Toastify Container */}
          <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={true}
            newestOnTop
            closeOnClick
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </div>
      </div>
    </section>
  );
};

export default ReservationForm;