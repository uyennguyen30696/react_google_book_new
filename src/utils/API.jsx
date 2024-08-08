// Utility (service layer) where functions to make HTTP requests are defined

import axios from 'axios';

const baseURL = process.env.VITE_API_BASE_URL;

const API = {

    // Method for user register
    register: (username, password) => axios.post(`${baseURL}/api/auth/register`, { username, password }),

    // Method for logging in
    login: (username, password) => axios.post(`${baseURL}/api/auth/login`, { username, password }),

    // Method for retrieving book data from API
    getBooks: (q) => {
        return axios.get(`${baseURL}/api/search?q=${q}`); 
    },

    // Method for interacting with database
    addBook: (bookData) => {
        const token = sessionStorage.getItem('token'); // Retrieve JWT token from sessionStorage
        return axios.post(`${baseURL}/api/books`, bookData, { headers: { Authorization: `Bearer ${token}` } }); // Include token in request headers
    },

    // Method for retrieving all saved books from database for the logged in user
    getSavedBooks: (status = 'not started') => {
        const token = sessionStorage.getItem('token'); // Retrieve JWT token from sessionStorage
        const url = status === 'all' ? `${baseURL}/api/books` : `${baseURL}/api/books?status=${status}`;
        return axios.get(url, { headers: { Authorization: `Bearer ${token}` } }); // Include token in request headers
    },

    // Method for deleting a book
    deleteBook: (id) => {
        const token = sessionStorage.getItem('token'); // Retrieve JWT token from sessionStorage
        return axios.delete(`${baseURL}/api/books/${id}`, { headers: { Authorization: `Bearer ${token}` } }); // Include token in request headers
    },

    // Method for retrieving a specific book by title for the logged in user
    getOneSavedBook: (title) => {
        const token = sessionStorage.getItem('token'); // Retrieve JWT token from sessionStorage
        return axios.post(`${baseURL}/api/books/search`, title, { headers: { Authorization: `Bearer ${token}` } }); // Include token in request headers
    },

    // Method for updating the status of a book
    updateBookStatus: (id, newStatus) => {
        const token = sessionStorage.getItem('token'); // Retrieve JWT token from sessionStorage
        return axios.put(`${baseURL}/api/books/${id}/status`, { bookId: id, status: newStatus }, { headers: { Authorization: `Bearer ${token}` } }); // Include token in request headers
    },
};

export default API;
