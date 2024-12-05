const mongoose = require('mongoose');

// Схема для слів
const wordSchema = new mongoose.Schema({
    category: { type: String, required: true },
    word: { type: String, required: true },
    translation: { type: String, required: true },
    example: { type: String }, // Поле зберігає один приклад як рядок
    guessed: { type: Boolean, default: false }, // Значення за замовчуванням
});

// Схема для прогресу користувача
const progressSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    wordId: { type: mongoose.Schema.Types.ObjectId, ref: 'Word', required: true },
    status: { type: String, required: true }, // Можливі значення: guessed, not_guessed
});

const Word = mongoose.model('Word', wordSchema);
const UserProgress = mongoose.model('UserProgress', progressSchema);

module.exports = { Word, UserProgress };
