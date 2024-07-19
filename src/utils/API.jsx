// Utility (service layer) where functions to make HTTP requests are defined

import axios from 'axios';

const API = {
    // Get books from Google API
    getBooks: (q) => axios.get('https://www.googleapis.com/books/v1/volumes?q=' + q + '&maxResults=20')
};

export default API;