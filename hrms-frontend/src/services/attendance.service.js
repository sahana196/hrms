import api from './api';

const clockIn = () => {
    return api.post('/attendance/clock-in');
};

const clockOut = () => {
    return api.post('/attendance/clock-out');
};

const getMyHistory = () => {
    return api.get('/attendance/my-history');
};

export default {
    clockIn,
    clockOut,
    getMyHistory
};
