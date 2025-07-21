import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import {
  FaUtensils,
  FaCoffee,
  FaHamburger,
  FaIceCream,
  FaCocktail,
  FaStar,
} from "react-icons/fa";
import "./Menu.css";

// Categories
const menuCategories = [
  { label: "All", icon: <FaUtensils /> },
  { label: "Breakfast", icon: <FaCoffee /> },
  { label: "Lunch", icon: <FaHamburger /> },
  { label: "Dinner", icon: <FaUtensils /> },
  { label: "Dessert", icon: <FaIceCream /> },
  { label: "Drink", icon: <FaCocktail /> },
];

// Sample menu items
const allMenuItems = [
  {
    title: "Chicken Biryani",
    category: "Lunch",
    description: "Spicy Indian rice dish with chicken.",
    price: 35,
    image:
      "https://www.cubesnjuliennes.com/wp-content/uploads/2020/07/Chicken-Biryani-Recipe.jpg",
  },
  {
    title: "Antipasto Salad",
    category: "Dinner",
    description: "Fresh vegetables, meats, and cheese salad.",
    price: 18,
    image:
      "https://hostthetoast.com/wp-content/uploads/2018/08/antipasto-pasta-salad-5-320x320-1.jpg",
  },
  {
    title: "Finger Chicken",
    category: "Breakfast",
    description: "Crispy fried chicken fingers with dip.",
    price: 12,
    image: "https://i.ytimg.com/vi/3hwbUW9DfCI/maxresdefault.jpg",
  },
  {
    title: "Chocolate Cake",
    category: "Dessert",
    description: "Delicious chocolate cake with cream.",
    price: 8,
    image:
      "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/easy-chocolate-molten-cakes-37a25eb.jpg",
  },
  {
    title: "Lemonade",
    category: "Drink",
    description: "Refreshing lemonade with mint.",
    price: 5,
    image:
      "https://www.tastingtable.com/img/gallery/20-underrated-drinks-you-should-be-ordering-at-a-bar/intro-1695390668.jpg",
  },
  {
    title: "Pigeon Burger",
    category: "Lunch",
    description: "Unique burger with tender pigeon meat.",
    price: 13,
    image:
      "https://www.mypigeonforge.com/wp-content/uploads/2024/07/Cookie-Dough-Monster-burgers.jpg",
  },
];

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [ratings, setRatings] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const storedRatings = localStorage.getItem("menuRatings");
    if (storedRatings) {
      setRatings(JSON.parse(storedRatings));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("menuRatings", JSON.stringify(ratings));
  }, [ratings]);

  const handleCategoryClick = (category) => setActiveCategory(category);

  const handleStarClick = (itemTitle, index) => {
    setRatings((prev) => ({ ...prev, [itemTitle]: index + 1 }));
  };

  const filteredItems =
    activeCategory === "All"
      ? allMenuItems
      : allMenuItems.filter((item) => item.category === activeCategory);

  return (
    <div className="menu-page">
      <Navbar/>
      <div className="menu-container">
        <div className="menu-header">
          <p>OUR MENU</p>
          <h1>Tasty Treats at a Ggit brancood Price</h1>
        </div>

        <div className="menu-categories">
          {menuCategories.map((cat) => (
            <div
              key={cat.label}
              onClick={() => handleCategoryClick(cat.label)}
              className={`menu-category ${
                activeCategory === cat.label ? "active" : ""
              }`}
            >
              <span className="icon">{cat.icon}</span>
              <span>{cat.label}</span>
            </div>
          ))}
        </div>

        <div className="menu-items">
          {filteredItems.map((item, index) => (
            <div className="menu-card" key={index}>
              <img src={item.image} alt={item.title} />
              <div className="menu-info">
                <div className="rating">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      onClick={() => handleStarClick(item.title, i)}
                      className={
                        i < (ratings[item.title] || 0)
                          ? "star active"
                          : "star"
                      }
                    />
                  ))}
                </div>
                <h2>{item.title}</h2>
                <p className="description">{item.description}</p>
                <p className="price">${item.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>

        {/* <div className="view-more">
          <button onClick={() => navigate("/menu")}>
            View Full Menu List
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default Menu;
