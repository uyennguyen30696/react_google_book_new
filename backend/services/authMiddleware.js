const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_jwt_secret'; // Secret key for signing JWTs

// Middleware to verify JWT token
const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Extract token from Authorization header

    if (!token) return res.status(401).json({ message: 'No token provided' });
    
    // Verify JWT token
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ message: 'Invalid token' });
        req.user = decoded; // Attach decoded user data to request
        next(); // Proceed to the next middleware or route handler
    });
};

module.exports = authMiddleware;
