import React from 'react';
import '../styles/LandingPage.css';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  return (
    <div className="landing-page">
      <div className="T"></div>
      <div className="loader-container">
        {/* Outer loading ring */}
        <div className="loading-ring loading-ring-outer"></div>
        
        {/* Middle loading ring */}
        <div className="loading-ring loading-ring-middle"></div>
        
        {/* Inner loading ring */}
        <div className="loading-ring loading-ring-inner"></div>
        
        {/* Pokéball */}
        <div className="loading-ring  poke-ring"></div>
        <div className="pokeball">
          <div className="top-half"></div>
          <div className="button">
            <button onClick={() => navigate('/home')}></button>
          <div className="bottom-half"></div>
          </div>
        </div>
      </div>
      <div className="B"></div>
    </div>
  );
};

export default LandingPage;