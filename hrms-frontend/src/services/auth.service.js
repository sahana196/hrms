// src/services/auth.service.js
import api from './api';

const login = async (username, password) => {
    const response = await api.post('/auth/login', { username, password });
    if (response.data.accessToken) {
        localStorage.setItem('token', response.data.accessToken);
    }
    return response.data;
};

const logout = () => {
    localStorage.removeItem('token');
};

const register = (username, password, role) => {
    // Final URL = http://localhost:8080/api/auth/register
    return api.post('/auth/register', { username, password, role });
};

const getCurrentUser = () => {
    return localStorage.getItem('token');
};

export default { login, logout, register, getCurrentUser };
