const axios = require('axios');

// Controller to handle search requests from google book API
const searchBooks = (req, res) => {
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
            item.volumeInfo.imageLinks && 
            item.volumeInfo.imageLinks.thumbnail &&
            item.volumeInfo.publishedDate &&
            item.volumeInfo.pageCount && 
            item.volumeInfo.categories
        );
        res.json({ items: filteredItems });
    })
    .catch(error => {
        console.error(error);
        res.status(500).send('An error occurred while fetching books.');
    });
};

module.exports = { searchBooks };
