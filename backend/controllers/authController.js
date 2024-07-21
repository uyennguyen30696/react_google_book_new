const User = require('../models/users');

// Handle register request
const registerUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ username });

        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }
        
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create a new user
        const newUser = new User({
            username,
            password
        });

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
        const user = await User.findOne({ username });
        if (user && user.password === password) {  // Use hashing for real apps
            res.status(200).json({ message: 'Login successful' });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
};

module.exports = { registerUser, loginUser };