const response = require('../utils/response');

const validateEmployee = (req, res, next) => {
  const { name, position, department, phone } = req.body;
  const errors = [];

  if (!name) errors.push('Name is required');
  if (!position) errors.push('Position is required');
  if (!department) errors.push('Department is required');
  
  if (phone && !/^[0-9+ -]+$/.test(phone)) errors.push('Invalid phone number format');

  if (errors.length > 0) {
    return response.error(res, 400, 'Validation failed', errors);
  }

  next();
};

module.exports = { validateEmployee };