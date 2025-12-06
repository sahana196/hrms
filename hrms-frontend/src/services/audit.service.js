import api from './api';

const getAllLogs = () => {
    return api.get('/audit');
};

export default {
    getAllLogs
};
