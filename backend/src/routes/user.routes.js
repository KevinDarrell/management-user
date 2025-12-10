const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { verifyToken } = require('../middlewares/auth.middleware');
const response = require('../utils/response');

router.get('/', verifyToken, async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, username: true, email: true, createdAt: true } 
    });
    return response.success(res, 200, 'List of users', users);
  } catch (err) {
    return response.error(res, 500, err.message);
  }
});

module.exports = router;