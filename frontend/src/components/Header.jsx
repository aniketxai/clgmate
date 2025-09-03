import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Plus, User, Menu, X, ShoppingBag } from 'lucide-react';

const Header = () => {
  const location = useLocation();
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const userInfo = localStorage.getItem('user');
    if (userInfo) {
      setUser(JSON.parse(userInfo));
    } else {
      setUser(null);
    }
  }, []);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchFocused(false);
      setShowMobileSearch(false);
    }
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isMenuOpen]);

  if (location.pathname === "/login") return null;

  return (
    <>
      <header className="header">
        <div className="header-backdrop"></div>
        <div className="container">
          <div className="header-content">
            {/* Logo */}
            <Link to="/" className="logo">
              <div className="logo-container">
                <ShoppingBag className="logo-icon" size={24} />
                <h2 className="logo-text">
                  Clg<span className="logo-accent">Mate</span>
                </h2>
              </div>
            </Link>

            {/* Desktop Search */}
            <form className={`search-form desktop-search ${isSearchFocused ? 'search-focused' : ''}`} onSubmit={handleSearch}>
              <div className="search-container">
                <Search size={18} className="search-icon" />
                <input
                  type="text"
                  placeholder="Search for books, electronics, furniture..."
                  className="search-input"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                />
              </div>
              <button type="submit" className="btn btn-primary search-btn">
                Search
              </button>
            </form>

            {/* Desktop Navigation */}
            <nav className="nav desktop-nav">
              <button 
                className="btn btn-ghost mobile-search-toggle"
                onClick={() => setShowMobileSearch(!showMobileSearch)}
                aria-label="Search"
              >
                <Search size={20} />
              </button>
              
              <Link to="/post" className="btn btn-secondary nav-button">
                <Plus size={18} />
                <span>Sell</span>
              </Link>
              
              {user && user.token ? (
                <Link to="/profile" className="btn btn-outline profile-button">
                  {user.image ? (
                    <img
                      src={user.image}
                      alt="Profile"
                      className="profile-avatar"
                    />
                  ) : (
                    <div className="profile-avatar-placeholder">
                      <User size={16} />
                    </div>
                  )}
                  <span className="profile-text">Profile</span>
                </Link>
              ) : (
                <Link to="/login" className="btn btn-outline login-button">
                  <User size={18} />
                  <span className="login-text">Login</span>
                </Link>
              )}
            </nav>

            {/* Mobile Menu Toggle */}
            <button 
              className="menu-toggle"
              onClick={(e) => {
                e.stopPropagation();
                setIsMenuOpen(!isMenuOpen);
              }}
              aria-label="Toggle menu"
            >
              <span className={`menu-icon ${isMenuOpen ? 'menu-open' : ''}`}>
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </span>
            </button>
          </div>

          {/* Mobile Search Bar */}
          {showMobileSearch && (
            <div className="mobile-search-container">
              <form className="mobile-search-form" onSubmit={handleSearch}>
                <div className="mobile-search-wrapper">
                  <Search size={18} className="mobile-search-icon" />
                  <input
                    type="text"
                    placeholder="Search items..."
                    className="mobile-search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                  />
                  <button 
                    type="button" 
                    className="mobile-search-close"
                    onClick={() => setShowMobileSearch(false)}
                  >
                    <X size={16} />
                  </button>
                </div>
                <button type="submit" className="btn btn-primary mobile-search-submit">
                  Search
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Mobile Navigation Menu */}
        <nav className={`mobile-nav ${isMenuOpen ? 'mobile-nav-open' : ''}`}>
          <div className="mobile-nav-content">
            <div className="mobile-nav-header">
              <div className="mobile-nav-user">
                {user && user.token ? (
                  <div className="mobile-user-info">
                    {user.image ? (
                      <img src={user.image} alt="Profile" className="mobile-user-avatar" />
                    ) : (
                      <div className="mobile-user-avatar-placeholder">
                        <User size={20} />
                      </div>
                    )}
                    <span className="mobile-user-name">Welcome back!</span>
                  </div>
                ) : (
                  <div className="mobile-guest-info">
                    <div className="mobile-guest-avatar">
                      <User size={20} />
                    </div>
                    <span className="mobile-guest-text">Guest User</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="mobile-nav-links">
              <Link 
                to="/post" 
                className="mobile-nav-link primary"
                onClick={() => setIsMenuOpen(false)}
              >
                <Plus size={20} />
                <span>Sell Item</span>
              </Link>
              
              {user && user.token ? (
                <Link 
                  to="/profile" 
                  className="mobile-nav-link"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User size={20} />
                  <span>My Profile</span>
                </Link>
              ) : (
                <Link 
                  to="/login" 
                  className="mobile-nav-link"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User size={20} />
                  <span>Login</span>
                </Link>
              )}
            </div>
          </div>
        </nav>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div 
            className="mobile-overlay" 
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </header>
    </>
  );
};

export default Header;