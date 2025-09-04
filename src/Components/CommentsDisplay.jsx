import { useState, useEffect } from 'react';
import { supabase } from "../config/supabaseClient";
import './CommentsDisplay.css';

function CommentsDisplay({ newComment }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  // Fetch reviews from Supabase
  const fetchReviews = async () => {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching reviews:', error);
        setReviews(sampleReviews);
      } else {
        setReviews(data || []);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
      setReviews(sampleReviews);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // Add new comment to list when submitted from footer
  useEffect(() => {
    if (newComment) {
      setReviews(prev => [newComment, ...prev]);
    }
  }, [newComment]);

  // Sample reviews data (fallback)
  const sampleReviews = [
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah@email.com',
      comment: 'Amazing dining experience! The ambiance was perfect and the reservation process through this site was so smooth. Will definitely be returning soon!',
      rating: 5,
      created_at: '2025-08-27T19:30:00'
    },
    {
      id: '2', 
      name: 'Michael Chen',
      email: 'mike@email.com',
      comment: 'Great food and excellent service. The online reservation system made everything so convenient. Highly recommend this place!',
      rating: 5,
      created_at: '2025-08-26T14:15:00'
    },
    {
      id: '3',
      name: 'Emma Rodriguez',
      email: 'emma@email.com', 
      comment: 'Lovely atmosphere and delicious food. The staff was very attentive and the booking process was seamless.',
      rating: 4,
      created_at: '2025-08-25T20:45:00'
    },
    {
      id: '4',
      name: 'David Park',
      email: 'david@email.com',
      comment: 'Outstanding experience from start to finish. Easy reservation, great food, perfect service. This is how dining should be!',
      rating: 5,
      created_at: '2025-08-24T18:30:00'
    },
    {
      id: '5',
      name: 'Lisa Wang',
      email: 'lisa@email.com',
      comment: 'The food was absolutely incredible! Every dish was perfectly prepared and beautifully presented. The staff went above and beyond to make our anniversary dinner special.',
      rating: 5,
      created_at: '2025-08-23T19:15:00'
    },
    {
      id: '6',
      name: 'James Thompson',
      email: 'james@email.com',
      comment: 'What a fantastic experience! The atmosphere is elegant yet cozy, and the menu offers something for everyone. Will definitely be back with friends.',
      rating: 4,
      created_at: '2025-08-22T20:00:00'
    }
  ];

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`star ${index < rating ? 'filled' : 'empty'}`}
      >
        ★
      </span>
    ));
  };

  const displayReviews = showAll ? reviews : reviews.slice(0, 3);

  if (loading) {
    return (
      <div className="comments-display-wrapper">
        <div className="comments-display-inner">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading reviews...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="comments-display-wrapper">
      <div className="comments-display-inner">
        <div className="comments-header">
          <h2>What Our Guests Say</h2>
          <div className="header-accent"></div>
          <p>Discover why food lovers choose us for their dining experiences</p>
        </div>

        {reviews.length === 0 ? (
          <div className="no-reviews">
            <div className="no-reviews-icon">💬</div>
            <h3>No reviews yet</h3>
            <p>Be the first to share your dining experience!</p>
          </div>
        ) : (
          <>
            <div className="reviews-container">
              {displayReviews.map((review) => (
                <div key={review.id} className="review-card">
                  <div className="review-header">
                    <div className="reviewer-info">
                      <div className="reviewer-avatar">
                        {review.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="reviewer-details">
                        <h4 className="reviewer-name">{review.name}</h4>
                        <p className="review-date">{formatDate(review.created_at)}</p>
                      </div>
                    </div>
                    <div className="rating-stars">
                      {renderStars(review.rating)}
                    </div>
                  </div>
                  
                  <div className="review-content">
                    <p>"{review.comment}"</p>
                  </div>
                  
                  <div className="review-verified">
                    <span className="verified-badge">✓ Verified Diner</span>
                  </div>
                </div>
              ))}
            </div>

            {reviews.length > 3 && (
              <div className="show-more-container">
                <button 
                  className="show-more-btn"
                  onClick={() => setShowAll(!showAll)}
                >
                  <span className="btn-icon">
                    {showAll ? '↑' : '↓'}
                  </span>
                  {showAll ? `Show Less` : `View All ${reviews.length} Reviews`}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default CommentsDisplay;