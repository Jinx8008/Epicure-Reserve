import React, { useState, useMemo } from 'react';
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import './Gallery.css';

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  // Gallery categories
  const categories = [
    { id: 'all', name: 'All Photos', icon: '🖼️' },
    { id: 'dining', name: 'Dining', icon: '🍽️' },
    { id: 'interior', name: 'Interior', icon: '🏛️' },
    { id: 'food', name: 'Cuisine', icon: '👨‍🍳' },
    { id: 'events', name: 'Events', icon: '🎉' },
    { id: 'bar', name: 'Bar & Drinks', icon: '🍸' }
  ];

  // Sample gallery data - replace with your actual images
  const allImages = [
    {
      id: 1,
      src: "https://i.pinimg.com/1200x/b9/1f/bf/b91fbf732b3c2a2e83c74c3c7c3501b5.jpg",
      title: "Main Dining Hall",
      description: "Our spacious main dining area with elegant ambiance",
      category: "dining"
    },
    {
      id: 2,
      src: "https://i.pinimg.com/1200x/d7/83/a1/d783a1be54ee603ae9b8e4f24a0f855b.jpg",
      title: "Signature Dish",
      description: "Our chef's special creation with seasonal ingredients",
      category: "food"
    },
    {
      id: 3,
      src: "https://i.pinimg.com/1200x/6f/7d/1f/6f7d1f421beb1b0be5257427177b38ca.jpg",
      title: "Lounge Area",
      description: "Comfortable seating area for casual dining and drinks",
      category: "interior"
    },
    {
      id: 4,
      src: "https://i.pinimg.com/736x/8c/c7/18/8cc718fdc522daf67157feee83e5da1e.jpg ",
      title: "Private Dining Room",
      description: "Exclusive space for special occasions and events",
      category: "events"
    },
    {
      id: 5,
      src: "https://i.pinimg.com/736x/5b/ae/d7/5baed70b98e11ed558c6a582ed697ec8.jpg",
      title: "Craft Cocktails",
      description: "Handcrafted cocktails by our expert mixologists",
      category: "bar"
    },
    {
      id: 6,
      src: "https://i.pinimg.com/1200x/d9/91/e2/d991e2bd59476466d920628c11900d75.jpg",
      title: "Kitchen Excellence",
      description: "Behind the scenes in our state-of-the-art kitchen",
      category: "food"
    },
    {
      id: 7,
      src: "https://i.pinimg.com/736x/17/5c/19/175c19f891f4d76b61f5a7dac83ff804.jpg",
      title: "Terrace Dining",
      description: "Outdoor dining with beautiful city views",
      category: "dining"
    },
    {
      id: 8,
      src: "https://i.pinimg.com/736x/40/12/44/401244062f9ee6a0356491ddfe1cc3a6.jpg",
      title: "Wine Selection",
      description: "Curated wine collection from around the world",
      category: "bar"
    },
    {
      id: 9,
      src: "https://i.pinimg.com/736x/95/23/a7/9523a774b46687cd033b7cf1ea7ab59d.jpg",
      title: "Modern Interior",
      description: "Contemporary design with warm lighting",
      category: "interior"
    },
    {
      id: 10,
      src: "https://i.pinimg.com/736x/b4/bc/20/b4bc20b3270ccce6ffdca2d060869a4e.jpg",
      title: "Wedding Reception",
      description: "Beautiful setup for wedding celebrations",
      category: "events"
    },
    {
      id: 11,
      src: "https://i.pinimg.com/736x/7c/0f/e7/7c0fe71aa2e1a589c4c7c08d06fe2581.jpg",
      title: "Gourmet Plating",
      description: "Artfully presented dishes that delight all senses",
      category: "food"
    },
    {
      id: 12,
      src: "https://i.pinimg.com/736x/62/82/c6/6282c6e6d320426641b29b0734307fcf.jpg",
      title: "Evening Atmosphere",
      description: "Romantic lighting perfect for dinner dates",
      category: "interior"
    }
  ];

  // Filter images based on active category
  const filteredImages = useMemo(() => {
    if (activeCategory === 'all') {
      return allImages;
    }
    return allImages.filter(image => image.category === activeCategory);
  }, [activeCategory]);

  const openLightbox = (index) => {
    setCurrentImage(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'auto';
  };

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % filteredImages.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
  };

  React.useEffect(() => {
    if (lightboxOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [lightboxOpen]);

  return (
    <>
    <Navbar />
    <div className="gallery-section full-gallery">
      <div className="full-gallery-container">
        {/* Header */}
        <div className="full-gallery-header">
          <div className="sub-title">Complete Collection</div>
          <h1>Our Full Gallery</h1>
        </div>

        {/* Category Filter */}
        <div className="gallery-categories">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`gallery-category ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(category.id)}
            >
              <span className="icon">{category.icon}</span>
              <span>{category.name}</span>
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="full-gallery-grid">
          {filteredImages.length > 0 ? (
            filteredImages.map((image, index) => (
              <div key={image.id} className="gallery-card" onClick={() => openLightbox(index)}>
                <div className="gallery-card-image">
                  <img src={image.src} alt={image.title} loading="lazy" />
                  <div className="gallery-card-overlay">
                    <div className="view-icon">👁️</div>
                  </div>
                </div>
                <div className="gallery-card-info">
                  <h3 className="gallery-card-title">{image.title}</h3>
                  <p className="gallery-card-description">{image.description}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">
              No images found in this category
            </div>
          )}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && filteredImages.length > 0 && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={closeLightbox}>
              ×
            </button>
            
            {filteredImages.length > 1 && (
              <>
                <button className="lightbox-nav prev" onClick={prevImage}>
                  ←
                </button>
                <button className="lightbox-nav next" onClick={nextImage}>
                  →
                </button>
              </>
            )}

            <img 
              src={filteredImages[currentImage]?.src} 
              alt={filteredImages[currentImage]?.title}
              className="lightbox-image"
            />
            
            <div className="lightbox-info">
              <h3 className="lightbox-title">{filteredImages[currentImage]?.title}</h3>
              <p className="lightbox-description">{filteredImages[currentImage]?.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
    <Footer />
    </>
  );
};

export default Gallery;