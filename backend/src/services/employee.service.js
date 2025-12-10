const prisma = require('../config/prisma');
const fs = require('fs');
const path = require('path');

const getAllEmployees = async () => {
  return await prisma.employee.findMany({ orderBy: { createdAt: 'desc' } });
};

const createEmployee = async (data, file) => {
  const photoUrl = file ? `/uploads/${file.filename}` : null;
  
  return await prisma.employee.create({
    data: {
      name: data.name,
      position: data.position,
      department: data.department || 'General',
      phone: data.phone,
      photo: photoUrl
    }
  });
};

const updateEmployee = async (id, data, file) => {
  const employee = await prisma.employee.findUnique({ where: { id: parseInt(id) } });
  if (!employee) throw new Error('Employee not found');

  let photoUrl = employee.photo;
  
  if (file) {
    if (employee.photo) {
      const oldPath = path.join(__dirname, '../../public', employee.photo);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }
    photoUrl = `/uploads/${file.filename}`;
  }

  return await prisma.employee.update({
    where: { id: parseInt(id) },
    data: {
      name: data.name,
      position: data.position,
      department: data.department,
      phone: data.phone,
      photo: photoUrl
    }
  });
};

const deleteEmployee = async (id) => {
  const employee = await prisma.employee.findUnique({ where: { id: parseInt(id) } });
  if (!employee) throw new Error('Employee not found');

  if (employee.photo) {
    const filePath = path.join(__dirname, '../../public', employee.photo);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  }

  return await prisma.employee.delete({ where: { id: parseInt(id) } });
};

const updateStatus = async (id, isActive) => {
  const employee = await prisma.employee.findUnique({ where: { id: parseInt(id) } });
  if (!employee) throw new Error('Employee not found');

  return await prisma.employee.update({
    where: { id: parseInt(id) },
    data: { isActive }
  });
};

module.exports = { getAllEmployees, createEmployee, updateEmployee, deleteEmployee, updateStatus };