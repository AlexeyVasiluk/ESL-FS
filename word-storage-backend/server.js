// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Імпортуємо cookie-parser
const cookieParser = require('cookie-parser');

// Імпортуємо моделі
const Word = require('./models/Word');
const UserProgress = require('./models/UserProgress');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Підключення до MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/wordStorage')
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('MongoDB connection error:', error));

// Підключаємо маршрути авторизації
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Приклад захищеного маршруту
const auth = require('./middleware/auth');
// Protected route for vocabulary.html
app.get('/vocabulary', auth, (req, res) => {
    res.sendFile(path.join(__dirname, 'private', 'vocabulary.html'));
});

// API ендпоінти (наприклад, отримання слів)
app.get('/api/words', async (req, res) => {
    try {
        const { category } = req.query;
        const query = { guessed: false };
        if (category) {
            query.category = category;
        }
        const words = await Word.find(query);
        res.json(words);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch words' });
    }
});

app.get('/vocabulary.html', (req, res) => {
    res.redirect('/login.html');
});

app.get('/vocabulary', (req, res) => {
    res.redirect('/login.html');
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

// Забороняємо прямий доступ до vocabulary.html
app.use((req, res, next) => {
    if (req.path === '/vocabulary.html') {
        return res.status(401).send('Unauthorized');
    }
    next();
});

// Захищений маршрут для перевірки авторизації
app.get('/api/protected', auth, (req, res) => {
    res.json({ msg: "Authorized", user: req.user });
});

// Обслуговування статичних файлів для фронтенду
app.use('/', express.static(path.join(__dirname, 'frontend')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
