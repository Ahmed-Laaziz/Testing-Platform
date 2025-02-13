const Asset = require('../../models/elements/asset'); // Import the Asset model

// Create an asset (POST /assets)
exports.createAsset = async (req, res) => {
    try {
        const newAsset = new Asset(req.body);
        const savedAsset = await newAsset.save();
        res.status(201).json(savedAsset);
    } catch (error) {
        console.error('Error creating asset:', error);
        res.status(500).json({ error: 'Failed to create asset' });
    }
};

// Get all assets (GET /assets)
exports.getAllAssets = async (req, res) => {
    try {
        const assets = await Asset.find();
        res.status(200).json(assets);
    } catch (error) {
        console.error('Error retrieving assets:', error);
        res.status(500).json({ error: 'Failed to retrieve assets' });
    }
};

// Get asset by ID (GET /assets/:id)
exports.getAssetById = async (req, res) => {
    try {
        const asset = await Asset.findById(req.params.id);
        if (!asset) {
            return res.status(404).json({ error: 'Asset not found' });
        }
        res.status(200).json(asset);
    } catch (error) {
        console.error('Error retrieving asset:', error);
        res.status(500).json({ error: 'Failed to retrieve asset' });
    }
};

exports.getAssetsByBranch = async (req, res) => {
    try {
        const { branch } = req.params;
        const assets = await Asset.find({ branch });

        if (assets.length === 0) {
            return res.status(404).json({ error: 'No assets found for this branch' });
        }

        res.status(200).json(assets);
    } catch (error) {
        console.error('Error retrieving assets by branch:', error);
        res.status(500).json({ error: 'Failed to retrieve assets by branch' });
    }
};

// Update asset by ID (PUT /assets/:id)
exports.updateAsset = async (req, res) => {
    try {
        const updatedAsset = await Asset.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedAsset) {
            return res.status(404).json({ error: 'Asset not found' });
        }
        res.status(200).json(updatedAsset);
    } catch (error) {
        console.error('Error updating asset:', error);
        res.status(500).json({ error: 'Failed to update asset' });
    }
};

// Delete asset by ID (DELETE /assets/:id)
exports.deleteAsset = async (req, res) => {
    try {
        const deletedAsset = await Asset.findByIdAndDelete(req.params.id);
        if (!deletedAsset) {
            return res.status(404).json({ error: 'Asset not found' });
        }
        res.status(200).json({ message: 'Asset deleted successfully' });
    } catch (error) {
        console.error('Error deleting asset:', error);
        res.status(500).json({ error: 'Failed to delete asset' });
    }
};

// Get count of all assets (GET /assets/count)
exports.getAssetCount = async (req, res) => {
    try {
        const assetCount = await Asset.countDocuments(); // Get the count of all assets
        res.status(200).json({ count: assetCount });
    } catch (error) {
        console.error('Error retrieving asset count:', error);
        res.status(500).json({ error: 'Failed to retrieve asset count' });
    }
};

// Get count of assets by branch (GET /assets/count/:branch)
exports.getAssetCountByBranch = async (req, res) => {
    try {
        const { branch } = req.params; // Extract branch from URL params

        if (!branch) {
            return res.status(400).json({ error: "Branch parameter is required" });
        }

        const assetCount = await Asset.countDocuments({ branch }); // Count assets for the given branch
        res.status(200).json({ branch, count: assetCount });
    } catch (error) {
        console.error('Error retrieving asset count by branch:', error);
        res.status(500).json({ error: 'Failed to retrieve asset count' });
    }
};

