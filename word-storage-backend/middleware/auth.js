// middleware/auth.js
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

module.exports = function(req, res, next) {
    // Спробуємо отримати токен з заголовка
    let token = req.header('Authorization');
    if (token && token.startsWith('Bearer ')) {
        token = token.slice(7).trim();
    }
    // Якщо токен не знайдено в заголовках, спробуємо отримати з cookie
    if (!token && req.cookies && req.cookies.token) {
        token = req.cookies.token;
    }
    if (!token) {
        return res.redirect('/login.html');
        // return res.status(401).json({ msg: 'No token, authorization denied' });
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

