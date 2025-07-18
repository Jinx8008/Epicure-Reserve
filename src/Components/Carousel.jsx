import React, { useState, useEffect } from "react";
import "../Components/Carousel.css";

import Image1 from "../assets/Images/crsl-img-1.jpg";
import Image2 from "../assets/Images/crsl-img-2.jpg";
import Image3 from "../assets/Images/crsl-img-3.jpg";

const images = [Image1, Image2, Image3];

const HeroCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change slide every 5s

    return () => clearInterval(slideInterval);
  }, []);

  const scrollToReservation = () => {
    const section = document.getElementById("reservation");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      className="hero-carousel"
      style={{ backgroundImage: `url(${images[currentIndex]})` }}
    >
      <div className="overlay-container">
        <div className="overlay">
          <h1>Welcome to Epicure Reserve</h1>
          <p>Book your table in seconds and indulge in luxury dining.</p>
          <button className="cta-btn" onClick={scrollToReservation}>
            Book A Reservation
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroCarousel;
