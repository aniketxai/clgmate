import { Link } from 'react-router-dom';
import { Heart, MapPin, Clock, Tag } from 'lucide-react';
import { useEffect, useState } from 'react';

const ItemCard = ({ item }) => {
  // State to trigger re-render
  const [now, setNow] = useState(Date.now());
  const [isFavorited, setIsFavorited] = useState(false);

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

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorited(!isFavorited);
  };

  // Check if item is sold
  const isSold = item.active === 'sold' || item.active === false;

  return (
    <div className={`modern-item-card ${isSold ? 'sold-item' : ''}`}>
      <Link to={`/item/${item._id}`} className="modern-item-link">
        <div className="modern-image-wrapper">
          <img 
            src={item.image[0]} 
            alt={item.name} 
            className="modern-item-image"
            loading="lazy"
          />
          <div className="modern-image-overlay"></div>
          {isSold && (
            <div className="sold-overlay">SOLD</div>
          )}
          <button 
            className={`modern-favorite-btn ${isFavorited ? 'favorited' : ''}`}
            onClick={handleFavoriteClick}
            aria-label="Add to favorites"
          >
            <Heart size={18} fill={isFavorited ? 'currentColor' : 'none'} />
          </button>
        </div>
        
        <div className="modern-card-content">
          
          <div className="modern-header">
            <h3 className="modern-item-title">{item.name}</h3>
            <div className="modern-price-tag">₹{item.price.toLocaleString()}</div>
          </div>
          
          <div className="modern-meta-info">
            <div className="modern-location-time-info">
              <MapPin size={16} className="modern-icon" />
              <span className="modern-location-text">{item.location}</span>
              <span className="modern-separator">•</span>
              <Clock size={16} className="modern-icon" />
              <span className="modern-time-text">{timeAgo(item.date)}</span>
            </div>
          </div>
          
         
        </div>
      </Link>
    </div>
  );
};

export default ItemCard;