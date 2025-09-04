import React, { useState, useMemo } from 'react';
import './Blog.css';

const FullBlog = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Blog categories
  const categories = [
    { id: 'all', name: 'All Articles', icon: '📚' },
    { id: 'cuisine', name: 'Cuisine', icon: '👨‍🍳' },
    { id: 'wine', name: 'Wine & Bar', icon: '🍷' },
    { id: 'events', name: 'Events', icon: '🎉' },
    { id: 'behind-scenes', name: 'Behind Scenes', icon: '🔍' },
    { id: 'menu', name: 'Menu Updates', icon: '📋' },
    { id: 'tips', name: 'Tips & Guides', icon: '💡' }
  ];

  // Sample blog posts - replace with your actual blog data
  const allPosts = [
    {
      id: 1,
      title: "The Art of Fine Dining: A Culinary Journey Through Flavors",
      excerpt: "Discover the intricate world of haute cuisine as we explore the techniques, ingredients, and passion that goes into creating memorable dining experiences.",
      image: "https://i.pinimg.com/736x/b1/21/41/b121419a4f6e16be30b58364b1b5681c.jpg",
      category: "cuisine",
      author: "Chef Marcus Johnson",
      date: "Mar 15, 2024",
      readTime: "8 min read"
    },
    {
      id: 2,
      title: "Wine Pairing Secrets: Elevate Your Dining Experience",
      excerpt: "Learn the fundamentals of wine pairing from our sommelier and discover how the right wine can transform your meal into an extraordinary experience.",
      image: "https://i.pinimg.com/736x/f0/01/ae/f001aee7f1ecbe4e92a407c1e7195863.jpg",
      category: "wine",
      author: "Sarah Williams",
      date: "Mar 12, 2024",
      readTime: "5 min read"
    },
    {
      id: 3,
      title: "Behind the Scenes: A Day in Our Kitchen",
      excerpt: "Take an exclusive look at what happens behind the scenes in our bustling kitchen, from prep work at dawn to the final plate served at midnight.",
      image: "https://i.pinimg.com/1200x/63/63/e7/6363e75ac3107d7553b985b9672c93ea.jpg",
      category: "behind-scenes",
      author: "Michael Chen",
      date: "Mar 10, 2024",
      readTime: "6 min read"
    },
    {
      id: 4,
      title: "Seasonal Menu Highlights: Spring Collection",
      excerpt: "Explore our new spring menu featuring fresh, locally sourced ingredients that capture the essence of the season in every bite.",
      image: "https://i.pinimg.com/1200x/e1/6d/8d/e16d8d2fcbe67df9afe39a5fa3273708.jpg",
      category: "menu",
      author: "Emma Rodriguez",
      date: "Mar 8, 2024",
      readTime: "4 min read"
    },
    {
      id: 5,
      title: "Private Event Planning: Creating Unforgettable Celebrations",
      excerpt: "From intimate dinners to grand celebrations, discover how we transform our space to create the perfect backdrop for your special moments.",
      image: "https://i.pinimg.com/736x/3f/fc/e2/3ffce2c2a3c2c060f7a8ba5b3c693045.jpg",
      category: "events",
      author: "Lisa Thompson",
      date: "Mar 5, 2024",
      readTime: "7 min read"
    },
    {
      id: 6,
      title: "Mastering the Perfect Cocktail: Mixology 101",
      excerpt: "Our head bartender shares insider secrets on crafting cocktails that perfectly complement our cuisine and elevate your dining experience.",
      image: "https://i.pinimg.com/1200x/73/6c/0e/736c0e4329bf9468ade780e67fbbea80.jpg",
      category: "wine",
      author: "David Park",
      date: "Mar 3, 2024",
      readTime: "5 min read"
    },
    {
      id: 7,
      title: "Farm to Table: Our Commitment to Local Sourcing",
      excerpt: "Discover our partnerships with local farmers and how we ensure the freshest, highest quality ingredients make it to your plate.",
      image: "https://i.pinimg.com/736x/3c/f8/93/3cf8935316c1eba18ca273260bb73b43.jpg",
      category: "cuisine",
      author: "Chef Marcus Johnson",
      date: "Feb 28, 2024",
      readTime: "6 min read"
    },
    {
      id: 8,
      title: "Dining Etiquette: A Guide to Fine Dining",
      excerpt: "Navigate the world of fine dining with confidence. Our comprehensive guide covers everything from table manners to wine service.",
      image: "https://i.pinimg.com/736x/ce/3c/fb/ce3cfb6b672a3fe525f11345566f482d.jpg",
      category: "tips",
      author: "James Mitchell",
      date: "Feb 25, 2024",
      readTime: "8 min read"
    },
    {
      id: 9,
      title: "Chef's Special: The Story Behind Our Signature Dishes",
      excerpt: "Every dish has a story. Learn about the inspiration, technique, and passion behind our most beloved signature creations.",
      image: "https://i.pinimg.com/1200x/d7/83/a1/d783a1be54ee603ae9b8e4f24a0f855b.jpg",
      category: "cuisine",
      author: "Chef Marcus Johnson",
      date: "Feb 22, 2024",
      readTime: "9 min read"
    },
    {
      id: 10,
      title: "Holiday Celebrations: Making Every Moment Special",
      excerpt: "From Christmas dinners to New Year's Eve galas, discover how we create magical holiday experiences that bring people together.",
      image: "https://i.pinimg.com/736x/5c/5a/d2/5c5ad2518021461a442eae1d3f48fdbc.jpg",
      category: "events",
      author: "Emma Rodriguez",
      date: "Feb 18, 2024",
      readTime: "5 min read"
    },
    {
      id: 11,
      title: "The Perfect Date Night: Romance in Every Detail",
      excerpt: "Create unforgettable romantic moments with our guide to planning the perfect date night, from ambiance to wine selection.",
      image: "https://i.pinimg.com/736x/db/f7/1b/dbf71b84c1417b828ee39ffe25014141.jpg",
      category: "tips",
      author: "Sarah Williams",
      date: "Feb 15, 2024",
      readTime: "6 min read"
    },
    {
      id: 12,
      title: "Sustainability in the Kitchen: Our Green Initiatives",
      excerpt: "Learn about our commitment to sustainability and how we're working to reduce our environmental impact while maintaining exceptional quality.",
      image: "https://i.pinimg.com/1200x/34/f5/97/34f597744a557d938ae87e59affea7c6.jpg",
      category: "behind-scenes",
      author: "Michael Chen",
      date: "Feb 12, 2024",
      readTime: "7 min read"
    }
  ];

  // Get category name and icon
  const getCategoryInfo = (categoryId) => {
    const categoryMap = {
      'cuisine': { name: 'Cuisine', icon: '👨‍🍳' },
      'wine': { name: 'Wine & Bar', icon: '🍷' },
      'events': { name: 'Events', icon: '🎉' },
      'behind-scenes': { name: 'Behind Scenes', icon: '🔍' },
      'menu': { name: 'Menu Updates', icon: '📋' },
      'tips': { name: 'Tips & Guides', icon: '💡' }
    };
    return categoryMap[categoryId] || { name: 'Article', icon: '📄' };
  };

  // Filter posts based on category and search term
  const filteredPosts = useMemo(() => {
    let filtered = allPosts;

    // Filter by category
    if (activeCategory !== 'all') {
      filtered = filtered.filter(post => post.category === activeCategory);
    }

    // Filter by search term
    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(search) ||
        post.excerpt.toLowerCase().includes(search) ||
        post.author.toLowerCase().includes(search)
      );
    }

    return filtered;
  }, [activeCategory, searchTerm]);

  const handlePostClick = (postId) => {
    // Navigate to individual blog post
    window.location.href = `/blog/post/${postId}`;
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  return (
    <div className="blog-section full-blog">
      <div className="full-blog-container">
        {/* Header */}
        <div className="full-blog-header">
          <div className="sub-title">Stories & Insights</div>
          <h1>Our Blog</h1>
        </div>

        {/* Search Bar */}
        <div className="blog-search-bar">
          <input
            type="text"
            placeholder="Search articles, authors, topics..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <div className="blog-search-icon">🔍</div>
          {searchTerm && (
            <button 
              className="search-clear"
              onClick={clearSearch}
              style={{
                position: 'absolute',
                right: '1.2rem',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                color: 'rgb(253, 199, 0)',
                fontSize: '1.2rem',
                cursor: 'pointer',
                zIndex: 3
              }}
            >
              ×
            </button>
          )}
        </div>

        {/* Category Filter */}
        <div className="blog-categories">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`blog-category-filter ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(category.id)}
            >
              <span className="icon">{category.icon}</span>
              <span>{category.name}</span>
            </button>
          ))}
        </div>

        {/* Results Count */}
        {searchTerm && (
          <div style={{
            textAlign: 'center',
            color: 'rgba(255, 255, 255, 0.7)',
            marginBottom: '2rem',
            fontSize: '1rem'
          }}>
            Found {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} 
            {searchTerm && ` for "${searchTerm}"`}
          </div>
        )}

        {/* Blog Grid */}
        <div className="full-blog-grid">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => {
              const categoryInfo = getCategoryInfo(post.category);
              return (
                <article 
                  key={post.id}
                  className="blog-card-full"
                  onClick={() => handlePostClick(post.id)}
                >
                  <div className="blog-card-full-image">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      loading="lazy"
                    />
                    <div className="reading-time">
                      <span className="icon">🕐</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  
                  <div className="blog-card-full-content">
                    <div className="blog-category">
                      <span className="icon">{categoryInfo.icon}</span>
                      <span>{categoryInfo.name}</span>
                    </div>
                    
                    <h3 className="blog-title">{post.title}</h3>
                    <p className="blog-excerpt">{post.excerpt}</p>
                    
                    <div className="blog-meta">
                      <div className="blog-meta-item">
                        <span className="icon">👤</span>
                        <span>{post.author}</span>
                      </div>
                      <div className="blog-meta-item">
                        <span className="icon">📅</span>
                        <span>{post.date}</span>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })
          ) : (
            <div className="no-results">
              {searchTerm ? 
                `No articles found matching "${searchTerm}"` : 
                'No articles found in this category'
              }
            </div>
          )}
        </div>

        {/* Load More Button (if you want pagination) */}
        {filteredPosts.length > 0 && (
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <button 
              className="blog-cta-button"
              onClick={() => console.log('Load more posts')}
              style={{ margin: '0 auto' }}
            >
              <span>Load More Articles</span>
              <span className="icon">↓</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FullBlog;