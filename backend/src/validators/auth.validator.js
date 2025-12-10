const response = require('../utils/response');

const validateRegister = (req, res, next) => {
  const { username, email, password } = req.body;
  const errors = [];

  if (!username) errors.push('Username is required');
  if (!email) errors.push('Email is required');
  if (!password) errors.push('Password is required');
  if (password && password.length < 6) errors.push('Password must be at least 6 characters');

  if (errors.length > 0) {
    return response.error(res, 400, 'Validation failed', errors);
  }
  
  next(); 
};

const validateLogin = (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return response.error(res, 400, 'Username and password are required');
  }
  next();
};

module.exports = { validateRegister, validateLogin };