// models/UserProgress.js
const mongoose = require('mongoose');

// Схема прогресу користувача
const progressSchema = new mongoose.Schema({
    userId: String,
    wordId: mongoose.Schema.Types.ObjectId,
    status: { type: String, default: 'not_guessed' }, // "guessed" або "not_guessed"
});

module.exports = mongoose.model('UserProgress', progressSchema);