import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Season&Episodes/Indigo.css';
import image from '../../assets/Episode.jpg';

const Indigo = () => {
  const navigate = useNavigate();
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch episodes for season 2
  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const response = await fetch('http://localhost:3000/episodes/1');
        if (!response.ok) {
          throw new Error('Failed to fetch episodes');
        }
        const data = await response.json();
        setEpisodes(data);
      } catch (error) {
        console.error('Error fetching episodes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEpisodes();
  }, []);

  const handleEpisodeClick = (jioUrl) => {
    window.open(jioUrl, '_blank'); // Opens in new tab
  };

  if (loading) {
    return <div className="loading">Loading episodes...</div>;
  }

  return (
    <div className="orange-container">
      <div className="orange-header">
        <button className="back-button" onClick={() => navigate('/SNE')}>
          ← Back to Seasons
        </button>
        <h1>Indigo League</h1>
        <p>Season 1 • {episodes.length} Episodes</p>
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
                <span>▶ Watch online</span>
              </div>
            </div>
            <div className="episode-info">
              <h3>{episode.title}</h3>
              <span className="air-date">{episode.date}</span>
              <p className="description">{episode.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Indigo;