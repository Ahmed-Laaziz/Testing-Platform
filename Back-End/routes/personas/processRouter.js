const express = require('express');
const router = express.Router();
const processController = require('../../controllers/personas/processController');
const verifyToken = require('../../middlewares/verifyToken');

router.get('/all-processes', verifyToken , processController.getAllProcesses);
router.post('/add-process', verifyToken , processController.createProcess);
router.delete('/process/:id', verifyToken , processController.deleteProcess);

// Get a process by ID
router.get('/process/:id', verifyToken, processController.getProcessById);

// Update a process by ID
router.put('/process/:id', verifyToken, processController.updateProcessById);

module.exports = router;
