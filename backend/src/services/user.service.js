const prisma = require('../config/prisma');

const getAllUsers = async () => {
  return await prisma.user.findMany({
    select: { id: true, username: true, email: true, isActive: true, createdAt: true },
    orderBy: { createdAt: 'desc' }
  });
};

const updateUserStatus = async (id, isActive) => {
  const user = await prisma.user.findUnique({ where: { id: parseInt(id) } });
  if (!user) throw new Error('User not found');

  return await prisma.user.update({
    where: { id: parseInt(id) },
    data: { isActive }
  });
};

module.exports = { getAllUsers, updateUserStatus };