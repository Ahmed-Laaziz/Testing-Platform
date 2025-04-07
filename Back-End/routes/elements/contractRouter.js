const express = require('express');
const router = express.Router();
const contractController = require('../../controllers/elements/contractController');
const verifyToken = require('../../middlewares/verifyToken');

// Create a new contract
router.post('/add-contract', verifyToken, contractController.createContract);

// Get all contracts
router.get('/all-contracts', verifyToken, contractController.getAllContracts);

// Get an contract by ID
router.get('/contract/:id', verifyToken, contractController.getContractById);

// Get an contract by branch
router.get('/contractsByBranch/:branch', verifyToken, contractController.getContractsByBranch);

// Get Contracts Count
router.get('/count-contracts', verifyToken, contractController.getContractCount);

router.get('/count-contracts/:branch', contractController.getContractCountByBranch);
// Update an contract by ID
router.put('/contract/:id', verifyToken, contractController.updateContract);

// Delete an contract by ID
router.delete('/contract/:id', verifyToken, contractController.deleteContract);

module.exports = router;
