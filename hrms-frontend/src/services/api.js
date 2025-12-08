// src/services/api.js
import axios from 'axios';

// Hard-code local backend for now (ignore VITE_API_URL)
const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
    baseURL: API_BASE_URL,   // -> http://localhost:8080/api
    headers: {
        'Content-Type': 'application/json',
    },
});

// Attach JWT token automatically for protected endpoints
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
