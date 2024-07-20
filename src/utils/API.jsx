// Utility (service layer) where functions to make HTTP requests are defined

import axios from 'axios';

const API = {
    // Method for retrieving book data from API
    getBooks: (q) => axios.get(`/api/search?q=${q}`),

    // Method for interacting with database
    addBook: (bookData) => {
        return axios.post('/api/books', bookData);
    },

    // Method for retrieving all saved books from database
    getSavedBooks: () => {
        return axios.get('/api/books');
    },

    deleteBook: (id) => {
        return axios.delete(`/api/books/${id}`);
    },

    // getBookById: function (id) {
    // return axios.get(`/api/books/${id}`);
    // },

};

export default API;
