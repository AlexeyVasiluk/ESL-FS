const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { Word, UserProgress } = require('./models'); // Імпорт моделей

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/wordStorage');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// API Endpoints
// Get words by category
app.get('/api/words', async (req, res) => {
    try {
        const { category } = req.query;
        const words = await Word.find(category ? { category } : {});
        res.json(words);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch words' });
    }
});

// Save user progress
app.post('/api/progress', async (req, res) => {
    try {
        const { userId, wordId, status } = req.body;
        await UserProgress.updateOne(
            { userId, wordId },
            { $set: { status } },
            { upsert: true }
        );
        res.status(200).send('Progress updated');
    } catch (error) {
        res.status(500).json({ error: 'Failed to update progress' });
    }
});

// Get user progress
app.get('/api/progress', async (req, res) => {
    try {
        const { userId } = req.query;
        const progress = await UserProgress.find({ userId });
        res.json(progress);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch progress' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
