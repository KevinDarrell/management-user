const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employee.controller');
const verifyToken = require('../middlewares/auth.middleware');
const upload = require('../middlewares/upload.middleware');
const { validateEmployee } = require('../validators/employee.validator');

router.use(verifyToken);

router.get('/', employeeController.findAll);
router.post('/', upload.single('photo'), validateEmployee, employeeController.create);
router.put('/:id', upload.single('photo'), validateEmployee, employeeController.update);
router.patch('/:id/status', employeeController.updateStatus);
router.delete('/:id', employeeController.remove);

module.exports = router;