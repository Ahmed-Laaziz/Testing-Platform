const express = require('express');
const router = express.Router();
const accountController = require('../../controllers/elements/accountController');
const verifyToken = require('../../middlewares/verifyToken');

// Create a new account
router.post('/add-account', verifyToken, accountController.createAccount);

// Route for adding multiple accounts
router.post('/add-multiple-accounts',verifyToken, accountController.addMultipleAccounts);

// Get all accounts
router.get('/all-accounts', verifyToken, accountController.getAllAccounts);

// Get an account by ID
router.get('/account/:id', verifyToken, accountController.getAccountById);

// Get Accounts Count
router.get('/count-accounts', verifyToken, accountController.getAccountCount);
// Update an account by ID
router.put('/account/:id', verifyToken, accountController.updateAccount);

// Delete an account by ID
router.delete('/account/:id', verifyToken, accountController.deleteAccount);

router.delete('/delete-all-accounts',verifyToken, accountController.deleteAllAccounts);

module.exports = router;
