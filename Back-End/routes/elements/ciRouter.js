const express = require('express');
const router = express.Router();
const ciController = require('../../controllers/elements/ciController');
const verifyToken = require('../../middlewares/verifyToken');

// Create a new ci
router.post('/add-ci', verifyToken, ciController.createCi);

// Get all cis
router.get('/all-cis', verifyToken, ciController.getAllCis);

// Get an ci by ID
router.get('/ci/:id', verifyToken, ciController.getCiById);

// Get Cis Count
router.get('/count-cis', verifyToken, ciController.getCiCount);
// Update an ci by ID
router.put('/ci/:id', verifyToken, ciController.updateCi);

// Delete an ci by ID
router.delete('/ci/:id', verifyToken, ciController.deleteCi);

module.exports = router;