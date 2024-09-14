const express = require('express');
const router = express.Router();
const personaController = require('../../controllers/personas/personaController');
const verifyToken = require('../../middlewares/verifyToken');

router.get('/all-personas', verifyToken , personaController.getAllPersonas);
router.post('/add-persona', verifyToken , personaController.createPersona);
router.delete('/persona/:id', verifyToken , personaController.deletePersona);

module.exports = router;
