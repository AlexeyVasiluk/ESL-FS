const mongoose = require('mongoose');

// Define Schemas and Models
const wordSchema = new mongoose.Schema({
    category: String,
    word: String,
    translation: String,
    examples: [String],
});

const progressSchema = new mongoose.Schema({
    userId: String,
    wordId: mongoose.Schema.Types.ObjectId,
    status: String,
});

const Word = mongoose.model('Word', wordSchema);
const UserProgress = mongoose.model('UserProgress', progressSchema);

module.exports = { Word, UserProgress };
