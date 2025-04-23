// routes/auth.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');  // переконайтеся, що модель User створена та експортується

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

// Реєстрація користувача
router.post(
    '/register',
    [
        check('username', 'Username is required').notEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password must be at least 6 characters').isLength({ min: 6 })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }
        const { username, email, password } = req.body;
        try {
            // Перевірка, чи існує користувач з таким email
            let user = await User.findOne({ email });
            if (user) {
                return res.status(400).json({ error: 'User already exists' });
            }
            // Створюємо користувача
            user = new User({ username, email, password });
            await user.save();

            const payload = { user: { id: user._id } };

            jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
                if (err) throw err;
                // Встановлюємо куку з токеном
                res.cookie('token', token, {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'None',
                    domain: 'esl-club.com', // 👈 встановити вручну!
                    path: '/',
                    maxAge: 3600000
                });
                res.json({ token });
            });
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);

// Логін користувача
router.post(
    '/login',
    [
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password is required').exists()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body;
        try {
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ error: 'Invalid credentials' });
            }
            const isMatch = await user.comparePassword(password);
            if (!isMatch) {
                return res.status(400).json({ error: 'Invalid credentials' });
            }

            const payload = { user: { id: user._id } };
            jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
                if (err) throw err;
                // Встановлюємо токен у cookie
                res.cookie('token', token, {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'None',
                    domain: 'esl-club.com', // 👈 встановити вручну!
                    path: '/',
                    maxAge: 3600000
                });
                res.json({ token });
            });
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);

router.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.json({ msg: 'Logged out successfully' });
});

module.exports = router;
