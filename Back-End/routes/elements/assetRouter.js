const express = require('express');
const router = express.Router();
const assetController = require('../../controllers/elements/assetController');
const verifyToken = require('../../middlewares/verifyToken');

// Create a new asset
router.post('/add-asset', verifyToken, assetController.createAsset);

// Get all assets
router.get('/all-assets', verifyToken, assetController.getAllAssets);

// Get an asset by ID
router.get('/asset/:id', verifyToken, assetController.getAssetById);

// Get Assets Count
router.get('/count-assets', verifyToken, assetController.getAssetCount);
// Update an asset by ID
router.put('/asset/:id', verifyToken, assetController.updateAsset);

// Delete an asset by ID
router.delete('/asset/:id', verifyToken, assetController.deleteAsset);

module.exports = router;
