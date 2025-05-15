const mongoose = require('mongoose');

const wordSchema = new mongoose.Schema({
    category:   { type: String, required: true },
    word_uk:    { type: String, required: true },
    word_ru:    { type: String, required: true },
    word_es:    { type: String, required: true },
    translation:{ type: String, required: true },  // англ.
    example:    { type: String, required: true },
    guessed:    { type: Boolean, default: false }
});

module.exports = mongoose.model('Word', wordSchema);
