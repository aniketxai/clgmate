import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ItemCard from '../components/ItemCard';
import { Filter, Grid, List } from 'lucide-react';

// Mock data for demonstration
const mockItems = [
  {
    id: 1,
    title: 'Engineering Mathematics Textbook',
    price: 800,
    image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400',
    location: 'Engineering Block',
    timeAgo: '2 hours ago',
    condition: 'Good',
    category: 'books'
  },
  {
    id: 2,
    title: 'Physics Lab Manual',
    price: 400,
    image: 'https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg?auto=compress&cs=tinysrgb&w=400',
    location: 'Science Block',
    timeAgo: '4 hours ago',
    condition: 'New',
    category: 'books'
  },
  {
    id: 3,
    title: 'MacBook Pro 13"',
    price: 75000,
    image: 'https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=400',
    location: 'Boys Hostel A',
    timeAgo: '5 hours ago',
    condition: 'Excellent',
    category: 'electronics'
  }
];

const Category = () => {
  const { categoryId } = useParams();
  const [items, setItems] = useState([]);
  const [sortBy, setSortBy] = useState('recent');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    // Filter items by category
    const categoryItems = mockItems.filter(item => item.category === categoryId);
    setItems(categoryItems);
  }, [categoryId]);

  const getCategoryTitle = (id) => {
    const titles = {
      books: 'Books & Study Material',
      electronics: 'Electronics',
      furniture: 'Furniture',
      accommodation: 'Accommodation',
      services: 'Services & Tutoring',
      transport: 'Transport',
      social: 'Social & Events',
      gaming: 'Gaming & Entertainment'
    };
    return titles[id] || 'Category';
  };

  const sortItems = (items, sortBy) => {
    const sorted = [...items];
    switch (sortBy) {
      case 'price-low':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-high':
        return sorted.sort((a, b) => b.price - a.price);
      case 'recent':
      default:
        return sorted;
    }
  };

  const sortedItems = sortItems(items, sortBy);

  return (
    <div className="category-page">
      <div className="container">
        <div className="category-header">
          <div className="category-info">
            <h1>{getCategoryTitle(categoryId)}</h1>
            <p className="text-neutral-600">{items.length} items available</p>
          </div>
          
          <div className="category-controls">
            <select 
              className="select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="recent">Most Recent</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
            
            <div className="view-controls">
              <button 
                className={`btn ${viewMode === 'grid' ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => setViewMode('grid')}
              >
                <Grid size={20} />
              </button>
              <button 
                className={`btn ${viewMode === 'list' ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => setViewMode('list')}
              >
                <List size={20} />
              </button>
            </div>
            
            <button 
              className="btn btn-outline"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={20} />
              Filters
            </button>
          </div>
        </div>

        <div className="category-content">
          {showFilters && (
            <div className="filters-panel card">
              <h4>Filters</h4>
              <div className="filter-group">
                <label>Condition</label>
                <div className="checkbox-group">
                  <label><input type="checkbox" /> New</label>
                  <label><input type="checkbox" /> Excellent</label>
                  <label><input type="checkbox" /> Good</label>
                  <label><input type="checkbox" /> Fair</label>
                </div>
              </div>
              <div className="filter-group">
                <label>Price Range</label>
                <input type="range" className="price-range" min="0" max="100000" />
                <div className="price-inputs">
                  <input type="number" placeholder="Min" className="input" />
                  <input type="number" placeholder="Max" className="input" />
                </div>
              </div>
            </div>
          )}

          <div className={`items-container ${viewMode}`}>
            <div className={`grid ${viewMode === 'grid' ? 'grid-cols-3' : 'grid-cols-1'}`}>
              {sortedItems.map(item => (
                <ItemCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;