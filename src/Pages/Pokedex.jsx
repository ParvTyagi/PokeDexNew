import React, { useState, useEffect } from 'react';
import '../styles/Pokedex.css'; // Import your CSS file for styling
// Define the PokeAPI base URL
const POKEAPI_BASE_URL = "https://pokeapi.co/api/v2";

function Pokedex() {
  // Search state
  const [searchTerm, setSearchTerm] = useState('');
  const [searchError, setSearchError] = useState(null);

  // Pokemon data state
  const [pokemonList, setPokemonList] = useState([]);
  const [currentPokemon, setCurrentPokemon] = useState(null);
  const [pokemonSpecies, setPokemonSpecies] = useState(null);
  const [evolutionChain, setEvolutionChain] = useState([]);
  const [locations, setLocations] = useState([]);
  
  // Loading states
  const [loading, setLoading] = useState(true); // Start with true to load default Pokemon
  const [speciesLoading, setSpeciesLoading] = useState(false);
  const [evolutionsLoading, setEvolutionsLoading] = useState(false);
  const [locationsLoading, setLocationsLoading] = useState(false);
  
  // Tab state
  const [activeTab, setActiveTab] = useState('about');
  
  // Filter state for the main grid
  const [searchGridTerm, setSearchGridTerm] = useState('');

  // Function to toggle favorite status
  const toggleFavorite = async (pokemonId) => {
    try {
      const response = await fetch(`http://localhost:3000/pokemon/${pokemonId}/favorite`, {
        method: 'PUT',
      });

      if (!response.ok) {
        throw new Error('Failed to update favorite status');
      }

      const updatedPokemon = await response.json();

      // Update the local state to reflect the change
      setPokemonList((prevList) =>
        prevList.map((pokemon) =>
          pokemon.id === updatedPokemon.id ? { ...pokemon, isFav: updatedPokemon.isFav } : pokemon
        )
      );
    } catch (error) {
      console.error('Error toggling favorite status:', error);
    }
  };

  // Search for Pokemon function
  const searchPokemon = async (event) => {
    event.preventDefault();
    
    if (!searchTerm.trim()) {
      setSearchError('Please enter a Pokémon name or ID');
      return;
    }

    try {
      setLoading(true);
      setSearchError(null);
      
      // Clear previous data
      setCurrentPokemon(null);
      setPokemonSpecies(null);
      setEvolutionChain([]);
      setLocations([]);
      
      // Convert search term to lowercase for the API
      const query = searchTerm.toLowerCase().trim();
      
      // Fetch Pokemon data
      const response = await fetch(`${POKEAPI_BASE_URL}/pokemon/${query}`);
      
      if (!response.ok) {
        throw new Error(`Pokémon "${searchTerm}" not found. Please check the spelling.`);
      }
      
      const pokemonData = await response.json();
      setCurrentPokemon(pokemonData);
      
      // Fetch additional data once we have the Pokemon
      fetchSpeciesData(pokemonData.species.url);
      fetchLocations(pokemonData.id);
      
    } catch (error) {
      console.error("Error searching for Pokemon:", error);
      setSearchError(error instanceof Error ? error.message : 'Failed to fetch Pokemon. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch species data (for description and evolution chain)
  const fetchSpeciesData = async (speciesUrl) => {
    try {
      setSpeciesLoading(true);
      
      const response = await fetch(speciesUrl);
      if (!response.ok) throw new Error("Failed to fetch species data");
      
      const speciesData = await response.json();
      setPokemonSpecies(speciesData);
      
      // Now fetch the evolution chain
      if (speciesData.evolution_chain) {
        fetchEvolutionChain(speciesData.evolution_chain.url);
      }
      
    } catch (error) {
      console.error("Error fetching species data:", error);
    } finally {
      setSpeciesLoading(false);
    }
  };

  // Fetch evolution chain
  const fetchEvolutionChain = async (evolutionUrl) => {
    try {
      setEvolutionsLoading(true);
      
      const response = await fetch(evolutionUrl);
      if (!response.ok) throw new Error("Failed to fetch evolution chain");
      
      const evolutionData = await response.json();
      
      // Process evolution chain
      const evolutions = [];
      
      // Add base form
      const baseSpecies = evolutionData.chain.species;
      await addEvolutionPokemon(baseSpecies, evolutions);
      
      // Add first evolution(s)
      for (const evolution of evolutionData.chain.evolves_to) {
        await addEvolutionPokemon(evolution.species, evolutions);
        
        // Add second evolution(s)
        for (const secondEvolution of evolution.evolves_to) {
          await addEvolutionPokemon(secondEvolution.species, evolutions);
        }
      }
      
      setEvolutionChain(evolutions);
      
    } catch (error) {
      console.error("Error fetching evolution chain:", error);
    } finally {
      setEvolutionsLoading(false);
    }
  };

  // Helper function to add a Pokemon to the evolution chain
  const addEvolutionPokemon = async (species, evolutions) => {
    try {
      // Extract Pokemon ID from the URL
      const urlParts = species.url.split('/');
      const id = parseInt(urlParts[urlParts.length - 2]);
      
      // Fetch Pokemon details to get the image
      const response = await fetch(`${POKEAPI_BASE_URL}/pokemon/${id}`);
      const pokemonData = await response.json();
      
      const imageUrl = 
        pokemonData.sprites.other['official-artwork'].front_default || 
        pokemonData.sprites.front_default;
      
      evolutions.push({
        id: id,
        name: species.name,
        image: imageUrl
      });
    } catch (error) {
      console.error(`Error adding evolution for ${species.name}:`, error);
    }
  };

  // Fetch locations where the Pokemon can be found
  const fetchLocations = async (pokemonId) => {
    try {
      setLocationsLoading(true);
      
      const response = await fetch(`${POKEAPI_BASE_URL}/pokemon/${pokemonId}/encounters`);
      if (!response.ok) throw new Error("Failed to fetch location data");
      
      const locationData = await response.json();
      setLocations(locationData);
      
    } catch (error) {
      console.error("Error fetching locations:", error);
    } finally {
      setLocationsLoading(false);
    }
  };

  // Helper function to format a stat name
  const formatStatName = (statName) => {
    switch (statName) {
      case 'hp': return 'HP';
      case 'attack': return 'Attack';
      case 'defense': return 'Defense';
      case 'special-attack': return 'Sp. Atk';
      case 'special-defense': return 'Sp. Def';
      case 'speed': return 'Speed';
      default: return statName;
    }
  };

  // Get CSS class for a stat
  const getStatClass = (statName) => {
    switch (statName) {
      case 'hp': return 'hp';
      case 'attack': return 'attack';
      case 'defense': return 'defense';
      case 'special-attack': return 'special-attack';
      case 'special-defense': return 'special-defense';
      case 'speed': return 'speed';
      default: return '';
    }
  };

  // Format location name to be more readable
  const formatLocationName = (locationName) => {
    return locationName
      .replace(/-/g, ' ')
      .replace(/area/g, 'Area')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Get Pokemon description in English
  const getPokemonDescription = () => {
    if (!pokemonSpecies) return '';
    
    const englishEntry = pokemonSpecies.flavor_text_entries.find(
      entry => entry.language.name === 'en'
    );
    
    return englishEntry ? 
      englishEntry.flavor_text.replace(/\f/g, ' ') : 
      'No description available.';
  };

  // Get Pokemon genus (category) in English
  const getPokemonCategory = () => {
    if (!pokemonSpecies) return '';
    
    const englishGenus = pokemonSpecies.genera.find(
      genus => genus.language.name === 'en'
    );
    
    return englishGenus ? englishGenus.genus : '';
  };
  
  // Load the default Pokemon list on initial load
  useEffect(() => {
    async function fetchDefaultPokemon() {
      try {
        setLoading(true);

        // Fetch the Pokémon list from the local API
        const response = await fetch("http://localhost:3000/pokemon");
        if (!response.ok) throw new Error("Failed to fetch Pokémon from local API");

        const localPokemonList = await response.json();

        // Fetch additional details for each Pokémon from the PokéAPI
        const pokemonDetails = await Promise.all(
          localPokemonList.map(async (pokemon) => {
            const pokeApiResponse = await fetch(`${POKEAPI_BASE_URL}/pokemon/${pokemon.id}`);
            if (!pokeApiResponse.ok) throw new Error(`Failed to fetch details for Pokémon ID ${pokemon.id}`);
            const pokeApiData = await pokeApiResponse.json();

            return {
              id: pokemon.id,
              name: pokemon.name,
              types: pokemon.types, // Assuming `types` is part of the local API response
              height: pokeApiData.height,
              weight: pokeApiData.weight,
              sprites: pokeApiData.sprites,
              abilities: pokeApiData.abilities,
              species: pokeApiData.species,
            };
          })
        );

        setPokemonList(pokemonDetails);
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchDefaultPokemon();
  }, []);

  return (
    <div className="container">
      <div className="Pokedex">
        <div className="PD">
          <h1><span className="red-text">Poké</span>dex</h1>
          <form className="search-form" onSubmit={searchPokemon}>
            <input 
              type="text"
              className="search-input"
              placeholder="Search Pokémon..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              required
            />
            <button type="submit" style={{
              background: "#ff0000",
              color: "white",
              border: "none",
              borderRadius: "5px",
              padding: "0 20px",
              height: "40px",
              cursor: "pointer",
              fontWeight: "bold"
            }}>Search</button>
          </form>
          
          {searchError && (
            <div className="error-message">{searchError}</div>
          )}
        </div>
        
        {loading && (
          <div className="loading">
            <div className="spinner"></div>
          </div>
        )}
        
        {/* Render Pokémon Grid */}
        {!currentPokemon && !loading && pokemonList?.length > 0 && (
          <div>
            <div className="pokemon-grid">
              {pokemonList.map((poke) => (
                <div
                  key={poke.id}
                  className="pokemon-card"
                  onClick={() => {
                    setCurrentPokemon(poke);
                    fetchSpeciesData(poke.species?.url);
                    fetchLocations(poke.id);
                  }}
                >
                  <div className="pokemon-image">
                    <img
                      src={
                        poke.sprites?.other['official-artwork']?.front_default ||
                        poke.sprites?.front_default
                      }
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
          </div>
        )}
        
        {currentPokemon && !loading && (
          <div className="pokemon-detail">
            <button 
              className="back-button" 
              onClick={() => setCurrentPokemon(null)}
              style={{
                position: 'absolute',
                top: '10px',
                left: '10px',
                background: '#ff0000',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                fontSize: '20px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              ←
            </button>
            
            <div className="pokemon-header">
              <div className="pokemon-name-id">
                <h2 className="pokemon-name">{currentPokemon.name}</h2>
                <p className="pokemon-id">#{currentPokemon.id.toString().padStart(3, '0')}</p>
              </div>
              <div className="pokemon-types">
                {currentPokemon.types.map(type => (
                  <span 
                    key={type.type.name} 
                    className={`type-badge ${type.type.name}`}
                  >
                    {type.type.name}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="pokemon-content">
              <div className="pokemon-image-container">
                <img 
                  className="pokemon-image"
                  src={currentPokemon.sprites.other['official-artwork'].front_default || currentPokemon.sprites.front_default} 
                  alt={currentPokemon.name}
                />
              </div>
              
              <div className="pokemon-details">
                <div className="tabs">
                  <div 
                    className={`tab ${activeTab === 'about' ? 'active' : ''}`} 
                    onClick={() => setActiveTab('about')}
                  >
                    About
                  </div>
                  <div 
                    className={`tab ${activeTab === 'stats' ? 'active' : ''}`} 
                    onClick={() => setActiveTab('stats')}
                  >
                    Stats
                  </div>
                  <div 
                    className={`tab ${activeTab === 'evolutions' ? 'active' : ''}`} 
                    onClick={() => setActiveTab('evolutions')}
                  >
                    Evolutions
                  </div>
                  <div 
                    className={`tab ${activeTab === 'locations' ? 'active' : ''}`} 
                    onClick={() => setActiveTab('locations')}
                  >
                    Locations
                  </div>
                </div>
                
                <div className="tab-content">
                  {/* About Tab */}
                  {activeTab === 'about' && (
                    <div className="about-container">
                      {speciesLoading ? (
                        <div className="loading">
                          <div className="spinner"></div>
                        </div>
                      ) : (
                        <>
                          <p>{getPokemonDescription()}</p>
                          
                          <div className="about-row">
                            <div className="about-label">Category</div>
                            <div className="about-value">{getPokemonCategory()}</div>
                          </div>
                          
                          <div className="about-row">
                            <div className="about-label">Height</div>
                            <div className="about-value">{(currentPokemon.height / 10).toFixed(1)}m</div>
                          </div>
                          
                          <div className="about-row">
                            <div className="about-label">Weight</div>
                            <div className="about-value">{(currentPokemon.weight / 10).toFixed(1)}kg</div>
                          </div>
                          
                          <div className="about-row">
                            <div className="about-label">Abilities</div>
                            <div className="about-value">
                              {currentPokemon.abilities.map((ability, index) => (
                                <div key={ability.ability.name}>
                                  {ability.ability.name.replace('-', ' ')}
                                  {ability.is_hidden && ' (hidden)'}
                                  {index < currentPokemon.abilities.length - 1 ? ', ' : ''}
                                </div>
                              ))}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                  
                  {/* Stats Tab */}
                  {activeTab === 'stats' && (
                    <div className="stats-container">
                      {currentPokemon.stats.map(stat => {
                        // Maximum stat value for visual scaling (most Pokémon stats don't exceed 255)
                        const maxStat = 255;
                        const percentage = (stat.base_stat / maxStat) * 100;
                        
                        return (
                          <div key={stat.stat.name} className="stat-row">
                            <div className="stat-name">{formatStatName(stat.stat.name)}</div>
                            <div className="stat-bar-container">
                              <div 
                                className={`stat-bar ${getStatClass(stat.stat.name)}`} 
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                            <div className="stat-value">{stat.base_stat}</div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                  
                  {/* Evolutions Tab */}
                  {activeTab === 'evolutions' && (
                    <>
                      {evolutionsLoading ? (
                        <div className="loading">
                          <div className="spinner"></div>
                        </div>
                      ) : evolutionChain.length > 0 ? (
                        <div className="evolution-chain">
                          {evolutionChain.map((pokemon, index) => (
                            <React.Fragment key={pokemon.id}>
                              <div className="evolution-item">
                                <img 
                                  className="evolution-image" 
                                  src={pokemon.image} 
                                  alt={pokemon.name} 
                                />
                                <div className="evolution-name">{pokemon.name}</div>
                              </div>
                              
                              {index < evolutionChain.length - 1 && (
                                <div className="evolution-arrow">→</div>
                              )}
                            </React.Fragment>
                          ))}
                        </div>
                      ) : (
                        <p>No evolution data available.</p>
                      )}
                    </>
                  )}
                  
                  {/* Locations Tab */}
                  {activeTab === 'locations' && (
                    <>
                      {locationsLoading ? (
                        <div className="loading">
                          <div className="spinner"></div>
                        </div>
                      ) : locations.length > 0 ? (
                        <div className="locations-container">
                          {locations.map((location, index) => (
                            <div key={index} className="location-item">
                              {formatLocationName(location.location_area.name)}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p>No location data available for this Pokémon.</p>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Pokedex;