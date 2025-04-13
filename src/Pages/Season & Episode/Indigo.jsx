import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Season&Episodes/Indigo.css';

const episodes = [
  {
    id: 1,
    title: "Pokémon, I Choose You!",
    airDate: "April 1, 1997",
    description: "Ash Ketchum begins his Pokémon journey with an unruly Pikachu.",
    image: "https://archives.bulbagarden.net/media/upload/8/8e/EP001.png"
  },
  {
    id: 2,
    title: "Pokémon Emergency!",
    airDate: "April 8, 1997",
    description: "Ash rushes an injured Pikachu to the Pokémon Center, pursued by a angry flock of Spearow.",
    image: "https://archives.bulbagarden.net/media/upload/5/5c/EP002.png"
  },
  // Add more episodes as needed
];

const Indigo = () => {
  const navigate = useNavigate();

  return (
    <div className="indigo-container">
      <div className="indigo-header">
        <button className="back-button" onClick={() => navigate('/SNE')}>
          ← Back to Seasons
        </button>
        <h1>Indigo League</h1>
        <p>Season 1 • 82 Episodes</p>
      </div>

      <div className="episodes-grid">
        {episodes.map((episode) => (
          <div key={episode.id} className="episode-card">
            <div className="episode-image">
              <img src={episode.image} alt={episode.title} />
              <span className="episode-number">EP{String(episode.id).padStart(3, '0')}</span>
            </div>
            <div className="episode-info">
              <h3>{episode.title}</h3>
              <span className="air-date">{episode.airDate}</span>
              <p className="description">{episode.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Indigo;
