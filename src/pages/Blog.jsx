import React, { useState, useRef, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const blogPosts = [
  {
    title: "Trends in Online Reservations and Guest Preferences",
    description:
      "Discover how guests are evolving and what modern diners expect. " +
      "Lorem i. ".repeat(
        4
      ),
    image:
      "https://framerusercontent.com/images/4Jb4yR1lwSU0EMAktsG2YO9RKw.jpg",
    date: "July 10, 2025",
    tag: "Guest Experience",
    link: "#",
  },
  {
    title: "Solving Staff Shortages with Smart Booking Systems",
    description:
      "Learn how automation and reservation tools can ease the burden of staff shortages and improve customer flow.",
    image:
      "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=900&q=80",
    date: "July 5, 2025",
    tag: "Staffing",
    link: "#",
  },
  {
    title: "Maximizing Profit with Dynamic and Unique Table Pricing",
    description:
      "Explore pricing strategies that adjust to peak hours and increase profit while improving the customer experience.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPccKifa0bij8Awbpv6Jgco9mOOjAnYZ5X_A&s",
    date: "June 28, 2025",
    tag: "Revenue",
    link: "#",
  },
];

const Blog = () => {
  const [selectedPost, setSelectedPost] = useState(null);
  const modalRef = useRef();

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setSelectedPost(null);
    }
  };

  useEffect(() => {
    if (selectedPost) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedPost]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <section className="relative bg-transparent overflow-hidden text-yellow-500 py-16 md:px-16" id="slide">
      <h2 className="text-4xl md:text-5xl font-extrabold text-start mb-12 text-yellow-500">
        Restaurant Trends & Insights
      </h2>
      <br />

      <Slider {...settings} className="box-border py-7"  >
        {blogPosts.map((post, index) => (

            <div key={index} className="flex justify-center px-2 box-border" id="slides">
  <div
    onClick={() => setSelectedPost(post)}
    className="bg-neutral-900 border border-yellow-500 w-full sm:w-[90%] md:w-[85%] lg:w-[80%] rounded-2xl shadow-lg overflow-hidden hover:scale-[1.02] transition-transform duration-300 cursor-pointer"
  >
    <img
      src={post.image}
      alt={post.title}
      className="w-full h-48 object-cover"
    />
    <div className="px-6 py-8 text-white">
      <div className="flex items-center justify-between text-xs mb-2">
        <span className="text-yellow-500 uppercase">{post.tag}</span>
        <span className="text-gray-300 font-extrabold">{post.date}</span>
      </div>
      <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
      <p className="text-gray-400 line-clamp-4">
        {post.description.slice(0, 120)}...
      </p>
    </div>
  </div>
</div>

        //   <div key={index} className="px-4 box-border" id="slides">
        //     <div
        //       onClick={() => setSelectedPost(post)}
        //       className="bg-neutral-900 h-full w-100 border-r border-l border-yellow-600 rounded-2xl shadow-lg overflow-hidden hover:scale-[1.02] transition-transform duration-300 cursor-pointer"
        //     >
        //       <img
        //         src={post.image}
        //         alt={post.title}
        //         className="w-full h-48 object-cover"
        //       />
        //       <div className="px-6 py-8 text-white">
        //         <div className="flex items-center justify-between text-xs mb-2">
        //           <span className="text-yellow-600 uppercase">{post.tag}</span>
        //           <span className="text-gray-300 font-extrabold">{post.date}</span>
        //         </div>
        //         <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
        //         <p className="text-gray-400 line-clamp-4">
        //           {post.description.slice(0, 120)}...
        //         </p>
        //       </div>
        //     </div>
        //   </div>
        ))}
      </Slider>

      {/* Modal */}
      {selectedPost && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div
            ref={modalRef}
            className="bg-neutral-900 text-white max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 rounded-lg shadow-lg relative"
          >
            <button
              onClick={() => setSelectedPost(null)}
              className="absolute top-2 right-4 text-yellow-400 text-2xl font-bold"
            >
              ×
            </button>
            <img
              src={selectedPost.image}
              alt={selectedPost.title}
              className="w-full h-56 object-cover rounded mb-4"
            />
            <div className="text-sm text-gray-400 mb-1">
              {selectedPost.tag} | {selectedPost.date}
            </div>
            <h3 className="text-2xl font-semibold mb-2 text-yellow-400">
              {selectedPost.title}
            </h3>
            <p className="text-gray-300 whitespace-pre-line">
              {selectedPost.description}
            </p>
            <a
              href={selectedPost.link}
              className="text-yellow-400 underline font-medium mt-4 inline-block"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read Full Article →
            </a>
          </div>
        </div>
      )}
    </section>
  );
};

export default Blog;
