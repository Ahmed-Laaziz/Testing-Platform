const Billing = require('../../models/elements/billing'); // Import the Billing model

// Create an billing (POST /Billing)
exports.createBilling = async (req, res) => {
    try {
        const newBilling = new Billing(req.body);
        const savedBilling = await newBilling.save();
        res.status(201).json(savedBilling);
    } catch (error) {
        console.error('Error creating billing:', error);
        res.status(500).json({ error: 'Failed to create billing' });
    }
};

// Get all Billing (GET /Billing)
exports.getAllBilling = async (req, res) => {
    try {
        const billing = await Billing.find();
        res.status(200).json(billing);
    } catch (error) {
        console.error('Error retrieving Billing:', error);
        res.status(500).json({ error: 'Failed to retrieve Billing' });
    }
};

// Get billing by ID (GET /Billing/:id)
exports.getBillingById = async (req, res) => {
    try {
        const billing = await Billing.findById(req.params.id);
        if (!billing) {
            return res.status(404).json({ error: `Billing not found with id : ${req.params.id}`}); 
        }
        res.status(200).json(billing);
    } catch (error) {
        console.error('Error retrieving billings:', error);
        res.status(500).json({ error: 'Failed to retrieve billings' });
    }
};

exports.getBillingsByBranch = async (req, res) => {
    try {
        const { branch } = req.params;
        const billings = await Billing.find({ branch });

        if (billings.length === 0) {
            return res.status(404).json({ error: 'No billings found for this branch' });
        }

        res.status(200).json(billings);
    } catch (error) {
        console.error('Error retrieving billings by branch:', error);
        res.status(500).json({ error: 'Failed to retrieve billings by branch' });
    }
};

// Update billing by ID (PUT /Billing/:id)
exports.updateBilling = async (req, res) => {
    try {
        const updatedBilling = await Billing.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedBilling) {
            return res.status(404).json({ error: `Billing not found with id : ${req.params.id}`});
        }
        res.status(200).json(updatedBilling);
    } catch (error) {
        console.error('Error updating billing:', error);
        res.status(500).json({ error: 'Failed to update billing' });
    }
};

// Delete billing by ID (DELETE /Billing/:id)
exports.deleteBilling = async (req, res) => {
    try {
        const deletedBilling = await Billing.findByIdAndDelete(req.params.id);
        if (!deletedBilling) {
            return res.status(404).json({ error: 'Billing not found' });
        }
        res.status(200).json({ message: 'Billing deleted successfully' });
    } catch (error) {
        console.error('Error deleting billing:', error);
        res.status(500).json({ error: 'Failed to delete billing' });
    }
};

// Get count of all Billing (GET /Billing/count)
exports.getBillingCount = async (req, res) => {
    try {
        const billingCount = await Billing.countDocuments(); // Get the count of all Billing
        res.status(200).json({ count: billingCount });
    } catch (error) {
        console.error('Error retrieving billing count:', error);
        res.status(500).json({ error: 'Failed to retrieve billing count' });
    }
};

// Get count of billings by branch (GET /billings/count/:branch)
exports.getBillingCountByBranch = async (req, res) => {
    try {
        const { branch } = req.params; // Extract branch from URL params

        if (!branch) {
            return res.status(400).json({ error: "Branch parameter is required" });
        }

        const billingCount = await Billing.countDocuments({ branch }); // Count billings for the given branch
        res.status(200).json({ branch, count: billingCount });
    } catch (error) {
        console.error('Error retrieving billing count by branch:', error);
        res.status(500).json({ error: 'Failed to retrieve billing count' });
    }
};