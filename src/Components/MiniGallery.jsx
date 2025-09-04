import React, { useState } from 'react';
import "../pages/Gallery.css"; // Ensure you have the necessary styles

const MiniGallery = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  // Sample gallery data - replace with your actual images
  const galleryImages = [
    {
      id: 1,
      src: "https://i.pinimg.com/736x/ce/3c/fb/ce3cfb6b672a3fe525f11345566f482d.jpg",
      title: "Elegant Dining Experience",
      description: "Perfect atmosphere for special occasions and romantic dinners"
    },
    {
      id: 2,
      src: "https://i.pinimg.com/1200x/1c/ba/2c/1cba2c21c7c2eed9a9dc226c3a5f7f4a.jpg",
      title: "Gourmet Cuisine",
      description: "Expertly crafted dishes using the finest ingredients"
    },
    {
      id: 3,
      src: "https://i.pinimg.com/736x/8c/c7/18/8cc718fdc522daf67157feee83e5da1e.jpg",
      title: "Premium Interior",
      description: "Modern design with comfortable seating and ambient lighting"
    },
    {
      id: 4,
      src: "https://i.pinimg.com/1200x/c1/59/ce/c159ce8bf13f9b539b1661dc70a386f5.jpg",
      title: "Private Events",
      description: "Exclusive spaces for celebrations and business meetings"
    }
  ];

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
    setCurrentImage((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
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
    <div className="gallery-section mini-gallery">
      <div className="mini-gallery-container">
        {/* Header */}
        <div className="mini-gallery-header">
          <div className="sub-title">Visual Experience</div>
          <h2>Our Gallery</h2>
          <p className="mini-gallery-description">
            Discover the ambiance, cuisine, and memorable moments that await you. 
            Each image tells the story of exceptional dining and unforgettable experiences.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="mini-gallery-grid">
          {galleryImages.map((image, index) => (
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
          ))}
        </div>

        {/* CTA Button */}
        <a href="/gallery" className="gallery-cta-button">
          <span>View Full Gallery</span>
          <span className="icon">→</span>
        </a>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={closeLightbox}>
              ×
            </button>
            
            {galleryImages.length > 1 && (
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
              src={galleryImages[currentImage].src} 
              alt={galleryImages[currentImage].title}
              className="lightbox-image"
            />
            
            <div className="lightbox-info">
              <h3 className="lightbox-title">{galleryImages[currentImage].title}</h3>
              <p className="lightbox-description">{galleryImages[currentImage].description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MiniGallery;