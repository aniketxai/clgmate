import React from 'react';

const LoadingCard = () => {
  return (
    <div className="modern-item-card modern-card-skeleton">
      <div className="modern-item-link">
        <div className="modern-image-wrapper">
          <div className="skeleton-image"></div>
          <div className="skeleton-favorite-btn"></div>
        </div>
        
        <div className="modern-card-content">
          <div className="skeleton-category"></div>
          <div className="modern-header">
            <div className="skeleton-title"></div>
            <div className="skeleton-price"></div>
          </div>
          
          <div className="modern-meta-info">
            <div className="skeleton-location-time"></div>
          </div>
          
          <div className="modern-condition-wrapper">
            <div className="skeleton-condition"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingCard;