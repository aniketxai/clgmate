import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Hero from '../components/Hero';
import CategoryGrid from '../components/CategoryGrid';
import ItemCard from '../components/ItemCard';
import axios from 'axios';




// Mock data
// const mockItems = [
//   {
//     id: 144,
//     title: 'Engineering Mathematics Textbook',
//     price: 800,
//     image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400',
//     location: 'Engineering Block',
//     timeAgo: '2 hours ago',
//     condition: 'Good',
//     category: 'books'
//   },
//   {
//     id: 2,
//     title: 'MacBook Pro 13" (2020)',
//     price: 75000,
//     image: 'https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=400',
//     location: 'Boys Hostel A',
//     timeAgo: '5 hours ago',
//     condition: 'Excellent',
//     category: 'electronics'
//   },
//   {
//     id: 3,
//     title: 'Study Table with Chair',
//     price: 3500,
//     image: 'https://images.pexels.com/photos/6032628/pexels-photo-6032628.jpeg?auto=compress&cs=tinysrgb&w=400',
//     location: 'Girls Hostel B',
//     timeAgo: '1 day ago',
//     condition: 'Good',
//     category: 'furniture'
//   },
//   {
//     id: 4,
//     title: 'iPhone 12 Pro',
//     price: 45000,
//     image: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=400',
//     location: 'Main Campus',
//     timeAgo: '3 hours ago',
//     condition: 'Excellent',
//     category: 'electronics'
//   },
//   {
//     id: 5,
//     title: 'Organic Chemistry Book Set',
//     price: 1200,
//     image: 'https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg?auto=compress&cs=tinysrgb&w=400',
//     location: 'Science Block',
//     timeAgo: '6 hours ago',
//     condition: 'Good',
//     category: 'books'
//   },
//   {
//     id: 6,
//     title: 'Gaming Chair',
//     price: 8500,
//     image: 'https://images.pexels.com/photos/4158/apple-iphone-smartphone-desk.jpg?auto=compress&cs=tinysrgb&w=400',
//     location: 'Boys Hostel C',
//     timeAgo: '1 day ago',
//     condition: 'New',
//     category: 'furniture'
//   }
// ];

const Home = () => {


  const [list, setList] = useState([]);
const fetchList = async () => {
  try{
   const response = await axios.get(`${import.meta.env.VITE_FRONTEND_URL}/api/products/list`);;
     if (response.data.sucess){
     setList(response.data.products);
     console.log(response.data.products[16]._id)
    }else{
      console.log("Error in fetching the products")
    }
    
  }
  catch(error){
    console.log(error)
  }

}









    const [searchParams] = useSearchParams();
  const [items, setItems] = useState([]);
const [filteredItems, setFilteredItems] = useState([]);




  useEffect(() => {
  // Fetch list only once on mount
  fetchList();
}, []);

useEffect(() => {
  // When list updates, use it for items and filteredItems
  if (list.length > 0) {
    setItems(list);
    setFilteredItems(list);
  }
  console.log('Fetched product list:', list);
}, [list]);

useEffect(() => {
  // Handle search/filtering
  const searchQuery = searchParams.get('search');
  if (searchQuery) {
    const filtered = items.filter(item =>
      item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredItems(filtered);
  } else {
    setFilteredItems(items);
  }
}, [searchParams, items]);
  return (
    <div className="home">
      <Hero />
      <CategoryGrid />
      
      <section className="featured-items">
        <div className="container">
          <div className="section-header">
            <h2>Recent Items</h2>
            <p className="text-neutral-600">Fresh listings from your campus community</p>
          </div>
          
          <div className="grid grid-cols-3 items-grid">
            {filteredItems.map(item => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
          
          {filteredItems.length === 0 && (
            <div className="no-results">
              <h3>No items found</h3>
              <p>Try adjusting your search terms or browse categories above.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;