import React from "react";
import Navbar from "../Components/Navbar";
import { Link } from "react-router-dom";
import CvIcon1 from "../assets/Images/icons8-sparkle-50.png"
import CvIcon2 from "../assets/Images/icons8-trust-24.png"
import CvIcon3 from "../assets/Images/icons8-infinity-30.png"
import CvIcon4 from "../assets/Images/icons8-vip-30.png"
import "./About.css";

const About = () => {
  return (
    <section className="about" id="about">
      <Navbar/>
      <div className="about-container">
        <div className="about-text">
          <h2>Welcome to Epicure Reserve</h2>
          <p>
            “Born out of a passion for elevated dining experiences, Epicure Reserve was designed to bring people together in an atmosphere where luxury and comfort coexist. Our team of culinary innovators and hospitality experts came together to redefine what it means to dine out.”
          </p>

          <div className="mission-vision-container">
            <div className="mission">
              <h3>Our Mission</h3>
              <p>At Epicure Reserve, our mission is to deliver an unforgettable dining experience by blending luxurious ambiance, contemporary cuisine, and warm hospitality. We are committed to crafting moments that bring people together—whether for celebrations, casual outings, or family gatherings.</p>
            </div>
            <div className="vision">
              <h3>Our Vision</h3>
              <p>To become the leading destination for refined yet relaxed dining, where elegance meets everyday comfort and every guest feels like royalty.</p>
            </div>

          </div>


             <div className="core-value-container">
              <div>
                <img src={CvIcon1} alt="" />
                <p>Elegance in Simplicity</p>
              </div>
              <div>
                <img src={CvIcon2} alt="" />
                <p>Hospitality Above All</p>
              </div>
              <div>
                <img src={CvIcon3} alt="" />
                <p>Modern Yet Timeless</p>
              </div>
              <div>
                <img src={CvIcon4} alt="" />
                <p>Every Guest is VIP</p>
              </div>
            </div>

          <div className="why-choose">
            <h3>Why Choose Us</h3>
            <ul>
              <li>✔ Fresh, seasonal ingredients</li>
              <li>✔ Family-friendly ambiance</li>
              <li>✔ Luxury meets comfort</li>
              <li>✔ Modern minimalist design</li>
              <li>✔ Instant Reservations</li>
              <li>✔ Top-rated Restaurants</li>
              <li>✔ Secure Bookings</li>
              <li>✔ Expanding Globally</li>
            </ul>
          </div>


          <div className="hours">
            <p><strong>Operating Hours:</strong> 10:00am – 10:00pm (Daily)</p>
          </div>

          <div className="cta-container">
            <Link to="/" className="cta-button">
              Book a Table Now
            </Link>
           </div>

        </div>

        <div className="about-image">
          {/* Placeholder for Gallery */}
          <div className="about-gallery-placeholder">
            <p>[Gallery Section Here]</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
