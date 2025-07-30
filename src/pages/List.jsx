import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUtensils,
  FaCoffee,
  FaHamburger,
  FaIceCream,
  FaCocktail,
  FaStar,
} from "react-icons/fa";

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

const List = () => {
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
    <div className="menu-page bg-transparent min-h-screen py-10 px-4">
      <div className="menu-container max-w-6xl mx-auto">
        <div className="menu-header text-center mb-10">
          <p className="text-lg font-medium text-gray-100">OUR MENU</p>
          <h1 className="text-4xl md:text-5xl font-bold text-amber-500 mt-2">
            Tasty Treats at a Good Price
          </h1>
        </div>

        {/* Categories */}
        <div className="menu-categories flex flex-wrap justify-center gap-4 my-6">
          {menuCategories.map((cat) => (
            <div
              key={cat.label}
              onClick={() => handleCategoryClick(cat.label)}
              className={`cursor-pointer w-28 h-28 flex flex-col items-center justify-center rounded-lg shadow-md transition-all duration-300 ${
                activeCategory === cat.label
                  ? "bg-amber-500 text-white"
                  : "bg-white text-gray-700"
              }`}
            >
              <span className="text-3xl mb-1">{cat.icon}</span>
              <span className="text-sm font-semibold">{cat.label}</span>
            </div>
          ))}
        </div>

        {/* Menu Items */}
        <div className="menu-items grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10">
          {filteredItems.map((item, index) => (
            <div className="menu-card bg-white rounded-lg shadow-md overflow-hidden" key={index}>
              <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
              <div className="menu-info p-4">
                <div className="rating mb-2 flex">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      onClick={() => handleStarClick(item.title, i)}
                      className={`cursor-pointer mr-1 ${
                        i < (ratings[item.title] || 0)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <h2 className="text-xl font-semibold">{item.title}</h2>
                <p className="text-gray-500 text-sm mt-1 mb-2">
                  {item.description}
                </p>
                <p className="text-lg font-bold text-amber-400">
                  ${item.price.toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* View More */}
        <div className="view-more text-center mt-10">
          <button
            onClick={() => navigate("/menu")}
            className="bg-amber-500 w-60 hover:bg-amber-400 text-black px-6 py-3 rounded-md text-lg shadow-md transition"
          >
            View Full Menu List
          </button>
        </div>
      </div>
    </div>
  );
};

export default List;
