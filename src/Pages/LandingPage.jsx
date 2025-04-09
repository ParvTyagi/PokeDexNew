import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  return (
    <div className="landing-page">
      {/* Top dark section with angled edge */}
      <div className="top-border"></div>
      
      {/* White circles in top right */}
      <div className="circle-1"></div>
      <div className="circle-2"></div>
      
      <div className="loader-container">
        {/* Outer loading ring */}
        <div className="loading-ring loading-ring-outer"></div>
        
        {/* Middle loading ring */}
        <div className="loading-ring loading-ring-middle"></div>
        
        {/* Inner loading ring */}
        <div className="loading-ring loading-ring-inner"></div>
        
        {/* Pokéball */}
        <div className="loading-ring poke-ring"></div>
        <div className="pokeball">
          <div className="top-half"></div>
          <div className="button">
            <button onClick={() => navigate('/home')}></button>
            <div className="bottom-half"></div>
          </div>
        </div>
      </div>
      
      {/* Bottom dark section with angled edge */}
      <div className="bottom-border"></div>
      
      {/* Pokeball in bottom right corner */}
      <div className="corner-pokeball">
        <div className="corner-pokeball-top"></div>
        <div className="corner-pokeball-middle"></div>
      </div>
    </div>
  );
};

export default LandingPage;