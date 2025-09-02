import { BrowserRouter as Router, Routes, Route , Navigate} from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Category from './pages/Category';
import ItemDetail from './pages/ItemDetail';
import PostItem from './pages/PostItem';
import Profile from './pages/Profile';
import Login from './pages/Login';
import './App.css';
import{GoogleOAuthProvider} from '@react-oauth/google'
import { useState } from 'react';


function App() {


const GoogleAuthWrapper = () => {
  return (
    <GoogleOAuthProvider clientId="517537746397-fmhfh4vkulqfla12iofo0tf21dp9d6lb.apps.googleusercontent.com" >
      <Login />
    </GoogleOAuthProvider>
  )

}




  return (
    <Router>
      <div className="app">
       {location.pathname !== "/login" && <Header />}
        <main className="main-content">
          <Routes>
            <Route path="/login" element={<GoogleAuthWrapper/>}/>
            <Route path="/" element={<Home />} />
            <Route path="/category/:categoryId" element={<Category />} />
            <Route path="/item/:itemId" element={<ItemDetail />} />
            <Route path="/post" element={<PostItem />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<h1>404 Page Not Found</h1>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
