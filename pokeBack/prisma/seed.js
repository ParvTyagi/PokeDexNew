const { PrismaClient } = require('@prisma/client');


const prisma = new PrismaClient();
const pokemonDB = [
  {
    name: 'Bulbasaur',
    type: 'Grass/Poison',
    isFav: false,
    height: '0.7 m',
    weight: '6.9 kg',
  },
  {
    name: 'Ivysaur',
    type: 'Grass/Poison',
    isFav: false,
    height: '1.0 m',
    weight: '13.0 kg',
  },
  {
    name: 'Venusaur',
    type: 'Grass/Poison',
    isFav: false,
    height: '2.0 m',
    weight: '100.0 kg',
  },
  {
    name: 'Charmander',
    type: 'Fire',
    isFav: false,
    height: '0.6 m',
    weight: '8.5 kg',
  },
  {
    name: 'Charmeleon',
    type: 'Fire',
    isFav: false,
    height: '1.1 m',
    weight: '19.0 kg',
  },
  {
    name: 'Charizard',
    type: 'Fire/Flying',
    isFav: false,
    height: '1.7 m',
    weight: '90.5 kg',
  },
  {
    name: 'Squirtle',
    type: 'Water',
    isFav: false,
    height: '0.5 m',
    weight: '9.0 kg',
  },
  {
    name: 'Wartortle',
    type: 'Water',
    isFav: false,
    height: '1.0 m',
    weight: '22.5 kg',
  },
  {
    name: 'Blastoise',
    type: 'Water',
    isFav: false,
    height: '1.6 m',
    weight: '85.5 kg',
  },
  {
    name: 'Caterpie',
    type: 'Bug',
    isFav: false,
    height: '0.3 m',
    weight: '2.9 kg',
  },
];


const moviesDB = [
  {
      name: "Pokémon: The First Movie",
      year: "1998",
      desc: "Ash and his friends face off against the legendary Pokémon Mewtwo.",
      image: "/src/assets/first-movie.jpg",
  },
  {
      name: "Pokémon: The Movie 2000",
      year: "1999",
      desc: "Ash must save the world from the clash of legendary birds.",
      image: "/src/assets/movies/movie-2000.jpg",
  },
  {
      name: "Pokémon 3: The Movie",
      year: "2000",
      desc: "Ash and friends battle the Unown and Entei to save a young girl.",
      image: "/src/assets/movie-3.jpg",
  },
  {
      name: "Pokémon 4Ever",
      year: "2001",
      desc: "Ash and friends meet Celebi and battle a time-traveling villain.",
      image: "/src/assets/movie-4ever.jpg",
  },
  {
      name: "Pokémon Heroes",
      year: "2002",
      desc: "Ash and friends protect Latios and Latias from thieves in Alto Mare.",
      image: "/src/assets/heroes.jpg",
  },
  {
      name: "Pokémon: Jirachi—Wish Maker",
      year: "2003",
      desc: "Ash and friends help Jirachi, a wish-granting Pokémon, escape from danger.",
      image: "/src/assets/jirachi.jpg",
  },
];

const seasonDB = [
  {
    name: 'Pokémon: Indigo League',
    episodes: '82',
    year: '1997–1999',
    desc: 'Ash Ketchum begins his journey to become a Pokémon Master, traveling through the Kanto region with his partner Pikachu.',
    image: '/src/assets/Indigo.jpg',
  },
  {
    name: 'Pokémon: Adventures in the Orange Islands',
    episodes: '36',
    year: '1999',
    desc: 'Ash continues his quest in the Orange Archipelago, facing unique challenges and earning badges from the Orange Crew.',
    image: '/src/assets/Orange.jpg',
  },
  {
    name: 'Pokémon: The Johto Journeys',
    episodes: '41',
    year: '1999–2000',
    desc: 'Ash, Misty, and Brock travel to the Johto region, encountering new Pokémon and competing in the Johto League.',
    image: '/src/assets/Johto.jpg',
  },
  {
    name: 'Pokémon: Johto League Champions',
    episodes: '52',
    year: '2000–2001',
    desc: 'Ash continues his journey through Johto, facing new rivals and challenging Gym Leaders to qualify for the Johto League.',
    image: '/src/assets/Johto.jpg',
  },
  {
    name: 'Pokémon: Master Quest',
    episodes: '65',
    year: '2001–2002',
    desc: 'Ash and friends conclude their adventures in Johto, culminating in the Johto League Silver Conference.',
    image: '/src/assets/Horizon.jpg',
  },
];

const episodeDB = [
    {
      image: "https://m.media-amazon.com/images/M/MV5BM2EyMjQzZTUtYTg5Yi00MzE3LWIxNTUtNzQ0Y2Y2MjUwZDJlXkEyXkFqcGdeQXVyMTA3MTI2ODc5._V1_.jpg",
      name: "Long Day's Journey Into Night",
      season: 1,
      link: "https://www.primevideo.com/detail/From/0QFVGZPL4ZT3JRTZIA0HRJGS39",
      desc: "The Matthews family arrives in a mysterious town they can't escape.",
      date: "2022-02-20",
    },
    {
      image: "https://m.media-amazon.com/images/M/MV5BM2EyMjQzZTUtYTg5Yi00MzE3LWIxNTUtNzQ0Y2Y2MjUwZDJlXkEyXkFqcGdeQXVyMTA3MTI2ODc5._V1_.jpg",
      name: "The Way Things Are Now",
      season: 1,
      link: "https://www.primevideo.com/detail/From/0QFVGZPL4ZT3JRTZIA0HRJGS39",
      desc: "Residents adapt to the town's terrifying nocturnal threats.",
      date: "2022-02-27",
    },
    {
      image: "https://m.media-amazon.com/images/M/MV5BM2EyMjQzZTUtYTg5Yi00MzE3LWIxNTUtNzQ0Y2Y2MjUwZDJlXkEyXkFqcGdeQXVyMTA3MTI2ODc5._V1_.jpg",
      name: "Choosing Day",
      season: 1,
      link: "https://www.primevideo.com/detail/From/0QFVGZPL4ZT3JRTZIA0HRJGS39",
      desc: "Newcomers must decide where they'll reside within the town.",
      date: "2022-03-06",
    },
    {
      image: "https://m.media-amazon.com/images/M/MV5BM2EyMjQzZTUtYTg5Yi00MzE3LWIxNTUtNzQ0Y2Y2MjUwZDJlXkEyXkFqcGdeQXVyMTA3MTI2ODc5._V1_.jpg",
      name: "A Rock and a Farway",
      season: 1,
      link: "https://www.primevideo.com/detail/From/0QFVGZPL4ZT3JRTZIA0HRJGS39",
      desc: "Tensions rise as secrets about the town's origins surface.",
      date: "2022-03-13",
    },
    {
      image: "https://m.media-amazon.com/images/M/MV5BM2EyMjQzZTUtYTg5Yi00MzE3LWIxNTUtNzQ0Y2Y2MjUwZDJlXkEyXkFqcGdeQXVyMTA3MTI2ODc5._V1_.jpg",
      name: "Silhouettes",
      season: 1,
      link: "https://www.primevideo.com/detail/From/0QFVGZPL4ZT3JRTZIA0HRJGS39",
      desc: "A mysterious figure offers hope—or perhaps more danger.",
      date: "2022-03-20",
    },
    {
      image: "https://m.media-amazon.com/images/M/MV5BM2EyMjQzZTUtYTg5Yi00MzE3LWIxNTUtNzQ0Y2Y2MjUwZDJlXkEyXkFqcGdeQXVyMTA3MTI2ODc5._V1_.jpg",
      name: "Strangers in a Strange Land",
      season: 2,
      link: "https://www.primevideo.com/detail/From/0QFVGZPL4ZT3JRTZIA0HRJGS39",
      desc: "The town faces new threats as outsiders arrive.",
      date: "2023-04-23",
    },
    {
      image: "https://m.media-amazon.com/images/M/MV5BM2EyMjQzZTUtYTg5Yi00MzE3LWIxNTUtNzQ0Y2Y2MjUwZDJlXkEyXkFqcGdeQXVyMTA3MTI2ODc5._V1_.jpg",
      name: "The Kindness of Strangers",
      season: 2,
      link: "https://www.primevideo.com/detail/From/0QFVGZPL4ZT3JRTZIA0HRJGS39",
      desc: "Trust is tested among residents and newcomers alike.",
      date: "2023-04-30",
    },
    {
      image: "https://m.media-amazon.com/images/M/MV5BM2EyMjQzZTUtYTg5Yi00MzE3LWIxNTUtNzQ0Y2Y2MjUwZDJlXkEyXkFqcGdeQXVyMTA3MTI2ODc5._V1_.jpg",
      name: "Tether",
      season: 2,
      link: "https://www.primevideo.com/detail/From/0QFVGZPL4ZT3JRTZIA0HRJGS39",
      desc: "Connections between the town and the outside world emerge.",
      date: "2023-05-07",
    },
    {
      image: "https://m.media-amazon.com/images/M/MV5BM2EyMjQzZTUtYTg5Yi00MzE3LWIxNTUtNzQ0Y2Y2MjUwZDJlXkEyXkFqcGdeQXVyMTA3MTI2ODc5._V1_.jpg",
      name: "This Way Gone",
      season: 2,
      link: "https://www.primevideo.com/detail/From/0QFVGZPL4ZT3JRTZIA0HRJGS39",
      desc: "A resident's past threatens the town's fragile peace.",
      date: "2023-05-14",
    },
    {
      image: "https://m.media-amazon.com/images/M/MV5BM2EyMjQzZTUtYTg5Yi00MzE3LWIxNTUtNzQ0Y2Y2MjUwZDJlXkEyXkFqcGdeQXVyMTA3MTI2ODc5._V1_.jpg",
      name: "Lullaby",
      season: 2,
      link: "https://www.primevideo.com/detail/From/0QFVGZPL4ZT3JRTZIA0HRJGS39",
      desc: "A haunting melody reveals deeper mysteries.",
      date: "2023-05-21",
    },
  ];

async function main() {
  for (const movie of moviesDB) {
    await prisma.movies.create({
      data: movie,
    });
  }
  console.log("Movies data seeded successfully!");

  for (const pokemon of pokemonDB) {
    await prisma.pokemon.create({
      data: pokemon,
    });
  }
  console.log("Pokémon data seeded successfully!");

  for (const season of seasonDB) {
    await prisma.season.create({
      data: season,
    });
  }
  console.log("Seasons data seeded successfully!");

  for(const episode of episodeDB) {
    await prisma.episode.create({
      data: episode,
    });
  }
  console.log("Episodes data seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });