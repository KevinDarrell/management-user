const express = require('express');
const router = express.Router();

const authRoutes = require('./auth.routes');
const employeeRoutes = require('./employee.routes');
const userRoutes = require('./user.routes');

router.use('/auth', authRoutes);
router.use('/employees', employeeRoutes);
router.use('/users', userRoutes);

module.exports = router;