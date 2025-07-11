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
  { label: "All", icon: <FaUtensils size={30} /> },
  { label: "Breakfast", icon: <FaCoffee size={30} /> },
  { label: "Lunch", icon: <FaHamburger size={30} /> },
  { label: "Dinner", icon: <FaUtensils size={30} /> },
  { label: "Dessert", icon: <FaIceCream size={30} /> },
  { label: "Drink", icon: <FaCocktail size={30} /> },
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

  // Load ratings from localStorage on mount
  useEffect(() => {
    const storedRatings = localStorage.getItem("menuRatings");
    if (storedRatings) {
      setRatings(JSON.parse(storedRatings));
    }
  }, []);

  // Update localStorage when ratings change
  useEffect(() => {
    localStorage.setItem("menuRatings", JSON.stringify(ratings));
  }, [ratings]);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  const handleStarClick = (itemTitle, index) => {
    setRatings((prev) => ({ ...prev, [itemTitle]: index + 1 }));
  };

  const filteredItems =
    activeCategory === "All"
      ? allMenuItems
      : allMenuItems.filter((item) => item.category === activeCategory);

      const navigate = useNavigate();

  return (
    <div className="bg-[#1e1e1e] text-white min-h-screen flex items-start justify-center px-4 py-16">
      <div className="w-full max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm text-yellow-400 tracking-widest mb-2">OUR MENU</p>
          <h1 className="text-4xl font-bold leading-snug">Tasty Treats at a Good Price</h1>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-5 mb-16">
          {menuCategories.map((cat) => (
            <div
              key={cat.label}
              onClick={() => handleCategoryClick(cat.label)}
              className={`flex flex-col items-center justify-center w-24 h-24 rounded cursor-pointer border transition-all duration-300 ${
                activeCategory === cat.label
                  ? "bg-yellow-400 text-black font-bold"
                  : "border-gray-600 text-gray-300 hover:text-yellow-400 hover:border-yellow-400"
              }`}
            >
              {cat.icon}
              <span className="mt-1 text-sm">{cat.label}</span>
            </div>
          ))}
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 ">
          {filteredItems.map((item, index) => (
            <div
              key={index}
              className="flex bg-[#2b2b2b] rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:ring-2 hover:ring-yellow-400"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-40 h-40 object-cover"
              />
              <div className="p-4 flex flex-col justify-between gap-4 w-full">
                <div>
              

                  <h2 className="text-xl font-semibold mb-2">{item.title}</h2>

                  <p className="text-sm text-gray-400 mb-4">
                    {item.description}
                  </p>
                </div>
                    {/* Rating */}
                  <div className="flex gap-1 text-yellow-400 mb-3 cursor-pointer">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        onClick={() => handleStarClick(item.title, i)}
                        className={`transition-colors duration-200 ${
                          i < (ratings[item.title] || 0)
                            ? "text-yellow-400"
                            : "text-gray-500"
                        }`}
                      />
                    ))}
                  </div>

                <p className="text-lg text-yellow-400 font-bold">
                  ${item.price.toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
        <br />
             <div className="text-start mb-8">
  <button
    onClick={() => navigate("/menu")}
    className="bg-amber-500 text-black px-6 py-2 rounded font-semibold hover:bg-yellow-300 transition"
  >
    View Full Menu List
  </button>
</div>
      </div>

</div>
  );
};

export default Menu;
