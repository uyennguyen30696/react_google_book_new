const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

// Middleware to verify JWT token
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1]; // Extract token from Authorization header
    
    // Verify JWT token
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            console.log('Token verification error:', err); // Log the error if token verification fails
            return res.status(401).json({ message: 'Invalid token' });
        }
        req.user = decoded; 
        next(); // Proceed to the next middleware or route handler
    });
};

module.exports = authMiddleware;
