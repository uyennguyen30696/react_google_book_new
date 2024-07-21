const jwt = require('jsonwebtoken');
const Users = require('../models/users'); 

const JWT_SECRET = process.env.JWT_SECRET; // Secret key for signing JWTs

// Handle register request
const registerUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const existingUser = await Users.findOne({ username });

        // Check if both username and password are provided
        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }
        
        // Check if user already exists
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create a new user
        const newUser = new Users({ username, password });
        await newUser.save();
        res.status(201).json({ message: 'New account registered successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Handle login request
const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await Users.findOne({ username });

        // Check if user exists and passwords match
        if (user && user.password === password) {
            // Generate JWT token
            const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
            res.status(200).json({ message: 'Login successful', token }); // Send JWT token
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
};

module.exports = { registerUser, loginUser };
