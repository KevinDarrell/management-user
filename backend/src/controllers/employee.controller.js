const employeeService = require('../services/employee.service');
const response = require('../utils/response');
const catchAsync = require('../utils/catchAsync');

const findAll = catchAsync (async(req, res) => {
    const result = await employeeService.getAllEmployees();
    return response.success(res, 200, 'Employees retrieved', result);
});

const create = catchAsync (async(req, res) => {
    const result = await employeeService.createEmployee(req.body, req.file);
    return response.success(res, 201, 'Employee created successfully', result);
});

const update = catchAsync(async (req, res) => {
  const result = await employeeService.updateEmployee(req.params.id, req.body, req.file);
  return response.success(res, 200, 'Employee updated successfully', result);
});

const remove = catchAsync (async(req, res) => {
    await employeeService.deleteEmployee(req.params.id);
    return response.success(res, 200, 'Employee deleted successfully');
});

module.exports = { findAll, create, update, remove };