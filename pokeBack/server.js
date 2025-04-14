const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client'); 

const app = express();
const port = 3000;

const prisma = new PrismaClient(); 

app.use(bodyParser.json());
app.use(cors());


app.get('/pokemon', async (req, res) => {
    try {
        const pokemon = await prisma.pokemon.findMany();
        res.json(pokemon);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch Pokémon data' });
    }
});


app.get('/movies', async (req, res) => {
    try {
        const movies = await prisma.movies.findMany();
        res.json(movies);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch movies data' });
    }
});

app.get('/pokemon/favorites', async (req, res) => {
    try {
        const favoritePokemon = await prisma.pokemon.findMany({
            where: { isFav: true },
        });
        res.json(favoritePokemon);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch favorite Pokémon' });
    }
});

app.get('/season', async (req, res) => {
    try {
        const seasons = await prisma.season.findMany();
        res.json(seasons);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch seasons data' });
    }
});

app.get('/episodes/:season', async (req, res) => {
    try {
        const { season } = req.params;

        // Parse the season as an integer
        const parsedSeason = parseInt(season, 10);

        if (isNaN(parsedSeason)) {
            return res.status(400).json({ error: 'Invalid season number' });
        }

        // Fetch episodes for the given season
        const episodes = await prisma.episode.findMany({
            where: { season: parsedSeason },
        });

        res.json(episodes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch episodes data' });
    }
});


app.put('/pokemon/:id/favorite', async (req, res) => {
    try {
        const { id } = req.params;

        // Parse the id as an integer
        const parsedId = parseInt(id, 10);

        if (isNaN(parsedId)) {
            return res.status(400).json({ error: 'Invalid Pokémon ID' });
        }

        // Fetch the Pokémon by ID
        const pokemon = await prisma.pokemon.findUnique({
            where: { id: parsedId },
        });

        if (!pokemon) {
            return res.status(404).json({ error: 'Pokémon not found' });
        }

        // Toggle the isFav value
        const updatedPokemon = await prisma.pokemon.update({
            where: { id: parsedId },
            data: { isFav: !pokemon.isFav },
        });

        res.json(updatedPokemon);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update Pokémon favorite status' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});