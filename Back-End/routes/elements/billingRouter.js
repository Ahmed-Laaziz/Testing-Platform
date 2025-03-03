const express = require('express');
const router = express.Router();
const billingController = require('../../controllers/elements/billingController');
const verifyToken = require('../../middlewares/verifyToken');

// Create a new billing
router.post('/add-billing', verifyToken, billingController.createBilling);

// Get all billings
router.get('/all-billings', verifyToken, billingController.getAllBilling);

// Get an billing by ID
router.get('/billing/:id', verifyToken, billingController.getBillingById);

// Get an ci by Branch
router.get('/billingsByBranch/:branch', verifyToken, billingController.getBillingsByBranch);

// Get Billings Count
router.get('/count-billings', verifyToken, billingController.getBillingCount);

router.get('/count-billings/:branch', billingController.getBillingCountByBranch);
// Update an billing by ID
router.put('/billing/:id', verifyToken, billingController.updateBilling);

// Delete an billing by ID
router.delete('/billing/:id', verifyToken, billingController.deleteBilling);

module.exports = router;
