// Utility (service layer) where functions to make HTTP requests are defined

import axios from 'axios';

const API = {

    // Method for user register
    register: (username, password) => axios.post('/api/auth/register', { username, password }),

    // Method for logging in
    login: (username, password) => {
        return axios.post('/api/auth/login', { username, password });
    },

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
