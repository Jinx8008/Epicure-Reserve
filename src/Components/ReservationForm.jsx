import React, { useState } from "react";
import { bookReservation } from "./handleReservation";
import "./ReservationForm.css";
import { FaUser, FaCalendarAlt, FaClock } from "react-icons/fa";

// ✅ Start the component
const ReservationForm = () => {
  // 🔹 Track form input values
  const [formData, setFormData] = useState({
    name: "Guest", // Optional default name
    date: "",
    time: "",
    people: "1"
  });

  // 🔹 Track status message (e.g. success, error)
  const [status, setStatus] = useState("");

  // 🔹 Handle input updates
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // 🔹 Submit the form and check availability
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Checking availability...");

    const result = await bookReservation(formData);
    setStatus(result.message);

    if (result.success) {
      // Reset form only if successful
      setFormData({
        name: "Guest",
        date: "",
        time: "",
        people: "1"
      });
    }
  };

  return (
    <section className="reservation-wrapper">
      <h2 className="reservation-title">
        Our Chef Is Very Busy <br /> Book A Table
      </h2>

      {/* ✅ Submit logic is connected here */}
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
            <option value="5+">5+ People</option>
          </select>
        </div>

        <div className="midtext"><p>For</p></div>

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

        <div className="midtext"><p>At</p></div>

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

        {/* 🔸 Status Feedback */}
        <div className="midtext">
          <p>{status}</p>
        </div>

        {/* 🔸 Submit Button */}
        <button type="submit" className="book-btn">
          BOOK A TABLE
        </button>
      </form>
    </section>
  );
};

export default ReservationForm;
