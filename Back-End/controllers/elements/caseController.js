const Case = require('../../models/elements/case'); // Import the Case model

// Create an case (POST /cases)
exports.createCase = async (req, res) => {
    try {
        const newCase = new Case(req.body);
        const savedCase = await newCase.save();
        res.status(201).json(savedCase);
    } catch (error) {
        console.error('Error creating case:', error);
        res.status(500).json({ error: 'Failed to create case' });
    }
};

// Get all cases (GET /cases)
exports.getAllCases = async (req, res) => {
    try {
        const cases = await Case.find();
        res.status(200).json(cases);
    } catch (error) {
        console.error('Error retrieving cases:', error);
        res.status(500).json({ error: 'Failed to retrieve cases' });
    }
};

// Get case by ID (GET /cases/:id)
exports.getCaseById = async (req, res) => {
    try {
        const selectedCase = await Case.findById(req.params.id);
        if (!selectedCase) {
            return res.status(404).json({ error: 'Case not found' });
        }
        res.status(200).json(selectedCase);
    } catch (error) {
        console.error('Error retrieving case:', error);
        res.status(500).json({ error: 'Failed to retrieve case' });
    }
};

exports.getCasesByBranch = async (req, res) => {
    try {
        const { branch } = req.params;
        const cases = await Case.find({ branch });

        if (cases.length === 0) {
            return res.status(404).json({ error: 'No cases found for this branch' });
        }

        res.status(200).json(cases);
    } catch (error) {
        console.error('Error retrieving cases by branch:', error);
        res.status(500).json({ error: 'Failed to retrieve cases by branch' });
    }
};

// Update case by ID (PUT /cases/:id)
exports.updateCase = async (req, res) => {
    try {
        const updatedCase = await Case.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCase) {
            return res.status(404).json({ error: 'Case not found' });
        }
        res.status(200).json(updatedCase);
    } catch (error) {
        console.error('Error updating case:', error);
        res.status(500).json({ error: 'Failed to update case' });
    }
};

// Delete case by ID (DELETE /cases/:id)
exports.deleteCase = async (req, res) => {
    try {
        const deletedCase = await Case.findByIdAndDelete(req.params.id);
        if (!deletedCase) {
            return res.status(404).json({ error: 'Case not found' });
        }
        res.status(200).json({ message: 'Case deleted successfully' });
    } catch (error) {
        console.error('Error deleting case:', error);
        res.status(500).json({ error: 'Failed to delete case' });
    }
};

// Get count of all cases (GET /cases/count)
exports.getCaseCount = async (req, res) => {
    try {
        const caseCount = await Case.countDocuments(); // Get the count of all cases
        res.status(200).json({ count: caseCount });
    } catch (error) {
        console.error('Error retrieving case count:', error);
        res.status(500).json({ error: 'Failed to retrieve case count' });
    }
};

// Get count of cases by branch (GET /cases/count/:branch)
exports.getCaseCountByBranch = async (req, res) => {
    try {
        const { branch } = req.params; // Extract branch from URL params

        if (!branch) {
            return res.status(400).json({ error: "Branch parameter is required" });
        }

        const caseCount = await Case.countDocuments({ branch }); // Count Case for the given branch
        res.status(200).json({ branch, count: caseCount });
    } catch (error) {
        console.error('Error retrieving case count by branch:', error);
        res.status(500).json({ error: 'Failed to retrieve case count' });
    }
};