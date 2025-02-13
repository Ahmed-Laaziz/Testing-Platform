const User = require("../../models/users/user");
const bcrypt = require('bcrypt');

// Function to add a new user
exports.addUser = async (req, res, next) => {
    try {
      // Extract user data from request body
      const { first_name, last_name, email, password , environment} = req.body;
  
      // Check if user with the same email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'Email is already in use' });
      }
  
      // Hash the password using bcrypt
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Create a new user object
      const newUser = new User({
        first_name,
        last_name,
        email,
        password: hashedPassword, // Store the hashed password
        environment
      });
  
      // Save the new user to the database
      const savedUser = await newUser.save();
  
      // Respond with the newly created user (excluding password)
      res.status(201).json({
        id: savedUser._id,
        first_name: savedUser.first_name,
        last_name: savedUser.last_name,
        email: savedUser.email,
      });
    } catch (error) {
      console.error('Error adding user:', error);
      res.status(500).json({ error: 'Failed to add user' });
    }
  };

// Define a route to get User data by ID
exports.getUser =  async (req, res, next) => {
    try {
      const UserId = req.params.id;
  
      // Find the User by ID in your User collection
      const User = await User.findById(UserId);
  
      if (!User) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Return the User data as JSON
      res.status(200).json(User);
    } catch (error) {
      console.error('Error fetching User by ID:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

// Function to get all users
exports.getAllUsers = async (req, res, next) => {
    try {
      // Retrieve all users and exclude the password field
      const users = await User.find().select('-password');
  
      res.status(200).json(users);
    } catch (error) {
      console.error('Error fetching all users:', error);
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  };

  exports.getUserByEmail = async (req, res, next) => {
    try {
      const User = await User.findOne({"email": req.body.email});
      res.status(200).json(User);
    } catch (error) {
      console.error('Error retrieving User:', error);
      res.status(500).json({ error: 'Failed to retrieve User' });
    }
  };
