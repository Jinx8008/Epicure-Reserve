import React, { useRef, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import Navbar from "../Components/Navbar";
import "./Contact.css";
import Footer from "../Components/Footer";
import { FaUser, FaEnvelope, FaCommentDots, FaPaperPlane, FaTimes, FaCheck, FaExclamationTriangle } from "react-icons/fa";

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

const Contact = () => {
  const form = useRef();
  const [isSending, setIsSending] = useState(false);
  const [formTouched, setFormTouched] = useState(false);
  
  // Custom toast state
  const [toast, setToast] = useState({
    isVisible: false,
    message: '',
    type: 'success'
  });

  // Show toast function
  const showToast = (message, type = 'success', duration = 4000) => {
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

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSending(true);

    // Show loading toast
    showToast("Sending your message...", 'loading');

    emailjs
      .sendForm(
        "service_walecpd",
        "template_pv6qe21",
        form.current,
        "zEFgvzt9ZxWipYL_z"
      )
      .then(
        () => {
          showToast("✅ Message sent successfully!", 'success', 5000);
          form.current.reset();
          setFormTouched(false);
          window.scrollTo({ top: 0, behavior: "smooth" });
        },
        () => {
          showToast("❌ Failed to send message. Try again later.", 'error', 6000);
        }
      )
      .finally(() => {
        setIsSending(false);
      });
  };

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (formTouched) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [formTouched]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && e.target.tagName !== "TEXTAREA") {
      e.preventDefault();
    }
  };

  const handleInputChange = () => {
    if (!formTouched) setFormTouched(true);
  };

  return (
    <>
    <Navbar />
      <div className="contact-section" onKeyDown={handleKeyDown}>
      
      {/* Enhanced Contact Container */}
      <div className="contact-container">
        <div className="contact-card">
          
          {/* Header Section */}
          <div className="contact-header">
            <div className="contact-icon">💬</div>
            <h2 className="contact-title">Contact Us</h2>
            <p className="contact-description">
              Have a question, feedback, or reservation inquiry? We'd love to hear from you!
              Fill out the form below and we'll get back to you as soon as possible.
            </p>
          </div>

          {/* Contact Form */}
          <form ref={form} onSubmit={sendEmail} className="contact-form">
            
            {/* Name Input */}
            <div className="form-group">
              <label className="form-label">
                <FaUser className="label-icon" />
                Your Name
              </label>
              <input
                type="text"
                name="user_name"
                className="form-input"
                placeholder="Enter your full name"
                required
                onChange={handleInputChange}
              />
            </div>

            {/* Email Input */}
            <div className="form-group">
              <label className="form-label">
                <FaEnvelope className="label-icon" />
                Your Email
              </label>
              <input
                type="email"
                name="user_email"
                className="form-input"
                placeholder="your@email.com"
                required
                onChange={handleInputChange}
              />
            </div>

            {/* Message Textarea */}
            <div className="form-group">
              <label className="form-label">
                <FaCommentDots className="label-icon" />
                Your Message
              </label>
              <textarea
                name="message"
                className="form-textarea"
                placeholder="Tell us what's on your mind..."
                rows="5"
                required
                onChange={handleInputChange}
              ></textarea>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="contact-btn"
              disabled={isSending}
            >
              {isSending ? (
                <>
                  <span className="btn-spinner"></span>
                  Sending...
                </>
              ) : (
                <>
                  <FaPaperPlane />
                  Send Message
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="contact-footer">
            <p>
              You can also reach us directly at{' '}
              <span className="contact-link">epicurereserve@restaurant.com</span>
            </p>
          </div>

          {/* Custom Toast Notification */}
          <CustomToast
            message={toast.message}
            type={toast.type}
            isVisible={toast.isVisible}
            onClose={closeToast}
          />
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default Contact;