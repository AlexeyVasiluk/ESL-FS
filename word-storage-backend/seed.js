const mongoose = require('mongoose');
const { Word } = require('./models'); // Імпорт моделі Word

mongoose.connect('mongodb://localhost:27017/wordStorage');

const words = [
    { category: 'verbs', word: 'run', translation: 'бігти', examples: ['I run every morning.'] },
    { category: 'nouns', word: 'apple', translation: 'яблуко', examples: ['She ate an apple.'] },
];

Word.insertMany(words)
    .then(() => {
        console.log('Words inserted');
        mongoose.connection.close();
    })
    .catch((error) => {
        console.error('Error inserting words:', error);
        mongoose.connection.close();
    });
