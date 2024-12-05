const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path'); // Для роботи зі шляхами

// Схема слова
const wordSchema = new mongoose.Schema({
    category: String,
    word: String,
    translation: String,
    example: { type: [String], default: [] }, // Поле `example` як масив рядків
    guessed: { type: Boolean, default: false }
});

const Word = mongoose.model('Word', wordSchema);

// Схема прогресу користувача
const progressSchema = new mongoose.Schema({
    userId: String,
    wordId: mongoose.Schema.Types.ObjectId,
    status: { type: String, default: 'not_guessed' }, // "guessed" або "not_guessed"
});

const UserProgress = mongoose.model('UserProgress', progressSchema);


const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/wordStorage')
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('MongoDB connection error:', error));

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
        const query = { guessed: false }; // Фільтруємо слова з guessed: false
        if (category) {
            query.category = category; // Додаємо категорію, якщо вона вказана
        }
        const words = await Word.find(query); // Застосовуємо фільтр
        res.json(words);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch words' });
    }
});

// Отримання прогресу користувача
app.get('/api/progress', async (req, res) => {
    const { userId } = req.query;
    if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
    }
    try {
        const progress = await UserProgress.find({ userId });
        res.json(progress);
    } catch (error) {
        console.error('Error fetching progress:', error);
        res.status(500).json({ error: 'Failed to fetch progress' });
    }
});

app.get('/api/category-stats', async (req, res) => {
    try {
        const stats = await Word.aggregate([
            {
                $group: {
                    _id: "$category",
                    total: { $sum: 1 },
                    guessed: { $sum: { $cond: ["$guessed", 1, 0] } }
                }
            }
        ]);
        res.json(stats);
    } catch (error) {
        console.error('Error fetching category stats:', error);
        res.status(500).json({ error: 'Failed to fetch category stats' });
    }
});

// Оновлення прогресу користувача
app.post('/api/progress', async (req, res) => {
    const { userId, wordId, status } = req.body;
    if (!userId || !wordId) {
        return res.status(400).json({ error: 'User ID and Word ID are required' });
    }
    try {
        const updatedProgress = await UserProgress.findOneAndUpdate(
            { userId, wordId },
            { status },
            { upsert: true, new: true }
        );
        res.json(updatedProgress);
    } catch (error) {
        console.error('Error updating progress:', error);
        res.status(500).json({ error: 'Failed to update progress' });
    }
});


// Оновлення статусу слова
app.patch('/api/words/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { guessed } = req.body;

        const updatedWord = await Word.findByIdAndUpdate(
            id,
            { guessed },
            { new: true }
        );

        if (!updatedWord) {
            return res.status(404).json({ error: 'Word not found' });
        }

        res.json(updatedWord);
    } catch (error) {
        console.error('Error updating word:', error);
        res.status(500).json({ error: 'Failed to update word' });
    }
});

// Оновлення всіх слів: guessed = false
app.patch('/api/clear-guessed', async (req, res) => {
    try {
        const result = await Word.updateMany({ guessed: true }, { $set: { guessed: false } });
        res.json({ message: 'All guessed words have been reset to false', modifiedCount: result.modifiedCount });
    } catch (error) {
        console.error('Error resetting guessed words:', error);
        res.status(500).json({ error: 'Failed to reset guessed words' });
    }
});


// Serve static files from the "frontend" directory
app.use(express.static(path.join(__dirname, 'frontend')));

// Catch-all route to serve the frontend's index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
