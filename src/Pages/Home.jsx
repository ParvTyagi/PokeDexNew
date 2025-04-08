import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import '../styles/Home.css'; // Import the CSS file for styling
import image from '../assets/pikachu.png'; // Import the image for the home page
import heroimage from '../assets/18957.jpg'; // Import the Pokéball image

const Home = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  return (
    <div className="home">
      <div className="pokeball-background"></div> {/* Rotating Pokéball */}
      <div className="details">
        <div className="detail">

          <h1>Welcome to the Pokémon World!</h1>
          <p>Discover your favorite Pokémon and their abilities.</p>
          <p>Join us in this exciting adventure!</p>
          {/* Navigate to the Pokedex page on button click */}
          <button className="explore-button" onClick={() => navigate('/Pokedex')}>
            Explore Now
          </button>
        </div>
        <div className="image">
          <img src={image} alt="PokeImage" />
        </div>
      </div>
      <div className="heroimage">
        <img src={heroimage} alt="HeroImage" />
      </div>
    </div>
  );
};

export default Home;
