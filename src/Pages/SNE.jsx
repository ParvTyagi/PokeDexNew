import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SNE.css';

const SNE = () => {
  const navigate = useNavigate();
  const [seasons, setSeasons] = useState([]);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const fetchSeasons = async () => {
      try {
        const response = await fetch('http://localhost:3000/season');
        if (!response.ok) {
          throw new Error('Failed to fetch seasons data');
        }
        const data = await response.json();
        setSeasons(data);
      } catch (error) {
        console.error('Error fetching seasons:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSeasons();
  }, []);

  const handleSeasonClick = (seasonId) => {
    navigate(`/season/${seasonId}`);
  };

  if (loading) {
    return <div className="loading">Loading seasons...</div>;
  }

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
              <img src={season.image} alt={season.name} />
            </div>
            <div className="season-info">
              <h2>{season.name}</h2>
              <div className="season-details">
                <div className="episodes">{season.episodes} Episodes</div>
                <div className="year">{season.year}</div>
              </div>
              <p className="description">{season.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SNE;
