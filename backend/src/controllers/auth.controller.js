const authService = require('../services/auth.service');
const response = require('../utils/response');
const catchAsync = require('../utils/catchAsync');

const register = catchAsync(async (req, res) => {
  if (!req.body.username || !req.body.password) {
      return response.error(res, 400, 'Username and password required');
  }
  const user = await authService.register(req.body);
  return response.success(res, 201, 'User registered successfully', user);
});

const login = catchAsync(async (req, res) => {
  if (!req.body.username || !req.body.password) {
      return response.error(res, 400, 'Username and password required');
  }
  const result = await authService.login(req.body);
  return response.success(res, 200, 'Login successful', result);
});

module.exports = { register, login };