const express = require('express');
const router = express.Router();
const functionalityController = require('../../controllers/personas/functionalityController');
const verifyToken = require('../../middlewares/verifyToken');

router.get('/all-functionalities', verifyToken , functionalityController.getAllFunctionalities);
router.post('/add-functionality', verifyToken , functionalityController.createFunctionality);
router.delete('/functionality/:id', verifyToken , functionalityController.deleteFunctionality);

module.exports = router;
