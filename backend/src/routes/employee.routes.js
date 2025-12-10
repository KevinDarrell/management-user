const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employee.controller');
const { verifyToken } = require('../middlewares/auth.middleware');
const upload = require('../middlewares/upload.middleware');

router.get('/', verifyToken, employeeController.index);

router.post('/', verifyToken, upload.single('photo'), employeeController.create);
router.put('/:id', verifyToken, upload.single('photo'), employeeController.update);
router.delete('/:id', verifyToken, employeeController.destroy);

module.exports = router;