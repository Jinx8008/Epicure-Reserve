import React from "react";
import { FaStar, FaArrowRight, FaUtensils } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./MenuPreview.css";

// Featured menu items for homepage preview
const featuredItems = [
  {
    title: "Grilled Salmon",
    category: "Main Courses",
    description: "Freshly grilled salmon with lemon‑dill sauce.",
    price: 22,
    image: "https://i.pinimg.com/1200x/a8/ac/21/a8ac21fd838e87e55e23589a826ecfff.jpg",
    rating: 5,
    badge: "Chef's Special"
  },
  {
    title: "Filet Mignon",
    category: "Main Courses",
    description: "Prime cut filet mignon with red‑wine reduction.",
    price: 32,
    image: "https://i.pinimg.com/1200x/88/2d/57/882d570d84a9154d26814998265a5a00.jpg",
    rating: 5,
    badge: "Premium"
  },
  {
    title: "Chocolate Lava Cake",
    category: "Desserts",
    description: "Warm chocolate cake with a molten center.",
    price: 10,
    image: "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/easy-chocolate-molten-cakes-37a25eb.jpg",
    rating: 4,
    badge: "Popular"
  },
  {
    title: "Lobster Bisque",
    category: "Appetizers",
    description: "Creamy lobster soup with a hint of sherry.",
    price: 14,
    image: "https://i.pinimg.com/736x/e1/ce/3f/e1ce3fb8c01a6b4344931ba2e155fac9.jpg",
    rating: 5,
    badge: "Signature"
  }
];

const MenuPreview = () => {
  return (
    <section className="menu-preview-section">
      <div className="menu-preview-container">
        {/* Header */}
        <div className="menu-preview-header">
          <p className="menu-preview-subtitle">OUR SPECIALTIES</p>
          <h2 className="menu-preview-title">Taste Our Finest Dishes</h2>
          <p className="menu-preview-description">
            Discover our chef's carefully crafted signature dishes, 
            made with the finest ingredients and passion for culinary excellence.
          </p>
        </div>

        {/* Featured Items Grid */}
        <div className="featured-items-grid">
          {featuredItems.map((item, index) => (
            <article className="featured-card" key={item.title}>
              {/* Badge */}
              <div className="featured-badge">
                <FaUtensils className="badge-icon" />
                {item.badge}
              </div>

              {/* Image */}
              <div className="featured-image">
                <img src={item.image} alt={item.title} loading="lazy" />
                <div className="image-overlay"></div>
              </div>

              {/* Content */}
              <div className="featured-content">
                <div className="featured-rating">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={i < item.rating ? "star active" : "star"}
                    />
                  ))}
                </div>
                
                <h3 className="featured-title">{item.title}</h3>
                <p className="featured-category">{item.category}</p>
                <p className="featured-description">{item.description}</p>
                
                <div className="featured-price-container">
                  <span className="featured-price">${item.price.toFixed(2)}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* CTA Section */}
        <div className="menu-cta-section">
          <div className="menu-cta-content">
            <h3>Hungry for More?</h3>
            <p>Explore our complete menu with over 20 delicious dishes</p>
            <Link to="/menu" className="menu-cta-button">
              <span>View Full Menu</span>
              <FaArrowRight className="cta-arrow" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MenuPreview;