// Utility (service layer) where functions to make HTTP requests are defined

import axios from 'axios';

const API = {
    // Method for retrieving book data from API
    getBooks: (q) => axios.get(`/api/search?q=${q}`),

    // Method for interacting with database
    addBook: (bookData) => {
        return axios.post('/api/books', bookData);
    }

};

export default API;
