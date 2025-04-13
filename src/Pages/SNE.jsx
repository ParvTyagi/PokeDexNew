import React, { useState } from 'react';
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
  // Add more seasons as needed
];

const SNE = () => {
  const [selectedSeason, setSelectedSeason] = useState(null);

  return (
    <div className="sne-container">
      <div className="sne-header">
        <h1>Pokémon Seasons & Episodes</h1>
        <p>Explore all the seasons and episodes of your favorite Pokémon series!</p>
      </div>

      <div className="seasons-grid">
        {seasons.map((season) => (
          <div 
            key={season.id} 
            className="season-card"
            onClick={() => setSelectedSeason(season)}
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

      {selectedSeason && (
        <div className="season-modal">
          <div className="modal-content">
            <button className="close-button" onClick={() => setSelectedSeason(null)}>×</button>
            <h2>{selectedSeason.title}</h2>
            <img src={selectedSeason.image} alt={selectedSeason.title} />
            <p>{selectedSeason.description}</p>
            <div className="season-stats">
              <div>Episodes: {selectedSeason.episodes}</div>
              <div>Year: {selectedSeason.year}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SNE;
