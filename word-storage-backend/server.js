const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();
import fetch from 'node-fetch';

const cookieParser = require('cookie-parser');

const Word = require('./models/Word');
const UserProgress = require('./models/UserProgress');

const app = express();
const PORT = process.env.PORT || 5000;
const PIXABAY_API_KEY = process.env.PIXABAY_API_KEY;

// ===== Middleware =====
app.use(express.json());
app.use(cookieParser());

// ===== MongoDB Connection =====
mongoose.connect(process.env.MONGODB_URI, {
    dbName: 'eslDatabase'
})
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('MongoDB connection error:', error));

// ===== Auth Routes =====
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// ===== Auth Middleware =====
const auth = require('./middleware/auth');

// ===== Protected HTML =====
app.get(['/vocabulary', '/vocabulary.html'], auth, (req, res) => {
    res.sendFile(path.join(__dirname, 'private', 'vocabulary.html'));
});

// ===== API: Words =====
app.get('/api/words', auth, async (req, res) => {
    try {
        const { category, lang = 'uk' } = req.query;
        if (!['uk','ru','es'].includes(lang)) {
            return res.status(400).json({ error: 'Invalid lang' });
        }
        const query = { ...(category && { category }) };
        const docs = await Word.find(query);
        const localized = docs.map(w => ({
            _id: w._id,
            word: w[`word_${lang}`],    // отримаємо word_uk | word_ru | word_es
            translation: w.translation,
            example:     w.example,
            guessed:     w.guessed
        }));
        res.json(localized);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

app.get('/api/image', async (req, res) => {
    const { word } = req.query;
    if (!word) {
        return res.status(400).json({ error: 'Missing ?word=...' });
    }
    try {
        const pixabayUrl = `https://pixabay.com/api/?key=${PIXABAY_API_KEY}`
            + `&q=${encodeURIComponent(word)}`
            + `&image_type=photo&per_page=3`;

        const pixRes = await fetch(pixabayUrl);
        if (!pixRes.ok) {
            console.error('Pixabay error', pixRes.status);
            return res.status(502).json({ error: 'Error from Pixabay API' });
        }

        const data = await pixRes.json();
        res.json(data);
    } catch (err) {
        console.error('Fetch failed', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// ===== API: Progress =====
app.get('/api/progress', auth, async (req, res) => {
    try {
        const progress = await UserProgress.find({ userId: req.user.id });
        res.json(progress);
    } catch (error) {
        console.error('Error fetching progress:', error);
        res.status(500).json({ error: 'Failed to fetch progress' });
    }
});

app.get('/api/category-stats', auth, async (req, res) => {
    try {
        const userId = req.user.id;
        const stats = await Word.aggregate([
            {
                $lookup: {
                    from: "userprogresses",
                    let: { wordId: "$_id" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ["$wordId", "$$wordId"] },
                                        { $eq: ["$userId", userId] }
                                    ]
                                },
                                status: "guessed"
                            }
                        }
                    ],
                    as: "userProgress"
                }
            },
            {
                $addFields: {
                    guessedByUser: {
                        $cond: [
                            { $gt: [{ $size: "$userProgress" }, 0] },
                            1,
                            0
                        ]
                    }
                }
            },
            {
                $group: {
                    _id: "$category",
                    total: { $sum: 1 },
                    guessed: { $sum: "$guessedByUser" }
                }
            }
        ]);

        console.log("Category stats:", stats);
        res.json(stats);
    } catch (error) {
        console.error('Error fetching category stats:', error);
        res.status(500).json({ error: 'Failed to fetch category stats' });
    }
});

// POST: update progress
app.post('/api/progress', auth, async (req, res) => {
    const { wordId, status } = req.body;
    if (!wordId) {
        return res.status(400).json({ error: 'Word ID is required' });
    }
    try {
        const updatedProgress = await UserProgress.findOneAndUpdate(
            { userId: req.user.id, wordId },
            { status },
            { upsert: true, new: true }
        );
        console.log('Updated progress record:', updatedProgress);
        res.json(updatedProgress);
    } catch (error) {
        console.error('Error updating progress:', error);
        res.status(500).json({ error: 'Failed to update progress' });
    }
});

// PATCH: update word status
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

// PATCH: clear progress
app.patch('/api/clear-progress', auth, async (req, res) => {
    try {
        console.log("Clear progress route hit. User ID:", req.user.id);
        const result = await UserProgress.deleteMany({
            userId: req.user.id,
            status: "guessed"
        });
        console.log("Clear progress result:", result);
        res.json({ message: 'Your progress has been cleared', deletedCount: result.deletedCount });
    } catch (error) {
        console.error('Error clearing user progress:', error);
        res.status(500).json({ error: 'Failed to clear user progress' });
    }
});

// Забороняємо прямий доступ до vocabulary.html
app.use((req, res, next) => {
    if (req.path === '/vocabulary.html') {
        return res.status(401).send('Unauthorized');
    }
    next();
});

// Protected check
app.get('/api/protected', auth, (req, res) => {
    res.json({ msg: "Authorized", user: req.user });
});

// ===== FRONTEND STATIC FILES =====
app.use('/', express.static(path.join(__dirname, 'frontend')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

// ===== START SERVER =====
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
