const mongoose = require('mongoose');

const wordSchema = new mongoose.Schema({
    category: { type: String, required: true },
    word: { type: String, required: true },
    translation: { type: String, required: true },
    example: { type: String },
    guessed: { type: Boolean, default: false },
});

const progressSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    wordId: { type: mongoose.Schema.Types.ObjectId, ref: 'Word', required: true },
    status: { type: String, required: true },
});

const Word = mongoose.model('Word', wordSchema);
const UserProgress = mongoose.model('UserProgress', progressSchema);

module.exports = { Word, UserProgress };
