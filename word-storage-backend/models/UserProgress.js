const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
    userId: String,
    wordId: mongoose.Schema.Types.ObjectId,
    status: { type: String, default: 'not_guessed' },
});

module.exports = mongoose.model('UserProgress', progressSchema);