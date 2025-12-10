const userService = require('../services/user.service');
const response = require('../utils/response');
const catchAsync = require('../utils/catchAsync');

const index = catchAsync(async (req, res) => {
  const users = await userService.getAllUsers();
  return response.success(res, 200, 'Users list', users);
});

const updateStatus = catchAsync(async (req, res) => {
  const result = await userService.updateUserStatus(req.params.id, req.body.isActive);
  return response.success(res, 200, 'User status updated', result);
});

module.exports = { index, updateStatus };