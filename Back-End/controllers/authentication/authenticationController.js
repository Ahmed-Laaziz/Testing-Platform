const User = require("../../models/users/user");
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.SECRET_KEY;
const bcrypt = require('bcrypt');



exports.login =  async (req, res) => {
    const { email, password } = req.body;
  
    try {

      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Compare the entered password with the hashed password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: 'Incorrect password' });
      }

      const token = jwt.sign({ id: user._id }, JWT_SECRET, {
        expiresIn: '1h',
      });

      res.status(200).json({ token, user });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ error: 'An error occurred during login' });
    }
  };