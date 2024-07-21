const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db.js');
const authRoutes = require('./routes/authRoutes'); 
const apiRoutes = require('./routes/apiRoutes');
const bookRoutes = require('./routes/bookRoutes.js');

const app = express();
const PORT = process.env.PORT || 3001;

// Connect to MongoDB
connectDB();

// Middleware to parse JSON request bodies
app.use(express.json());

// Middleware to allow cross-origin requests
app.use(cors());

// Use routes from the routes folder
app.use('/api/auth', authRoutes); // Authenticate for user login
app.use('/api', apiRoutes); // Google book API routes
app.use('/api/books', bookRoutes); // Routes for communicating with database

// Start the server and listen for incoming requests
app.listen(PORT, () => {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
