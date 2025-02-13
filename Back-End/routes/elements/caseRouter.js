const express = require('express');
const router = express.Router();
const caseController = require('../../controllers/elements/caseController');
const verifyToken = require('../../middlewares/verifyToken');

// Create a new case
router.post('/add-case', verifyToken, caseController.createCase);

// Get all cases
router.get('/all-cases', verifyToken, caseController.getAllCases);

// Get an case by ID
router.get('/case/:id', verifyToken, caseController.getCaseById);

// Get an case by Branch
router.get('/casesByBranch/:branch', verifyToken, caseController.getCasesByBranch);

// Get Cases Count
router.get('/count-cases', verifyToken, caseController.getCaseCount);

router.get('/count-cases/:branch', caseController.getCaseCountByBranch);
// Update an case by ID
router.put('/case/:id', verifyToken, caseController.updateCase);

// Delete an case by ID
router.delete('/case/:id', verifyToken, caseController.deleteCase);

module.exports = router;
