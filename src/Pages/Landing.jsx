import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from '../firebase';
import './Landing.css';

const Landing = () => {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const auth = getAuth(app);
  
  const backgroundImages = [
    'https://images.pexels.com/photos/976866/pexels-photo-976866.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=2',
    'https://cdn.pixabay.com/photo/2016/11/23/15/48/audience-1853662_1280.jpg',
    'https://www.wtcmanila.com.ph/wp-content/uploads/2022/08/rear-view-of-audience-in-the-conference-hall-or-se-2021-08-30-06-51-57-utc-1.jpg',
    'https://images.jdmagicbox.com/quickquotes/listicle/listicle_1686140315148_74ycs_1040x500.jpg',
    'https://images.pexels.com/photos/2263436/pexels-photo-2263436.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=2'
  ];

  useEffect(() => {
    // Check authentication status
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });

    // Navigation timer - redirect based on auth status after 3 seconds
    const navTimer = setTimeout(() => {
      if (isAuthenticated) {
        navigate('/home');
      } else {
        navigate('/login');
      }
    }, 3000);

    return () => {
      clearTimeout(navTimer);
      unsubscribe();
    };
  }, [navigate, isAuthenticated, auth]);

  return (
    <div className="landing-container">
      {/* Background Images Grid */}
      <div className="background-grid">
        {backgroundImages.map((image, index) => (
          <div 
            key={index}
            className="background-image"
            style={{ 
              backgroundImage: `url(${image})`,
              opacity: 1
            }}
          />
        ))}
      </div>
      
      {/* Overlay */}
      <div className="overlay" />
      
      {/* Content */}
      <div className="slide-in-container">
        <span className="slide-in slide-from-left">Event</span>
        <span className="slide-in slide-from-bottom">For</span>
        <span className="slide-in slide-from-right">You</span>
      </div>
    </div>
  );
};

export default Landing;