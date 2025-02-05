// models/Word.js
const mongoose = require('mongoose');

const wordSchema = new mongoose.Schema({
    category: { type: String, required: true },
    word: { type: String, required: true },
    translation: { type: String, required: true },
    example: { type: [String], default: [] }, // або якщо потрібен рядок: { type: String }
    guessed: { type: Boolean, default: false }
});

module.exports = mongoose.model('Word', wordSchema);