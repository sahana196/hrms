import api from './api';

const applyForLeave = (leaveRequest) => {
    return api.post('/leaves/apply', leaveRequest);
};

const getMyLeaves = () => {
    return api.get('/leaves/my-leaves');
};

const getAllLeaves = () => {
    return api.get('/leaves/all');
};

const updateLeaveStatus = (id, status) => {
    return api.put(`/leaves/${id}/status`, { status });
};

export default {
    applyForLeave,
    getMyLeaves,
    getAllLeaves,
    updateLeaveStatus
};
