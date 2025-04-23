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
const allowedOrigin = 'https://www.esl-club.com';

app.use(cors({
    origin: allowedOrigin,
    credentials: true // 👈 обов’язково для cookies!
}));
app.use(express.json());
app.use(cookieParser());

// Підключення до MongoDB
// mongoose.connect(process.env.MONGODB_URI)
//     .then(() => console.log('Connected to MongoDB'))
//     .catch((error) => console.error('MongoDB connection error:', error));

mongoose.connect(process.env.MONGODB_URI, {
    dbName: 'eslDatabase',
    useNewUrlParser: true,
    useUnifiedTopology: true
})
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
app.get('/vocabulary.html', (req, res) => {
    res.redirect('/login.html');
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

// Захищений маршрут для отримання прогресу користувача
app.get('/api/progress', auth, async (req, res) => {
    try {
        // Використовуємо req.user.id, встановлений auth middleware
        const progress = await UserProgress.find({ userId: req.user.id });
        res.json(progress);
    } catch (error) {
        console.error('Error fetching progress:', error);
        res.status(500).json({ error: 'Failed to fetch progress' });
    }
});

app.get('/api/category-stats', auth, async (req, res) => {
    try {
        // Оскільки userId зберігається як рядок, використовуйте його без перетворення:
        const userId = req.user.id; // Рядок

        const stats = await Word.aggregate([
            {
                $lookup: {
                    from: "userprogresses", // використовується правильна назва колекції
                    let: { wordId: "$_id" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ["$wordId", "$$wordId"] },
                                        { $eq: ["$userId", userId] }  // порівнюємо як рядки
                                    ]
                                },
                                status: "guessed" // фільтруємо лише записи, де статус рівний "guessed"
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
                            { $gt: [ { $size: "$userProgress" }, 0 ] },
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


// Додаємо auth middleware до маршруту, щоб перевірити токен і встановити req.user
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
        console.log('Updated progress record:', updatedProgress);  // Додано логування
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

// Захищений маршрут для очищення прогресу користувача (видалення записів)
app.patch('/api/clear-progress', auth, async (req, res) => {
    try {
        console.log("Clear progress route hit. User ID:", req.user.id);
        // Видаляємо всі записи для поточного користувача, де статус "guessed"
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
