import { Search, TrendingUp, Shield, Users } from 'lucide-react';

const Hero = () => {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Your Campus <span className="text-primary">Marketplace</span>
            </h1>
            <p className="hero-subtitle">
              Buy and sell everything you need for college life. From textbooks to electronics, 
              find great deals from fellow students in your campus community.
            </p>
            <div className="hero-stats">
              <div className="stat">
                <div className="stat-number">2,500+</div>
                <div className="stat-label">Active Students</div>
              </div>
              <div className="stat">
                <div className="stat-number">5,000+</div>
                <div className="stat-label">Items Sold</div>
              </div>
              <div className="stat">
                <div className="stat-number">15+</div>
                <div className="stat-label">Colleges</div>
              </div>
            </div>
          </div>
          <div className="hero-features">
            <div className="feature">
              <div className="feature-icon">
                <TrendingUp size={24} />
              </div>
              <h4>Best Prices</h4>
              <p>Student-friendly prices on all items</p>
            </div>
            <div className="feature">
              <div className="feature-icon">
                <Shield size={24} />
              </div>
              <h4>Safe & Secure</h4>
     <h1></h1>         <p>Verified student community</p>
            </div>
            <div className="feature">
              <div className="feature-icon">
                <Users size={24} />
              </div>
              <h4>Local Community</h4>
              <p>Connect with students nearby</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;