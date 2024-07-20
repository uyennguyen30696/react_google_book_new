// Utility (service layer) where functions to make HTTP requests are defined

import axios from 'axios';

const API = {
    getBooks: (q) => axios.get(`/api/search?q=${q}`)
};

export default API;
