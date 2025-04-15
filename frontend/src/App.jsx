import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import './App.css';

const App = () => {
  const [userType, setUserType] = useState('searcher');
  const [username, setUsername] = useState('');
  const [listings, setListings] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [registered, setRegistered] = useState(false);

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:5000/register', {
        username,
        type: userType,
      });
      alert(response.data.message);
      setRegistered(true);
    } catch (error) {
      alert('Register error: ' + error.response.data.error);
    }
  };

  useEffect(() => {
    const fetchListings = async () => {
      const response = await axios.get('http://localhost:5000/get_listings');
      setListings(response.data);
    };
    fetchListings();
  }, []);

  const handleSwipe = async (direction) => {
    if (currentIndex < listings.length) {
      await axios.post('http://localhost:5000/swipe', {
        listing_id: currentIndex,
        direction,
      });
      setCurrentIndex((prev) => prev + 1);
    }
  };

  return (
    <div className="app-container">
      {!registered ? (
        <div className="register-container">
          <h1>Welcome to the renting portal!</h1>
          <input
            type="text"
            placeholder="User name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <select value={userType} onChange={(e) => setUserType(e.target.value)}>
            <option value="searcher">Searcher</option>
            <option value="advertiser">Advertiser</option>
          </select>
          <button onClick={handleRegister}>Register</button>
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
                  ❌ I don´t like it
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