import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SNE.css';
import IndigoImage from '../assets/Indigo.jpg';
import OrangeImage from '../assets/Orange.jpg';
import BWImage from '../assets/B&W.jpg';
import GoldSilverImage from '../assets/Gold&Silver.jpg';
import RubyImage from '../assets/Ruby&S.jpg';
import XYZImage from '../assets/XYZ.png';
import SunMoonImage from '../assets/Sun&moon.jpg';
import JohtoImage from '../assets/Johto.jpg';
import DPImage from '../assets/Diamond&Pearl.jpg';
import SSImage from '../assets/SS.jpg';
import UJImage from '../assets/UJ.png';
import HorizonImage from '../assets/Horizon.jpg';


const seasons = [
  {
    id: 1,
    title: "Indigo League",
    episodes: 82,
    year: "1997-1999",
    image: IndigoImage,
    description: "Ash Ketchum begins his journey to become a Pokémon Master with Pikachu.",
  },
  {
    id: 2,
    title: "Adventures in the Orange Islands",
    episodes: 36,
    year: "1999",
    image: OrangeImage,
    description: "Ash travels through the Orange Islands, collecting badges and making new friends.",
  },
  {
    id: 3,
    title: "The Johto League Champions",
    episodes: 52,
    year: "2001",
    image: JohtoImage,
    description: "Ash continues his journey through Johto, aiming to compete in the Silver Conference.",
  },
  {
    id: 4,
    title: "Gold and Silver",
    episodes: 118,
    year: "1999-2001",
    image: GoldSilverImage,
    description: "Ash explores the Johto region, encountering new Pokémon from Gold and Silver games.",
  },
  {
    id: 5,
    title: "Ruby and Sapphire",
    episodes: 145,
    year: "2002-2004",
    image: RubyImage,
    description: "Adventures in Hoenn region with May joining Ash on his journey.",
  },
  {
    id: 6,
    title: "Diamond and Pearl",
    episodes: 191,
    year: "2006-2010",
    image: DPImage,
    description: "Ash and Dawn's journey through Sinnoh, facing Team Galactic.",
  },
  {
    id: 7,
    title: "Black & White",
    episodes: 142,
    year: "2010-2013",
    image: BWImage,
    description: "Ash travels to Unova with Iris and Cilan, confronting Team Plasma.",
  },
  {
    id: 8,
    title: "XY & XY&Z",
    episodes: 140,
    year: "2013-2016",
    image: XYZImage,
    description: "Adventures in Kalos with Serena, Clemont, and Bonnie, featuring Mega Evolution.",
  },
  {
    id: 9,
    title: "Sun & Moon",
    episodes: 146,
    year: "2016-2019",
    image: SunMoonImage,
    description: "Ash attends the Pokémon School in Alola, experiencing Island Challenges.",
  },
  {
    id: 10,
    title: "Sword & Shield",
    episodes: 127,
    year: "2019-2022",
    image: SSImage,
    description: "Ash and Goh travel across all regions as research fellows.",
  },
  {
    id: 11,
    title: "Ultimate Journeys",
    episodes: 46,
    year: "2022-2023",
    image: UJImage,
    description: "Ash's final season as protagonist, becoming World Champion.",
  },
  {
    id: 12,
    title: "Pokémon Horizons",
    episodes: "Ongoing",
    year: "2023-Present",
    image: HorizonImage,
    description: "New protagonists Liko and Roy embark on their adventure at Naranja Academy.",
  }
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
