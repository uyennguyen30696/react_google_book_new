const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware to parse JSON request bodies
app.use(express.json());

// Middleware to allow cross-origin requests
app.use(cors()); 

// Route to fetch books from the Google Books API
app.get('/api/search', (req, res) => {
    const { q } = req.query; // Extract the search query from the request

    axios.get('https://www.googleapis.com/books/v1/volumes', {
        params: {
            q: q, 
            maxResults: 20 
        }
    })
    .then(response => {
        const filteredItems = response.data.items.filter(item => 
            item.id &&
            item.volumeInfo.title &&
            item.volumeInfo.infoLink &&
            item.volumeInfo.authors &&
            item.volumeInfo.description &&
            item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.thumbnail
        );
        res.json({ items: filteredItems });
    })
    .catch(error => {
        console.error(error);
        res.status(500).send('An error occurred while fetching books.');
    });
});

// Start the server and listen for incoming requests
app.listen(PORT, () => {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
