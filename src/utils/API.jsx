// Utility (service layer) where functions to make HTTP requests are defined

import axios from 'axios';

const API = {
    
    // Method for user register
    register: (username, password) => axios.post('/api/auth/register', { username, password }),

    // Method for logging in
    login: (username, password) => axios.post('/api/auth/login', { username, password }),

    // Method for retrieving book data from API
    getBooks: (q) => {
        const token = sessionStorage.getItem('token'); // Retrieve JWT token from sessionStorage
        return axios.get(`/api/search?q=${q}`, { headers: { Authorization: `Bearer ${token}` } }); // Include token in request headers
    },

    // Method for interacting with database
    addBook: (bookData) => {
        const token = sessionStorage.getItem('token'); // Retrieve JWT token from sessionStorage
        return axios.post('/api/books', bookData, { headers: { Authorization: `Bearer ${token}` } }); // Include token in request headers
    },

    // Method for retrieving all saved books from database
    getSavedBooks: () => {
        const token = sessionStorage.getItem('token'); // Retrieve JWT token from sessionStorage
        return axios.get('/api/books', { headers: { Authorization: `Bearer ${token}` } }); // Include token in request headers
    },

    // Method for deleting a book
    deleteBook: (id) => {
        const token = sessionStorage.getItem('token'); // Retrieve JWT token from sessionStorage
        return axios.delete(`/api/books/${id}`, { headers: { Authorization: `Bearer ${token}` } }); // Include token in request headers
    },
};

export default API;
