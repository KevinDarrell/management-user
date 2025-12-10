const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employee.controller');
const verifyToken = require('../middlewares/auth.middleware');
const upload = require('../middlewares/upload.middleware');

router.use(verifyToken);

router.get('/', employeeController.findAll);
router.post('/', upload.single('photo'), employeeController.create);
router.put('/:id', upload.single('photo'), employeeController.update);
router.delete('/:id', employeeController.remove);

module.exports = router;