import React, { useEffect, useState } from 'react';
import '../styles/Pokedex.css'; // Reuse the same styles as Pokedex

const Favourite = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch favorite Pokémon from the API
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch('http://localhost:3000/pokemon/favorites');
        if (!response.ok) {
          throw new Error('Failed to fetch favorite Pokémon');
        }
        const data = await response.json();
        setFavorites(data);
      } catch (error) {
        console.error('Error fetching favorite Pokémon:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  const toggleFavorite = (id) => {
    setFavorites((prevFavorites) =>
      prevFavorites.map((poke) =>
        poke.id === id ? { ...poke, isFav: !poke.isFav } : poke
      )
    );
  };

  if (loading) {
    return <div className="loading">Loading favorite Pokémon...</div>;
  }

  return (
    <div className="container">
      <div className="Pokedex">
        <h1><span className="red-text">Favorite</span> Pokémon</h1>
        <p>Here you can find your favorite Pokémon.</p>

        {favorites.length === 0 ? (
          <p>No favorite Pokémon found.</p>
        ) : (
          <div className="pokemon-grid">
            {favorites.map((poke) => (
              <div key={poke.id} className="pokemon-card">
                <div className="pokemon-image">
                  <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${poke.id}.png`}
                    alt={poke.name}
                  />
                </div>
                <div className="pokemon-info">
                  <div className="pokemon-name">
                    #{poke.id.toString().padStart(3, '0')} {poke.name}
                  </div>
                  <div className="pokemon-types">
                    {poke.types?.map((type) => (
                      <span key={type.type.name} className={`type-badge ${type.type.name}`}>
                        {type.type.name}
                      </span>
                    ))}
                  </div>
                  <button
                    className={`favorite-button ${poke.isFav ? 'favorited' : ''}`}
                    onClick={() => toggleFavorite(poke.id)}
                  >
                    {poke.isFav ? '★ Unfavorite' : '☆ Favorite'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favourite;
