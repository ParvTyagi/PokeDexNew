import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Season&Episodes/Orange.css';
import image from '../../assets/Episode.jpg'

const episodes = [
  {
    id: 83,
    title: "Pallet Party Panic",
    airDate: "January 13, 1999",
    description: "After earning his Indigo League badges, Ash and friends travel to the Orange Islands to deliver a mysterious GS Ball.",
    image: "https://archives.bulbagarden.net/media/upload/2/2c/EP083.png",
    jioUrl: "https://www.jiocinema.com/tv-shows/pokemon/2/pallet-party-panic/3497878"
  },
  {
    id: 84,
    title: "A Scare in the Air",
    airDate: "January 20, 1999",
    description: "Ash and friends take a blimp ride to Valencia Island, but Team Rocket threatens to crash the party.",
    image: "https://archives.bulbagarden.net/media/upload/3/3d/EP084.png",
    jioUrl: "https://www.jiocinema.com/tv-shows/pokemon/2/a-scare-in-the-air/3497879"
  },
  // Add more episodes with their respective JioCinema URLs
];

const Orange = () => {
  const navigate = useNavigate();

  const handleEpisodeClick = (jioUrl) => {
    window.open(jioUrl, '_blank'); // Opens in new tab
  };

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
          <div 
            key={episode.id} 
            className="episode-card"
            onClick={() => handleEpisodeClick(episode.jioUrl)}
            style={{ cursor: 'pointer' }}
          >
            <div className="episode-image">
              <img src={image} alt={episode.title} />
              <span className="episode-number">EP{String(episode.id).padStart(3, '0')}</span>
              <div className="watch-overlay">
                <span>▶ Watch on JioCinema</span>
              </div>
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