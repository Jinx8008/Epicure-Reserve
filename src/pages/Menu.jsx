import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
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
    image: "https://www.seriouseats.com/thmb/2Ukl3a4cFZjOAWa4B6aV2HXrAEE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/20211202-LobsterBisque-AmandaSuarez-hero-2-2c1b5a7e35d94b2e9222586dd1c4fd2f.jpg",
  },

  /* Main Courses */
  {
    title: "Grilled Salmon",
    category: "Main Courses",
    description: "Freshly grilled salmon with lemon‑dill sauce.",
    price: 22,
    image: "https://www.thespruceeats.com/thmb/4_2U_6BR8h5mN8lD-NhsDN0v2tc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/grilled-salmon-3059432-hero-01-f0a40813b74742ff911a8d4d5974d496.jpg",
  },
  {
    title: "Filet Mignon",
    category: "Main Courses",
    description: "Prime cut filet mignon with red‑wine reduction.",
    price: 32,
    image: "https://www.simplyrecipes.com/thmb/9M-mMuD0u29j8Bu6BW4TOr9n5tc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Simply-Recipes-Filet-Mignon-LEAD-02-2c24462d7e5c421e944e479c553574c6.jpg",
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
    image: "https://www.simplyrecipes.com/thmb/nzkqN7xBAyT1yAZD0K5uQ4ZIKzU=/2000x0/filters:no_upscale():max_bytes(150000):strip_icc()/Simply-Recipes-Key-Lime-Pie-LEAD-05-c0d3bc94db804df89ac76904d2c13a0b.jpg",
  },

  /* Kids Menu */
  {
    title: "Chicken Tenders",
    category: "Kids Menu",
    description: "Golden crispy chicken tenders with fries.",
    price: 6,
    image: "https://www.culinaryhill.com/wp-content/uploads/2022/01/Chicken-Tenders-Culinary-Hill-1200x800-1.jpg",
  },
  {
    title: "Mac & Cheese",
    category: "Kids Menu",
    description: "Creamy mac and cheese, kid‑approved!",
    price: 5,
    image: "https://www.spendwithpennies.com/wp-content/uploads/2021/10/SpendWithPennies-Easy-Mac-and-Cheese-SpendWithPennies-20.jpg",
  },

  /* Drinks */
  {
    title: "Lemonade",
    category: "Drinks",
    description: "Refreshing lemonade with mint.",
    price: 4,
    image: "https://www.acouplecooks.com/wp-content/uploads/2020/07/Mint-Lemonade-006.jpg",
  },
  {
    title: "Chocolate Milkshake",
    category: "Drinks",
    description: "Rich chocolate milkshake with whipped cream.",
    price: 5,
    image: "https://static01.nyt.com/images/2020/07/06/dining/03milkshakerex1/03milkshakerex1-threeByTwoMediumAt2X.jpg",
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
    <div className="menu-page">
      <Navbar />
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
  );
};

export default Menu;
