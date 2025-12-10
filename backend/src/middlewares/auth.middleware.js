const jwt = require('jsonwebtoken');
const response = require('../utils/response');

const JWT_SECRET = process.env.JWT_SECRET || 'secret_key';

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  
  if (!authHeader) {
    return response.error(res, 401, 'Access denied. No token provided.');
  }
  
  const token = authHeader.split(' ')[1];

  if (!token) {
    return response.error(res, 401, 'Invalid token format.');
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; 
    next();
  } catch (err) {
    return response.error(res, 403, 'Invalid or expired token.');
  }
};

module.exports = verifyToken;