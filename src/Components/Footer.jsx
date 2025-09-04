import React, { useState, useEffect } from 'react';
import { supabase } from "../config/supabaseClient";
import './Footer.css';

const RestaurantFooter = ({ onNewComment }) => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    comment: '',
    rating: 5
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  // Fetch logged-in user
  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRatingChange = (rating) => {
    setFormData(prev => ({
      ...prev,
      rating
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setSubmitMessage("❌ You must be logged in to leave a review.");
      return;
    }
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const { data, error } = await supabase
        .from('reviews')
        .insert([{
          user_id: user.id,
          name: user.user_metadata?.full_name || "Anonymous",
          email: user.email,
          pfp: user.user_metadata?.avatar_url || null,
          comment: formData.comment,
          rating: formData.rating,
          created_at: new Date().toISOString()
        }])
        .select();

      if (error) {
        throw error;
      }

      if (onNewComment && data[0]) {
        onNewComment(data[0]);
      }

      setSubmitMessage('✅ Thank you for your review! It has been submitted successfully.');
      setFormData({ comment: '', rating: 5 });
    } catch (error) {
      console.error('Error submitting review:', error);
      setSubmitMessage('❌ Sorry, there was an error submitting your review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <button
        key={index}
        type="button"
        className={`star-btn ${index < rating ? 'filled' : 'empty'}`}
        onClick={() => handleRatingChange(index + 1)}
      >
        ★
      </button>
    ));
  };

  return (
    <footer className="restaurant-footer">
      <div className="footer-background"></div>
      
      {/* Comment Form Section */}
      <div className="comment-form-section">
        <div className="footer-container">
          <div className="comment-form-card">
            <div className="form-header">
              <span className="sub-title">Share Your Experience</span>
              <h3>Tell Us About Your Visit</h3>
              <p>Your feedback helps us create better dining experiences</p>
            </div>
            
            <form className="comment-form" onSubmit={handleSubmit}>
              <div className="rating-section">
                <label className="rating-label">Rate Your Experience</label>
                <div className="rating-stars">
                  {renderStars(formData.rating)}
                </div>
              </div>
              
              <textarea
                name="comment"
                value={formData.comment}
                onChange={handleInputChange}
                placeholder="Tell us about your dining experience..."
                required
                className="form-textarea"
                rows="4"
              />
              
              <button type="submit" className="submit-btn" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <div className="loading-spinner"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Review
                    <span className="btn-arrow">→</span>
                  </>
                )}
              </button>
              
              {submitMessage && (
                <div className={`submit-message ${submitMessage.includes('error') ? 'error' : 'success'}`}>
                  {submitMessage}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="footer-main">
        <div className="footer-container">
          <div className="footer-content">
            
            <div className="footer-section">
              <h4>Restaurant</h4>
              <ul>
                <li><a href="/about">About Us</a></li>
                <li><a href="/menu">Our Menu</a></li>
                <li><a href="/chef">Meet the Chef</a></li>
                <li><a href="/gallery">Gallery</a></li>
                <li><a href="/events">Private Events</a></li>
              </ul>
            </div>

            <div className="footer-section">
              <h4>Services</h4>
              <ul>
                <li><a href="/reservations">Make Reservation</a></li>
                <li><a href="/catering">Catering</a></li>
                <li><a href="/delivery">Delivery</a></li>
                <li><a href="/gift-cards">Gift Cards</a></li>
                <li><a href="/newsletter">Newsletter</a></li>
              </ul>
            </div>

            <div className="footer-section">
              <h4>Support</h4>
              <ul>
                <li><a href="/contact">Contact Us</a></li>
                <li><a href="/faq">FAQ</a></li>
                <li><a href="/feedback">Feedback</a></li>
                <li><a href="/careers">Careers</a></li>
                <li><a href="/press">Press</a></li>
              </ul>
            </div>

            <div className="footer-section">
              <h4>Policies</h4>
              <ul>
                <li><a href="/privacy">Privacy Policy</a></li>
                <li><a href="/terms">Terms of Service</a></li>
                <li><a href="/cancellation">Cancellation</a></li>
                <li><a href="/allergens">Allergen Info</a></li>
                <li><a href="/accessibility">Accessibility</a></li>
              </ul>
            </div>

            <div className="footer-section contact-section">
              <h4>Get in Touch</h4>
              <div className="contact-info">
                <div className="contact-item">
                  <span className="icon">📍</span>
                  <div>
                    <strong>123 Gourmet Street</strong>
                    <p>Port Harcourt, Rivers State</p>
                  </div>
                </div>
                <div className="contact-item">
                  <span className="icon">📞</span>
                  <div>
                    <strong>+234 84 123 4567</strong>
                    <p>Call for reservations</p>
                  </div>
                </div>
                <div className="contact-item">
                  <span className="icon">✉️</span>
                  <div>
                    <strong>hello@epicurereserve.com</strong>
                    <p>We'd love to hear from you</p>
                  </div>
                </div>
              </div>
              
              <div className="social-links">
                <a href="#" className="social-link">
                    <img src="https://img.icons8.com/?size=100&id=106163&format=png&color=000000" alt="Facebook" />
                </a>
                <a href="#" className="social-link">
                    <img src="https://img.icons8.com/?size=100&id=32309&format=png&color=000000" alt="Instagram" />
                </a>
                <a href="#" className="social-link">
                    <img src="https://img.icons8.com/?size=100&id=A4DsujzAX4rw&format=png&color=000000" alt="Twitter" />
                </a>
                <a href="#" className="social-link">
                    <img src="https://img.icons8.com/?size=100&id=38158&format=png&color=000000" alt="Gmail" />
                </a>
             </div>

            </div>
            
          </div>
          
          <div className="footer-bottom">
            <div className="footer-logo">
              <h3>Epicure Reserve</h3>
              <p>Fine Dining Experience Since 2020</p>
            </div>
            <div className="footer-links">
              <span>© 2025 Epicure Reserve. All rights reserved.</span>
              <div className="bottom-links">
                <a href="/sitemap">Sitemap</a>
                <span>•</span>
                <a href="/legal">Legal</a>
                <span>•</span>
                <a href="/cookies">Cookies</a>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </footer>
  );
};

export default RestaurantFooter;
