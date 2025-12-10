const jwt = require('jsonwebtoken');
const response = require('../utils/response');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return response.error(res, 401, 'Access token is missing');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return response.error(res, 403, 'Invalid or expired token');
    }
};

module.exports = { verifyToken };