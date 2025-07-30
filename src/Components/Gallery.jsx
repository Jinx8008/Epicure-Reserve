import React from 'react';
import { useNavigate } from 'react-router-dom';

const Gallery = () => {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate('/gallery'); 
  };

  return (
    <div className="min-h-screen bg-transparent text-white flex flex-col justify-center items-center px-4 py-10">
      <div className="text-center">
        <h1 className="font-extrabold text-4xl md:text-5xl text-amber-400">Gallery</h1>
        <p className="text-base md:text-xl text-gray-300 mt-4 max-w-xl mx-auto">
          Discover the ambiance and aesthetic of our restaurant. Dive into our curated gallery showcasing the best of our dining experience.
        </p>
      </div>

      <div
        className="relative mt-10 h-[400px] md:h-[500px] w-full max-w-4xl mx-auto rounded-xl overflow-hidden shadow-lg"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1600891964599-f61ba0e24092?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute bottom-5 left-5">
          <button
            onClick={handleExploreClick}
            className="bg-amber-400 w-60 hover:bg-amber-600 text-black px-6 py-3 rounded-md text-lg shadow-md transition duration-300"
          >
            Explore Our Gallery
          </button>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
