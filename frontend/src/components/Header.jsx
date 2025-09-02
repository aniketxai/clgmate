import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Plus, User, Menu, X } from 'lucide-react';

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
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  if (location.pathname === "/login") return null;

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <h2 className="text-primary">Clg<span className="text-secondary">Mate</span></h2>
          </Link>

          <form className="search-form" onSubmit={handleSearch}>
            <div className="search-container">
              <Search size={20} className="search-icon" />
              <input
                type="text"
                placeholder="Search for books, electronics, furniture..."
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">Search</button>
          </form>

          <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
            <Link to="/post" className="btn btn-secondary">
              <Plus size={20} />
              Sell Item
            </Link>
           {user && user.token ? (
  <Link to="/profile" className="btn btn-outline" style={{ display: 'flex', alignItems: 'center' }}>
    {user.image ? (
      <img
        src={user.image}
        alt="Profile"
        style={{ width: 28, height: 28, borderRadius: '50%', marginRight: 8, objectFit: 'cover' }}
      />
    ) : (
      <User size={20} />
    )}
    Profile
  </Link>
) : (
  <Link to="/login" className="btn btn-outline">
    <User size={20} />
    Login
  </Link>
)}
          </nav>

          <button 
            className="menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;