import api from './api';

const getAllLogs = () => api.get("/audit");

export default {
    getAllLogs
};
