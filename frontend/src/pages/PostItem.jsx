import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, X, Plus } from 'lucide-react';
import axios from 'axios';
import uploadimg from '../assets/uploadimg.png';
const PostItem = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    condition: '',
    location: '',
    images: []
  });

  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [condition, setCondition] = useState('');
  const [location, setLocation] = useState(''); 

  const categories = [
    { value: 'books', label: 'Books & Study Material' },
    { value: 'electronics', label: 'Electronics' },
    { value: 'furniture', label: 'Furniture' },
    { value: 'accommodation', label: 'Accommodation' },
    { value: 'services', label: 'Services & Tutoring' },
    { value: 'transport', label: 'Transport' },
    { value: 'social', label: 'Social & Events' },
    { value: 'gaming', label: 'Gaming & Entertainment' }
  ];
  const block = [
    { value: 'Boys Block 1', label: 'Boys Block 1' },
    { value: 'Boys Block 2', label: 'Boys Block 2' },
    { value: 'Boys Block 3', label: 'Boys Block 3' },
    { value: 'Boys Block 4', label: 'Boys Block 4' },
    { value: 'Boys Block 5', label: 'Boys Block 5' },
    { value: 'Boys Block 6', label: 'Boys Block 6' },
    { value: 'Boys Block 7A', label: 'Boys Block 7A' },
    { value: 'Boys Block 7B', label: 'Boys Block 7B' },
    { value: 'Boys Block 8A', label: 'Boys Block 8A' },
    { value: 'Amenity', label: 'Amenity' },
    { value: 'Special Block', label: 'Special Block' },
    { value: 'Girls Block 1', label: 'Girls Block 1' },
    { value: 'Girls Block 2', label: 'Girls Block 2' },
    { value: 'At Gate', label: 'At Gate' },
    { value: 'Off-Campus', label: 'Off-Campus' }
  ];

  const conditions = [
    { value: 'new', label: 'New' },
    { value: 'excellent', label: 'Excellent' },
    { value: 'good', label: 'Good' },
    { value: 'fair', label: 'Fair' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    // In a real app, you'd upload these to a server
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...files]
    }));
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const formData = new FormData();
    formData.append('name', title);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('category', category);
    formData.append('condition', condition);
    formData.append('location', location);
    formData.append('active', true);
    
     formData.append('stock', price);
    


    image1 && formData.append('image1', image1);
    image2 && formData.append('image2', image2);
    image3 && formData.append('image3', image3);
    image4 && formData.append('image4', image4);

    const response = await axios.post(`${import.meta.env.FRONTEND_URL}/api/products/add`, formData);
    if (response.data.sucess) {
      alert('Item posted successfully!');
      setTitle('');
      setDescription('');
      setPrice('');
      setCategory('');
      setCondition('');
      setLocation('');
      setImage1(false);
      setImage2(false);
      setImage3(false);
      setImage4(false);
      navigate('/');
      
    } else {
      alert('Failed to post item. Please try again.');
    }
   } catch (error) {
    
  }
  }

  return (
    <div className="post-item-page">
      <div className="container">
        <div className="page-header">
          <h1 className='"bg-sky-50"'>Sell Your Item</h1>
          <p className="text-neutral-600">Fill out the details below to list your item on CampusMarket</p>
        </div>

        <form onSubmit={handleSubmit} className="post-item-form">
          <div className="form-section card">
            <h3>Basic Information</h3>
            
            <div className="form-group">
              <label htmlFor="title">Item Title *</label>
              <input
                type="text"
                id="title"
                name="title"
                className="input"
                placeholder="e.g., iPhone 13 Pro Max, Engineering Textbook..."
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description *</label>
              <textarea
                id="description"
                name="description"
                className="textarea"
                placeholder="Describe your item in detail. Include condition, features, reason for selling..."
                value={description}
                onChange={(e)=>setDescription(e.target.value)}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="category">Category *</label>
                <select
                  id="category"
                  name="category"
                  className="select"
                  value={category}
                  onChange={(e)=>setCategory(e.target.value)}
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="condition">Condition *</label>
                <select
                  id="condition"
                  name="condition"
                  className="select"
                  value={condition}
                  onChange={(e)=>setCondition(e.target.value)}
                  required
                >
                  <option value="">Select condition</option>
                  {conditions.map(cond => (
                    <option key={cond.value} value={cond.value}>{cond.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="price">Price (₹) *</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  className="input"
                  placeholder="0"
                  value={price}
                  onChange={(e)=>setPrice(e.target.value)}
                  required
                />
              </div>

               <div className="form-group">
                <label htmlFor="location">Hostels *</label>
                <select
                  id="location"
                  name="location"
                  className="select"
                  value={location}
                  onChange={(e)=>setLocation(e.target.value)}
                  required
                >
                  <option value="">Select a Hostel</option>
                  {block.map(cat => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
              </div>

              

            </div>
          </div>

          <div className="form-section card">
            <h3>Photos</h3>
            <p className="text-neutral-600 mb-3">Add up to 5 photos to showcase your item</p>
            
            <div className="image-upload-container">
              <label htmlFor="image1">
              <img src={!image1 ? uploadimg : URL.createObjectURL(image1)} alt="" />
              <input onChange={(e)=>setImage1(e.target.files[0])} type="file" id='image1' hidden/>
              </label>
              <label htmlFor="image2">
              <img  src={!image2 ? uploadimg : URL.createObjectURL(image2)} alt="" />
              <input onChange={(e)=>setImage2(e.target.files[0])} type="file" id='image2' hidden/>
              </label>
              <label htmlFor="image3">
              <img  src={!image3 ? uploadimg : URL.createObjectURL(image3)} alt="" />
              <input onChange={(e)=>setImage3(e.target.files[0])} type="file" id='image3' hidden/>
              </label>
              <label htmlFor="image4">
              <img  src={!image4 ? uploadimg : URL.createObjectURL(image4)} alt="" />
              <input onChange={(e)=>setImage4(e.target.files[0])} type="file" id='image4' hidden/>
              </label>







             
          </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-outline" onClick={() => navigate('/')}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <Plus size={20} />
              Post Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostItem;