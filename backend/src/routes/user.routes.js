const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { verifyToken } = require('../middlewares/auth.middleware');
const response = require('../utils/response');

router.patch('/:id/status', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { isActive } = req.body; 

    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: { isActive: isActive }
    });

    return response.success(res, 200, 'User status updated', updatedUser);
  } catch (err) {
    return response.error(res, 500, err.message);
  }
});

router.get('/', verifyToken, async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, username: true, email: true, createdAt: true, isActive: true } 
    });
    return response.success(res, 200, 'List of users', users);
  } catch (err) {
    return response.error(res, 500, err.message);
  }
});

module.exports = router;