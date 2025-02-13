const Ci = require('../../models/elements/ci'); // Import the Ci model

// Create an ci (POST /cis)
exports.createCi = async (req, res) => {
    try {
        const newCi = new Ci(req.body);
        const savedCi = await newCi.save();
        res.status(201).json(savedCi);
    } catch (error) {
        console.error('Error creating ci:', error);
        res.status(500).json({ error: 'Failed to create ci' });
    }
};

// Get all cis (GET /cis)
exports.getAllCis = async (req, res) => {
    try {
        const cis = await Ci.find();
        res.status(200).json(cis);
    } catch (error) {
        console.error('Error retrieving cis:', error);
        res.status(500).json({ error: 'Failed to retrieve cis' });
    }
};

// Get ci by ID (GET /cis/:id)
exports.getCiById = async (req, res) => {
    try {
        const ci = await Ci.findById(req.params.id);
        if (!ci) {
            return res.status(404).json({ error: 'Ci not found' });
        }
        res.status(200).json(ci);
    } catch (error) {
        console.error('Error retrieving ci:', error);
        res.status(500).json({ error: 'Failed to retrieve ci' });
    }
};

exports.getCisByBranch = async (req, res) => {
    try {
        const { branch } = req.params;
        const cis = await Ci.find({ branch });

        if (cis.length === 0) {
            return res.status(404).json({ error: 'No cis found for this branch' });
        }

        res.status(200).json(cis);
    } catch (error) {
        console.error('Error retrieving cis by branch:', error);
        res.status(500).json({ error: 'Failed to retrieve cis by branch' });
    }
};

// Update ci by ID (PUT /cis/:id)
exports.updateCi = async (req, res) => {
    try {
        const updatedCi = await Ci.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCi) {
            return res.status(404).json({ error: 'Ci not found' });
        }
        res.status(200).json(updatedCi);
    } catch (error) {
        console.error('Error updating ci:', error);
        res.status(500).json({ error: 'Failed to update ci' });
    }
};

// Delete ci by ID (DELETE /cis/:id)
exports.deleteCi = async (req, res) => {
    try {
        const deletedCi = await Ci.findByIdAndDelete(req.params.id);
        if (!deletedCi) {
            return res.status(404).json({ error: 'Ci not found' });
        }
        res.status(200).json({ message: 'Ci deleted successfully' });
    } catch (error) {
        console.error('Error deleting ci:', error);
        res.status(500).json({ error: 'Failed to delete ci' });
    }
};

// Get count of all cis (GET /cis/count)
exports.getCiCount = async (req, res) => {
    try {
        const ciCount = await Ci.countDocuments(); // Get the count of all cis
        res.status(200).json({ count: ciCount });
    } catch (error) {
        console.error('Error retrieving ci count:', error);
        res.status(500).json({ error: 'Failed to retrieve ci count' });
    }
};

// Get count of cis by branch (GET /cis/count/:branch)
exports.getCiCountByBranch = async (req, res) => {
    try {
        const { branch } = req.params; // Extract branch from URL params

        if (!branch) {
            return res.status(400).json({ error: "Branch parameter is required" });
        }

        const ciCount = await Ci.countDocuments({ branch }); // Count cis for the given branch
        res.status(200).json({ branch, count: ciCount });
    } catch (error) {
        console.error('Error retrieving ci count by branch:', error);
        res.status(500).json({ error: 'Failed to retrieve ci count' });
    }
};