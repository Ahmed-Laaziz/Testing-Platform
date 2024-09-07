var express = require('express');
var router = express.Router();
const verifyToken = require('../../middlewares/verifyToken');
const userController = require("../../controllers/users/userController");

// Route to add a new user
router.post('/add-user', userController.addUser);
router.get('/get-user', userController.getUser);
router.get('/all-users', verifyToken, userController.getAllUsers);
module.exports = router;