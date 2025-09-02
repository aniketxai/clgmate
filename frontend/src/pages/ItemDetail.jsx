import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Heart, Share2, Flag, MapPin, Clock, User, Phone, MessageCircle } from 'lucide-react';

const ItemDetail = () => {
  const { itemId } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [item1, setItem] = useState(null); // Changed to null for better loading state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false);

  // State to trigger re-render for time ago
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 60000); // update every minute
    return () => clearInterval(interval);
  }, []);

  // Helper function to format time ago
  function timeAgo(date) {
    const nowDate = new Date(now);
    const past = new Date(date);
    const diff = Math.floor((nowDate - past) / 1000); // seconds

    if (diff < 60) return `${diff} sec ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hrs ago`;
    if (diff < 2592000) return `${Math.floor(diff / 86400)} days ago`;
    if (diff < 31536000) return `${Math.floor(diff / 2592000)} months ago`;
    return `${Math.floor(diff / 31536000)} yrs ago`;
  }

  // Share functionality
  const handleShare = () => {
    if (navigator.share) {
      // Use native Web Share API if available (mobile devices)
      navigator.share({
        title: item1.name,
        text: `Check out this ${item1.name} for ₹${item1.price}`,
        url: window.location.href
      }).catch(err => console.log('Error sharing:', err));
    } else {
      // Fallback to custom share modal
      setShowShareModal(true);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
      setShowShareModal(false);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const shareViaWhatsApp = () => {
    const message = `Check out this ${item1.name} for ₹${item1.price}! ${window.location.href}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  const shareViaTwitter = () => {
    const message = `Check out this ${item1.name} for ₹${item1.price}!`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}&url=${encodeURIComponent(window.location.href)}`, '_blank');
  };

  const shareViaFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank');
  };

  const shareViaTelegram = () => {
    const message = `Check out this ${item1.name} for ₹${item1.price}!`;
    window.open(`https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(message)}`, '_blank');
  };

  // Fetching data from backend
  const fetchList = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_FRONTEND_URL}/api/products/single/${itemId}`);
      if (response.data.sucess) { // Note: your API has "sucess" instead of "success"
        setItem(response.data.product);
        console.log(response.data.product);
      } else {
        setError("Error in fetching the product");
        console.log("Error in fetching the products");
      }
    } catch (error) {
      setError("Failed to fetch product data");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (itemId) {
      fetchList();
    }
  }, [itemId]); // Added itemId as dependency

  // Mock seller data since it's not in your API response
  const mockSeller = {
    name: 'Unknown Seller',
    year: 'Student',
    rating: 4.0,
    verified: false,
    responseTime: 'Usually responds within 24 hours'
  };

  // Loading state
  if (loading) {
    return (
      <div className="item-detail-page">
        <div className="container">
          <div className="loading">Loading...</div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="item-detail-page">
        <div className="container">
          <div className="error">Error: {error}</div>
        </div>
      </div>
    );
  }

  // No item found
  if (!item1) {
    return (
      <div className="item-detail-page">
        <div className="container">
          <div className="no-item">Item not found</div>
        </div>
      </div>
    );
  }

  return (
    <div className="item-detail-page">
      <div className="container">
        <div className="item-detail-content">
          <div className="item-images">
            <div className="main-image">
              <img 
                src={item1.image && item1.image[currentImageIndex] ? item1.image[currentImageIndex] : 'https://via.placeholder.com/400x300?text=No+Image'} 
                alt={item1.name || 'Product image'}
                className="main-item-image"
              />
              <div className="image-actions">
                <button className="btn btn-outline">
                  <Heart size={20} />
                </button>
                <button className="btn btn-outline" onClick={handleShare}>
                  <Share2 size={20} />
                </button>
                <button className="btn btn-outline">
                  <Flag size={20} />
                </button>
              </div>
            </div>
            <div className="image-thumbnails">
              {item1.image && item1.image.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${item1.name} ${index + 1}`}
                  className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
            </div>
          </div>

          <div className="item-info">
            <div className="item-header">
              <h1 className="item-title">{item1.name}</h1>
              <div className="item-meta">
                <span className={`condition-badge ${item1.condition ? item1.condition.toLowerCase() : 'unknown'}`}>
                  {item1.condition || 'Unknown'}
                </span>
                <div className="item-location">
                  <MapPin size={16} />
                  <span>{item1.location || 'Location not specified'}</span>
                </div>
                <div className="item-time">
                  <Clock size={16} />
                  <span>{item1.date ? timeAgo(item1.date) : 'Unknown'}</span>
                </div>
              </div>
            </div>

            <div className="price-section">
              <div className="current-price">₹{item1.price ? item1.price.toLocaleString() : '0'}</div>
              {/* Since your API doesn't have originalPrice, you can comment this out or add it to your backend */}
              {/* 
              {item.originalPrice && (
                <div className="original-price">₹{item.originalPrice.toLocaleString()}</div>
              )}
              <div className="savings">
                Save ₹{(item.originalPrice - item.price).toLocaleString()} ({Math.round((item.originalPrice - item.price) / item.originalPrice * 100)}% off)
              </div>
              */}
            </div>

            <div className="contact-section">
              <button className="btn btn-primary btn-large">
                <Phone size={20} />
                Call Seller
              </button>
              <button className="btn btn-secondary btn-large">
                <MessageCircle size={20} />
                Chat
              </button>
            </div>

            <div className="seller-info card">
              <div className="seller-header">
                <div className="seller-avatar">
                  <User size={24} />
                </div>
                <div className="seller-details">
                  <h4>{mockSeller.name}</h4>
                  <p>{mockSeller.year}</p>
                  {mockSeller.verified && <span className="verified-badge">✓ Verified</span>}
                </div>
                <div className="seller-rating">
                  ★ {mockSeller.rating}
                </div>
              </div>
              <p className="response-time">{mockSeller.responseTime}</p>
              <Link to={`/profile/${mockSeller.id}`} className="btn btn-outline btn-small">
                View Profile
              </Link>
            </div>
          </div>
        </div>

        <div className="item-details">
          <div className="description-section">
            <h3>Description</h3>
            <p>{item1.description || 'No description available'}</p>
          </div>

          <div className="specifications">
            <h3>Details</h3>
            <div className="specs-grid">
              <div className="spec-item">
                <span className="spec-label">Category:</span>
                <span className="spec-value">{item1.category || 'Unknown'}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Condition:</span>
                <span className="spec-value">{item1.condition || 'Unknown'}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Stock:</span>
                <span className="spec-value">{item1.stock || '0'}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Location:</span>
                <span className="spec-value">{item1.location || 'Not specified'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Share Modal */}
        {showShareModal && (
          <div className="modal-overlay" onClick={() => setShowShareModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3>Share this item</h3>
                <button className="close-btn" onClick={() => setShowShareModal(false)}>×</button>
              </div>
              <div className="modal-body">
                <div className="share-options">
                  <button className="share-option whatsapp" onClick={shareViaWhatsApp}>
                    <div className="share-icon">📱</div>
                    <span>WhatsApp</span>
                  </button>
                  <button className="share-option facebook" onClick={shareViaFacebook}>
                    <div className="share-icon">📘</div>
                    <span>Facebook</span>
                  </button>
                  <button className="share-option twitter" onClick={shareViaTwitter}>
                    <div className="share-icon">🐦</div>
                    <span>Twitter</span>
                  </button>
                  <button className="share-option telegram" onClick={shareViaTelegram}>
                    <div className="share-icon">✈️</div>
                    <span>Telegram</span>
                  </button>
                  <button className="share-option copy" onClick={copyToClipboard}>
                    <div className="share-icon">📋</div>
                    <span>Copy Link</span>
                  </button>
                </div>
                <div className="share-url">
                  <input 
                    type="text" 
                    value={window.location.href} 
                    readOnly 
                    className="url-input"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};

export default ItemDetail;