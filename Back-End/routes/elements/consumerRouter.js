const express = require('express');
const router = express.Router();
const consumerController = require('../../controllers/elements/consumerController');
const verifyToken = require('../../middlewares/verifyToken');

// Create a new consumer
router.post('/add-consumer', verifyToken, consumerController.createConsumer);

// Get all consumers
router.get('/all-consumers', verifyToken, consumerController.getAllConsumer);

// Get an consumer by ID
router.get('/consumer/:id', verifyToken, consumerController.getConsumerById);

// Get an ci by Branch
router.get('/consumersByBranch/:branch', verifyToken, consumerController.getConsumersByBranch);

// Get Consumers Count
router.get('/count-consumers', verifyToken, consumerController.getConsumerCount);

router.get('/count-consumers/:branch', consumerController.getConsumerCountByBranch);
// Update an consumer by ID
router.put('/consumer/:id', verifyToken, consumerController.updateConsumer);

// Delete an consumer by ID
router.delete('/consumer/:id', verifyToken, consumerController.deleteConsumer);

module.exports = router;
