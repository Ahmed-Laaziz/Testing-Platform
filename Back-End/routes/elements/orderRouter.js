const express = require('express');
const router = express.Router();
const orderController = require('../../controllers/elements/orderController');
const verifyToken = require('../../middlewares/verifyToken');

// Create a new order
router.post('/add-order', verifyToken, orderController.createOrder);

// Get all orders
router.get('/all-orders', verifyToken, orderController.getAllOrders);

// Get an order by ID
router.get('/order/:id', verifyToken, orderController.getOrderById);

// Get an ci by Branch
router.get('/ordersByBranch/:id', verifyToken, orderController.getOrdersByBranch);

// Get Orders Count
router.get('/count-orders', verifyToken, orderController.getOrderCount);

router.get('/count-orders/:branch', orderController.getOrderCountByBranch);
// Update an order by ID
router.put('/order/:id', verifyToken, orderController.updateOrder);

// Delete an order by ID
router.delete('/order/:id', verifyToken, orderController.deleteOrder);

module.exports = router;
