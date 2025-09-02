import { Link } from 'react-router-dom';
import { Heart, MapPin, Clock } from 'lucide-react';
import { useEffect, useState } from 'react';


const ItemCard = ({ item }) => {

// State to trigger re-render
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







  return (
    <div className="item-card card">
      <Link to={`/item/${item._id}`} className="item-link">
        <div className="item-image-container">
          <img src={item.image[0]} alt={item.title} className="item-image" />
          <button className="favorite-btn">
            <Heart size={20} />
          </button>
        </div>
        <div className="item-content">
          <h4 className="item-title">{item.name}</h4>
          <div className="item-price">₹{item.price.toLocaleString()}</div>
          <div className="item-details">
            <div className="item-location">
              <MapPin size={14} />
              <span>{item.location}</span>
            </div>
            <div className="item-time">
  <Clock size={14} />
  <span>{timeAgo(item.date)}</span>
</div>
          </div>
          <div className="item-condition">
            <span className={`condition-badge ${item.condition.toLowerCase()}`}>
              {item.condition}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ItemCard;