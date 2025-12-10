const employeeService = require('../services/employee.service');
const response = require('../utils/response');

const index = async (req, res) => {
  try {
    const result = await employeeService.getAllEmployees();
    return response.success(res, 200, 'Employees retrieved', result);
  } catch (err) {
    return response.error(res, 500, err.message);
  }
};

const create = async (req, res) => {
  try {

    const result = await employeeService.createEmployee(req.body, req.file);
    return response.success(res, 201, 'Employee created successfully', result);
  } catch (err) {
    return response.error(res, 400, err.message);
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await employeeService.updateEmployee(id, req.body, req.file);
    return response.success(res, 200, 'Employee updated successfully', result);
  } catch (err) {
    return response.error(res, 400, err.message);
  }
};

const destroy = async (req, res) => {
  try {
    const { id } = req.params;
    await employeeService.deleteEmployee(id);
    return response.success(res, 200, 'Employee deleted successfully');
  } catch (err) {
    return response.error(res, 400, err.message);
  }
};

module.exports = { index, create, update, destroy };