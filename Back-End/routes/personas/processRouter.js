const express = require('express');
const router = express.Router();
const processController = require('../../controllers/personas/processController');
const verifyToken = require('../../middlewares/verifyToken');

router.get('/all-processes', verifyToken , processController.getAllProcesses);
router.post('/add-process', verifyToken , processController.createProcess);
router.delete('/process/:id', verifyToken , processController.deleteProcess);

module.exports = router;
