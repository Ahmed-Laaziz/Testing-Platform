const express = require('express');
const router = express.Router();
const subFunctionalityController = require('../../controllers/personas/subFunctionalityController');
const verifyToken = require('../../middlewares/verifyToken');

router.get('/all-subFunctionalities', verifyToken , subFunctionalityController.getAllSubFunctionalities);
router.post('/add-subFunctionality', verifyToken , subFunctionalityController.createSubFunctionality);
router.post('/add-subFunctionalities', verifyToken , subFunctionalityController.createMultipleSubFunctionalities);
router.post('/add-subFunctionalities-permissions', verifyToken , subFunctionalityController.addPermissionsToMultipleSubFunctionalities);
router.patch('/subFunctionality/:id/permissions', verifyToken , subFunctionalityController.updatePermissions);
router.get('/subFunctionality/:id', verifyToken, subFunctionalityController.getSubFunctionalityById);
router.get('/subFunctionalitiesByFunctionalityName', verifyToken, subFunctionalityController.getSubFunctionalitiesWithPermissionsByFunctionalityName);
router.get('/subFunctionalitiesBySubFunctionalityName', verifyToken, subFunctionalityController.getPermissionsBySubFunctionalityName);

module.exports = router;
