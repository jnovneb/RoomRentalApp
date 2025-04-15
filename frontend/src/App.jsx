import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import './App.css';

const App = () => {
  const [userType, setUserType] = useState('searcher');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [listings, setListings] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [authenticated, setAuthenticated] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(false);

  const handleAuth = async () => {
    const endpoint = isLoginMode ? 'login' : 'register';
    try {
      const response = await axios.post(`http://localhost:5000/${endpoint}`, {
        username,
        password,
        type: userType,
      });
      alert(response.data.message);
      setAuthenticated(true);
    } catch (error) {
      const message =
        error?.response?.data?.error || error.message || 'Unexpected error';
      alert(`${isLoginMode ? 'Login' : 'Register'} error: ${message}`);
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await axios.get('http://localhost:5000/get_listings');
        setListings(response.data);
      } catch (err) {
        console.error('Error fetching listings:', err);
      }
    };
    if (authenticated) {
      fetchListings();
    }
  }, [authenticated]);

  const handleSwipe = async (direction) => {
    if (currentIndex < listings.length) {
      try {
        await axios.post('http://localhost:5000/swipe', {
          listing_id: listings[currentIndex].id,
          direction,
        });
        setCurrentIndex((prev) => prev + 1);
      } catch (err) {
        console.error('Error sending swipe:', err);
      }
    }
  };

  return (
    <div className="app-container">
      {!authenticated ? (
        <div className="register-container">
          <h1>{isLoginMode ? 'Login' : 'Register'} to RoomRentalApp</h1>
          <input
            type="text"
            placeholder="User name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <select value={userType} onChange={(e) => setUserType(e.target.value)}>
            <option value="searcher">Searcher</option>
            <option value="advertiser">Advertiser</option>
          </select>
          <button onClick={handleAuth}>{isLoginMode ? 'Login' : 'Register'}</button>
          <p>
            {isLoginMode ? 'Don’t have an account?' : 'Already have an account?'}{' '}
            <button onClick={() => setIsLoginMode(!isLoginMode)} className="toggle-button">
              {isLoginMode ? 'Switch to Register' : 'Switch to Login'}
            </button>
          </p>
        </div>
      ) : (
        <div className="listings-container">
          {listings.length > 0 && currentIndex < listings.length ? (
            <motion.div
              key={currentIndex}
              className="listing-card"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2>{listings[currentIndex].title}</h2>
              <p>{listings[currentIndex].description}</p>
              <p>Precio: {listings[currentIndex].price}€</p>
              {listings[currentIndex].photos.map((photo, index) => (
                <img key={index} src={photo} alt={`Imagen ${index + 1}`} className="listing-image" />
              ))}
              <div className="swipe-buttons">
                <button className="swipe-left" onClick={() => handleSwipe('left')}>
                  ❌ I don’t like it
                </button>
                <button className="swipe-right" onClick={() => handleSwipe('right')}>
                  ✅ I like it
                </button>
              </div>
            </motion.div>
          ) : (
            <h2>No more advertisements available</h2>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
