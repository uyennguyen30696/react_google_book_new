const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes/apiRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware to parse JSON request bodies
app.use(express.json());

// Middleware to allow cross-origin requests
app.use(cors());

// Use routes from the routes folder
app.use('/api', apiRoutes);

// Start the server and listen for incoming requests
app.listen(PORT, () => {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
