import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import {
  FaUtensils,
  FaHamburger,
  FaIceCream,
  FaCocktail,
  FaStar,
  FaSearch,
} from "react-icons/fa";
import "./Menu.css";

/* ------------------  CATEGORIES ------------------ */
const menuCategories = [
  { label: "All",           icon: <FaUtensils /> },
  { label: "Appetizers",    icon: <FaUtensils /> },
  { label: "Main Courses",  icon: <FaHamburger /> },
  { label: "Desserts",      icon: <FaIceCream /> },
  { label: "Kids Menu",     icon: <FaUtensils /> },
  { label: "Drinks",        icon: <FaCocktail /> },
];

/* ------------------  MENU DATA ------------------ */
const allMenuItems = [
  /* Appetizers */
  {
    title: "Crispy Calamari",
    category: "Appetizers",
    description: "Tender calamari with a zesty marinara sauce.",
    price: 9,
    image: "https://img.buzzfeed.com/thumbnailer-prod-us-east-1/video-api/assets/216812.jpg",
  },
  {
    title: "Lobster Bisque",
    category: "Appetizers",
    description: "Creamy lobster soup with a hint of sherry.",
    price: 14,
    image: "https://i.pinimg.com/736x/e1/ce/3f/e1ce3fb8c01a6b4344931ba2e155fac9.jpg",
  },

  /* Main Courses */
  {
    title: "Grilled Salmon",
    category: "Main Courses",
    description: "Freshly grilled salmon with lemon‑dill sauce.",
    price: 22,
    image: "https://i.pinimg.com/1200x/a8/ac/21/a8ac21fd838e87e55e23589a826ecfff.jpg",
  },
  {
    title: "Filet Mignon",
    category: "Main Courses",
    description: "Prime cut filet mignon with red‑wine reduction.",
    price: 32,
    image: "https://i.pinimg.com/1200x/88/2d/57/882d570d84a9154d26814998265a5a00.jpg",
  },

  /* Desserts */
  {
    title: "Chocolate Lava Cake",
    category: "Desserts",
    description: "Warm chocolate cake with a molten center.",
    price: 10,
    image: "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/easy-chocolate-molten-cakes-37a25eb.jpg",
  },
  {
    title: "Key Lime Pie",
    category: "Desserts",
    description: "Classic key lime pie with a graham‑cracker crust.",
    price: 7,
    image: "https://i.pinimg.com/1200x/8b/9c/0d/8b9c0ddc76e6f80884fd6eb6bcd5d6fe.jpg",
  },

  /* Kids Menu */
  {
    title: "Chicken Tenders",
    category: "Kids Menu",
    description: "Golden crispy chicken tenders with fries.",
    price: 6,
    image: "https://i.pinimg.com/736x/9d/1a/d6/9d1ad6513e1aefa5586473224b217aef.jpg",
  },
  {
    title: "Mac & Cheese",
    category: "Kids Menu",
    description: "Creamy mac and cheese, kid‑approved!",
    price: 5,
    image: "https://i.pinimg.com/1200x/3f/f0/de/3ff0def49fa151497743094f67ae61ec.jpg",
  },

  /* Drinks */
  {
    title: "Lemonade",
    category: "Drinks",
    description: "Refreshing lemonade with mint.",
    price: 4,
    image: "https://i.pinimg.com/736x/93/ee/20/93ee20287f13f86937f425ac053b7a21.jpg",
  },
  {
    title: "Chocolate Milkshake",
    category: "Drinks",
    description: "Rich chocolate milkshake with whipped cream.",
    price: 5,
    image: "https://i.pinimg.com/736x/87/17/4a/87174a7f303abed8af3f85a138dc4176.jpg",
  },
];

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [ratings, setRatings] = useState({});

  /* -------- Persist ★ ratings locally -------- */
  useEffect(() => {
    const stored = localStorage.getItem("menuRatings");
    if (stored) setRatings(JSON.parse(stored));
  }, []);
  useEffect(() => {
    localStorage.setItem("menuRatings", JSON.stringify(ratings));
  }, [ratings]);

  /* -------- Filtering -------- */
  const byCategory =
    activeCategory === "All"
      ? allMenuItems
      : allMenuItems.filter((i) => i.category === activeCategory);

  const filteredItems = byCategory.filter(
    (i) =>
      i.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  /* -------- Handlers -------- */
  const handleStarClick = (title, idx) =>
    setRatings((prev) => ({ ...prev, [title]: idx + 1 }));

  return (
    <>
      <Navbar />
      <div className="menu-page">
      <section className="menu-container">
        {/* ---------- Header ---------- */}
        <header className="menu-header">
          <p className="sub-title">OUR MENU</p>
          <h1>Tasty Treats at a Good Price</h1>
        </header>

        {/* ---------- Search ---------- */}
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search menu items"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* ---------- Category Chips ---------- */}
        <div className="menu-categories">
          {menuCategories.map(({ label, icon }) => (
            <button
              key={label}
              onClick={() => setActiveCategory(label)}
              className={`menu-category ${
                activeCategory === label ? "active" : ""
              }`}
            >
              <span className="icon">{icon}</span>
              {label}
            </button>
          ))}
        </div>

        {/* ---------- Menu Grid ---------- */}
        <div className="menu-items">
          {filteredItems.map((item) => (
            <article className="menu-card" key={item.title}>
              <img src={item.image} alt={item.title} loading="lazy" />
              <div className="menu-info">
                <div className="rating">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      onClick={() => handleStarClick(item.title, i)}
                      className={
                        i < (ratings[item.title] || 0) ? "star active" : "star"
                      }
                    />
                  ))}
                </div>
                <h2 className="dish">{item.title}</h2>
                <p className="description">{item.description}</p>
                <p className="price">${item.price.toFixed(2)}</p>
              </div>
            </article>
          ))}
          {filteredItems.length === 0 && (
            <p className="no-results">No items match your search.</p>
          )}
        </div>
      </section>
    </div>
      <Footer />
    </>
  );
};

export default Menu;
