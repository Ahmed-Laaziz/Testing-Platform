const express = require('express');
const router = express.Router();
const personaController = require('../../controllers/personas/personaController');
const verifyToken = require('../../middlewares/verifyToken');

router.get('/all-personas', verifyToken , personaController.getAllPersonas);
router.post('/add-persona', verifyToken , personaController.createPersona);
router.post('/add-personas', verifyToken , personaController.addMultiplePersonas);
router.delete('/persona/:id', verifyToken , personaController.deletePersona);

// Get a persona by ID
router.get('/persona/:id', verifyToken, personaController.getPersonaById);

// Update a persona by ID
router.put('/persona/:id', verifyToken, personaController.updatePersonaById);
module.exports = router;
