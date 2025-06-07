const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = function(req, res, next) {
    let token = req.header('Authorization');
    if (token && token.startsWith('Bearer ')) {
        token = token.slice(7).trim();
    }
    if (!token && req.cookies && req.cookies.token) {
        token = req.cookies.token;
    }
    if (!token) {
        return res.redirect('/login.html');
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

