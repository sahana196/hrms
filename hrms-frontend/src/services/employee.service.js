import api from './api';

const getAllEmployees = () => {
    return api.get('/employees');
};

const getEmployeeById = (id) => {
    return api.get(`/employees/${id}`);
};

const createEmployee = (employee) => {
    return api.post('/employees', employee);
};

const updateEmployee = (id, employee) => {
    return api.put(`/employees/${id}`, employee);
};

const deleteEmployee = (id) => {
    return api.delete(`/employees/${id}`);
};

export default {
    getAllEmployees,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee
};
