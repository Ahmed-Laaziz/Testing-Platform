const express = require('express');
const router = express.Router();
const subFunctionalityController = require('../../controllers/personas/subFunctionalityController');
const verifyToken = require('../../middlewares/verifyToken');

router.get('/all-subFuntionalities', verifyToken , subFunctionalityController.getAllSubFunctionalities);
router.post('/add-subFunctionality', verifyToken , subFunctionalityController.createSubFunctionality);
router.patch('/subFunctionality/:id/permissions', verifyToken , subFunctionalityController.updatePermissions);

module.exports = router;
