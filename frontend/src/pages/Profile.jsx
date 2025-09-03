import { useState, useEffect} from 'react';
import { User, Edit, Settings, Heart, Package, Star } from 'lucide-react';
import ItemCard from '../components/ItemCard';

const Profile = () => {
  //local storage
  const [user1, setUser] = useState(null);
  useEffect(() => {
    const userInfo = localStorage.getItem('user');
    if (userInfo) {
      setUser(JSON.parse(userInfo));
    } else {
      setUser(null);
    }
  }, []);

  const [activeTab, setActiveTab] = useState('listings');

  // Mock user data
  const user = {
    name: 'John Doe',
    email: 'john.doe@college.edu',
    college: 'ABC Engineering College',
    year: '3rd Year, Computer Science',
    joined: 'September 2023',
    rating: 4.8,
    totalSales: 24,
    avatar: null
  };

  // Mock user items
  const userItems = [
    {
      id: 1,
      title: 'Data Structures Textbook',
      price: 600,
      image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400',
      location: 'Engineering Block',
      timeAgo: '1 week ago',
      condition: 'Good',
      status: 'active'
    },
    {
      id: 2,
      title: 'Wireless Mouse',
      price: 800,
      image: 'https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&cs=tinysrgb&w=400',
      location: 'Boys Hostel A',
      timeAgo: '3 days ago',
      condition: 'Excellent',
      status: 'sold'
    }
  ];

  const favoriteItems = [
    {
      id: 3,
      title: 'Gaming Laptop',
      price: 45000,
      image: 'https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=400',
      location: 'Main Campus',
      timeAgo: '2 days ago',
      condition: 'Excellent'
    }
  ];

  // Add loading state or early return if user1 is null
  if (!user1) {
    return (
      <div className="profile-page">
        <div className="container">
          <div className="text-center py-8">
            <p>Loading profile...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="container">
        <div className="profile-header card">
          <div className="profile-info">
            <div className="avatar">
              <User size={48} />
            </div>
            <div className="user-details">
              <h2>{user1.name}</h2>
              <p className="text-neutral-600">{user.year}</p>
              <p className="text-neutral-600">{user.college}</p>
              <div className="user-stats">
                <div className="stat">
                  <Star size={16} />
                  <span>{user.rating} rating</span>
                </div>
                <div className="stat">
                  <Package size={16} />
                  <span>{user.totalSales} sales</span>
                </div>
                <div className="stat">
                  <span>Member since {user.joined}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="profile-actions">
            <button className="btn btn-outline">
              <Edit size={20} />
              Edit Profile
            </button>
            <button className="btn btn-outline">
              <Settings size={20} />
              Settings
            </button>
          </div>
        </div>

        <div className="profile-content">
          <div className="profile-tabs">
            <button 
              className={`tab-btn ${activeTab === 'listings' ? 'active' : ''}`}
              onClick={() => setActiveTab('listings')}
            >
              My Listings ({userItems.length})
            </button>
            <button 
              className={`tab-btn ${activeTab === 'favorites' ? 'active' : ''}`}
              onClick={() => setActiveTab('favorites')}
            >
              <Heart size={20} />
              Favorites ({favoriteItems.length})
            </button>
          </div>

          <div className="tab-content">
            {activeTab === 'listings' && (
              <div className="listings-section">
                <div className="section-header">
                  <h3>My Listings</h3>
                  <div className="listing-filters">
                    <button className="btn btn-outline btn-small">All</button>
                    <button className="btn btn-outline btn-small">Active</button>
                    <button className="btn btn-outline btn-small">Sold</button>
                  </div>
                </div>
                
                <div className="grid grid-cols-3">
                  {userItems.map(item => (
                    <div key={item.id} className="user-item-card">
                      <ItemCard item={item} />
                      <div className="item-actions">
                        <span className={`status-badge ${item.status}`}>
                          {item.status === 'active' ? 'Active' : 'Sold'}
                        </span>
                        <div className="item-buttons">
                          <button className="btn btn-outline btn-small">Edit</button>
                          <button className="btn btn-outline btn-small">
                            {item.status === 'active' ? 'Mark as Sold' : 'Relist'}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'favorites' && (
              <div className="favorites-section">
                <div className="section-header">
                  <h3>Favorite Items</h3>
                  <p className="text-neutral-600">Items you've saved for later</p>
                </div>
                
                <div className="grid grid-cols-3">
                  {favoriteItems.map(item => (
                    <ItemCard key={item.id} item={item} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;