import { Link } from 'react-router-dom';
import { BookOpen, Laptop, Armchair, Users, GraduationCap, Car, Home, Gamepad2 } from 'lucide-react';

const categories = [
  { id: 'books', name: 'Books & Study Material', icon: BookOpen, count: 245, color: 'var(--primary-blue)' },
  { id: 'electronics', name: 'Electronics', icon: Laptop, count: 189, color: 'var(--accent-orange)' },
  { id: 'furniture', name: 'Furniture', icon: Armchair, count: 156, color: 'var(--secondary-green)' },
  { id: 'accommodation', name: 'Accommodation', icon: Home, count: 78, color: 'var(--warning)' },
  { id: 'services', name: 'Services & Tutoring', icon: GraduationCap, count: 134, color: 'var(--primary-blue)' },
  { id: 'transport', name: 'Transport', icon: Car, count: 67, color: 'var(--error)' },
  { id: 'social', name: 'Social & Events', icon: Users, count: 92, color: 'var(--secondary-green)' },
  { id: 'gaming', name: 'Gaming & Entertainment', icon: Gamepad2, count: 123, color: 'var(--accent-orange)' }
];

const CategoryGrid = () => {
  return (
    <section className="category-grid-section">
      <div className="container">
        <h2 className="text-center mb-6">Browse Categories</h2>
        <div className="grid grid-cols-4">
          {categories.map((category) => (
            <Link 
              key={category.id} 
              to={`/category/${category.id}`} 
              className="category-card"
            >
              <div className="category-icon" style={{ backgroundColor: `${category.color}15` }}>
                <category.icon size={32} style={{ color: category.color }} />
              </div>
              <h4 className="category-name">{category.name}</h4>
              <p className="category-count">{category.count} items</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;