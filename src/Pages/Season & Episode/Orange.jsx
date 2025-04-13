import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Season&Episodes/Orange.css';

const episodes = [
  {
    id: 83,
    title: "Pallet Party Panic",
    airDate: "January 13, 1999",
    description: "After earning his Indigo League badges, Ash and friends travel to the Orange Islands to deliver a mysterious GS Ball.",
    image: "https://archives.bulbagarden.net/media/upload/2/2c/EP083.png"
  },
  {
    id: 84,
    title: "A Scare in the Air",
    airDate: "January 20, 1999",
    description: "Ash and friends take a blimp ride to Valencia Island, but Team Rocket threatens to crash the party.",
    image: "https://archives.bulbagarden.net/media/upload/3/3d/EP084.png"
  },
  // Add more episodes as needed
];

const Orange = () => {
  const navigate = useNavigate();

  return (
    <div className="orange-container">
      <div className="orange-header">
        <button className="back-button" onClick={() => navigate('/SNE')}>
          ← Back to Seasons
        </button>
        <h1>Orange League</h1>
        <p>Season 2 • 36 Episodes</p>
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

export default Orange;