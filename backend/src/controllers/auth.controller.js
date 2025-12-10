const authService = require('../services/auth.service');
const response = require('../utils/response');

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    if (!username || !email || !password) {
      return response.error(res, 400, 'All fields are required');
    }

    const result = await authService.register(username, email, password);
    return response.success(res, 201, 'User registered successfully', result);
  } catch (err) {
   
    return response.error(res, 400, err.message);
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return response.error(res, 400, 'Username and password are required');
    }

    const result = await authService.login(username, password);
    return response.success(res, 200, 'Login successful', result);
  } catch (err) {
    return response.error(res, 401, err.message);
  }
};

module.exports = { register, login };