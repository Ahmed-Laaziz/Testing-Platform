const Contract = require('../../models/elements/contract'); // Import the Contract model

// Create an contract (POST /contracts)
exports.createContract = async (req, res) => {
    try {
        const newContract = new Contract(req.body);
        const savedContract = await newContract.save();
        res.status(201).json(savedContract);
    } catch (error) {
        console.error('Error creating contract:', error);
        res.status(500).json({ error: 'Failed to create contract' });
    }
};

// Get all contracts (GET /contracts)
exports.getAllContracts = async (req, res) => {
    try {
        const contracts = await Contract.find();
        res.status(200).json(contracts);
    } catch (error) {
        console.error('Error retrieving contracts:', error);
        res.status(500).json({ error: 'Failed to retrieve contracts' });
    }
};

// Get contract by ID (GET /contracts/:id)
exports.getContractById = async (req, res) => {
    try {
        const contract = await Contract.findById(req.params.id);
        if (!contract) {
            return res.status(404).json({ error: 'Contract not found' });
        }
        res.status(200).json(contract);
    } catch (error) {
        console.error('Error retrieving contract:', error);
        res.status(500).json({ error: 'Failed to retrieve contract' });
    }
};

exports.getContractsByBranch = async (req, res) => {
    try {
        const { branch } = req.params;
        const contracts = await Contract.find({ branch });

        if (contracts.length === 0) {
            return res.status(404).json({ error: 'No contracts found for this branch' });
        }

        res.status(200).json(contracts);
    } catch (error) {
        console.error('Error retrieving contracts by branch:', error);
        res.status(500).json({ error: 'Failed to retrieve contracts by branch' });
    }
};

// Update contract by ID (PUT /contracts/:id)
exports.updateContract = async (req, res) => {
    try {
        const updatedContract = await Contract.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedContract) {
            return res.status(404).json({ error: 'Contract not found' });
        }
        res.status(200).json(updatedContract);
    } catch (error) {
        console.error('Error updating contract:', error);
        res.status(500).json({ error: 'Failed to update contract' });
    }
};

// Delete contract by ID (DELETE /contracts/:id)
exports.deleteContract = async (req, res) => {
    try {
        const deletedContract = await Contract.findByIdAndDelete(req.params.id);
        if (!deletedContract) {
            return res.status(404).json({ error: 'Contract not found' });
        }
        res.status(200).json({ message: 'Contract deleted successfully' });
    } catch (error) {
        console.error('Error deleting contract:', error);
        res.status(500).json({ error: 'Failed to delete contract' });
    }
};

// Get count of all contracts (GET /contracts/count)
exports.getContractCount = async (req, res) => {
    try {
        const contractCount = await Contract.countDocuments(); // Get the count of all contracts
        res.status(200).json({ count: contractCount });
    } catch (error) {
        console.error('Error retrieving contract count:', error);
        res.status(500).json({ error: 'Failed to retrieve contract count' });
    }
};

// Get count of contracts by branch (GET /contracts/count/:branch)
exports.getContractCountByBranch = async (req, res) => {
    try {
        const { branch } = req.params; // Extract branch from URL params

        if (!branch) {
            return res.status(400).json({ error: "Branch parameter is required" });
        }

        const contractCount = await Contract.countDocuments({ branch }); // Count contracts for the given branch
        res.status(200).json({ branch, count: contractCount });
    } catch (error) {
        console.error('Error retrieving contract count by branch:', error);
        res.status(500).json({ error: 'Failed to retrieve contract count' });
    }
};

