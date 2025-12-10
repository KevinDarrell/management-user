const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');
const path = require('path');

const getAllEmployees = async () => {
  return await prisma.employee.findMany({
    orderBy: { createdAt: 'desc' }
  });
};

const createEmployee = async (data, file) => {
  let photoUrl = null;

  if (file) {
    photoUrl = `/uploads/${file.filename}`;
    }

    return await prisma.employee.create({
    data: {
        name: data.name,
        position: data.position,
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
      phone: data.phone,
      photo: photoUrl
    }
  });
};

const deleteEmployee = async (id) => {

  const employee = await prisma.employee.findUnique({ where: { id: parseInt(id) } });
  if (!employee) throw new Error('Employee not found');

  
  if (employee.photo) {
    const oldPath = path.join(__dirname, '../../public', employee.photo);
    if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
  }

  
  return await prisma.employee.delete({
    where: { id: parseInt(id) }
  });
};


module.exports = { 
  getAllEmployees, 
  createEmployee, 
  updateEmployee, 
  deleteEmployee 
};
