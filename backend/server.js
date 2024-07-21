const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const apiRoutes = require('./routes/apiRoutes');
const bookRoutes = require('./routes/bookRoutes');
const authMiddleware = require('./services/authMiddleware'); // Import middleware

const app = express();
const PORT = process.env.PORT || 3001;

connectDB(); // Connect to MongoDB

app.use(express.json()); // Middleware to parse JSON request bodies
app.use(cors()); // Middleware to allow cross-origin requests

app.use('/api/auth', authRoutes); // Public routes for user authentication
app.use('/api', apiRoutes); // Public API routes for Google Books API
app.use('/api/books', authMiddleware, bookRoutes); // Protected routes for book operations

app.listen(PORT, () => console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`));
