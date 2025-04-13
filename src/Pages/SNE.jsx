import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SNE.css';

const seasons = [
  {
    id: 1,
    title: "Indigo League",
    episodes: 82,
    year: "1997-1999",
    image: "https://archives.bulbagarden.net/media/upload/2/2c/Indigo_League_logo.png",
    description: "Ash Ketchum begins his journey to become a Pokémon Master with Pikachu.",
  },
  {
    id: 2,
    title: "Adventures in the Orange Islands",
    episodes: 36,
    year: "1999",
    image: "https://archives.bulbagarden.net/media/upload/4/4d/Orange_League_logo.png",
    description: "Ash travels through the Orange Islands, collecting badges and making new friends.",
  },
];

const SNE = () => {
  const navigate = useNavigate();

  const handleSeasonClick = (seasonId) => {
    navigate(`/season/${seasonId}`);
  };

  return (
    <div className="sne-container">
      <div className="sne-header">
        <h1>Pokémon Seasons</h1>
        <p>Choose a season to explore episodes!</p>
      </div>

      <div className="seasons-grid">
        {seasons.map((season) => (
          <div 
            key={season.id} 
            className="season-card"
            onClick={() => handleSeasonClick(season.id)}
          >
            <div className="season-image">
              <img src={season.image} alt={season.title} />
            </div>
            <div className="season-info">
              <h2>{season.title}</h2>
              <div className="season-details">
                <span className="episodes">{season.episodes} Episodes</span>
                <span className="year">{season.year}</span>
              </div>
              <p className="description">{season.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SNE;
