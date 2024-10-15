const Account = require('../../models/elements/account'); // Import the Account model

// Create an account (POST /accounts)
exports.createAccount = async (req, res) => {
    try {
        const newAccount = new Account(req.body);
        const savedAccount = await newAccount.save();
        res.status(201).json(savedAccount);
    } catch (error) {
        console.error('Error creating account:', error);
        res.status(500).json({ error: 'Failed to create account' });
    }
};

// Get all accounts (GET /accounts)
exports.getAllAccounts = async (req, res) => {
    try {
        const accounts = await Account.find();
        res.status(200).json(accounts);
    } catch (error) {
        console.error('Error retrieving accounts:', error);
        res.status(500).json({ error: 'Failed to retrieve accounts' });
    }
};

// Get account by ID (GET /accounts/:id)
exports.getAccountById = async (req, res) => {
    try {
        const account = await Account.findById(req.params.id);
        if (!account) {
            return res.status(404).json({ error: 'Account not found' });
        }
        res.status(200).json(account);
    } catch (error) {
        console.error('Error retrieving account:', error);
        res.status(500).json({ error: 'Failed to retrieve account' });
    }
};

// Update account by ID (PUT /accounts/:id)
exports.updateAccount = async (req, res) => {
    try {
        const updatedAccount = await Account.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedAccount) {
            return res.status(404).json({ error: 'Account not found' });
        }
        res.status(200).json(updatedAccount);
    } catch (error) {
        console.error('Error updating account:', error);
        res.status(500).json({ error: 'Failed to update account' });
    }
};

// Delete account by ID (DELETE /accounts/:id)
exports.deleteAccount = async (req, res) => {
    try {
        const deletedAccount = await Account.findByIdAndDelete(req.params.id);
        if (!deletedAccount) {
            return res.status(404).json({ error: 'Account not found' });
        }
        res.status(200).json({ message: 'Account deleted successfully' });
    } catch (error) {
        console.error('Error deleting account:', error);
        res.status(500).json({ error: 'Failed to delete account' });
    }
};

// Get count of all accounts (GET /accounts/count)
exports.getAccountCount = async (req, res) => {
    try {
        const accountCount = await Account.countDocuments(); // Get the count of all accounts
        res.status(200).json({ count: accountCount });
    } catch (error) {
        console.error('Error retrieving account count:', error);
        res.status(500).json({ error: 'Failed to retrieve account count' });
    }
};
