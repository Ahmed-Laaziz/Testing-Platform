const jwt = require('jsonwebtoken');
const JWT_SECRET = 'RandomJWTSecretKey123';

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];  // Extract token from Authorization header

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  // Verify the token
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }
    
    // If valid, attach the user info (from the token) to the request and continue
    req.user = decoded;  // `decoded` contains the payload of the token (e.g., { id: user._id, iat, exp })
    next();
  });
};

module.exports = verifyToken;
