import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import employeeService from '../services/employee.service';

const EmployeeForm = () => {
    const [employee, setEmployee] = useState({
        firstName: '',
        lastName: '',
        email: '',
        department: '',
        designation: '',
        salary: '',
        dateOfJoining: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditMode = !!id;

    useEffect(() => {
        if (isEditMode) {
            loadEmployee();
        }
    }, [id]);

    const loadEmployee = async () => {
        try {
            const response = await employeeService.getEmployeeById(id);
            setEmployee(response.data);
        } catch (error) {
            console.error("Error loading employee", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee({ ...employee, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditMode) {
                await employeeService.updateEmployee(id, employee);
            } else {
                await employeeService.createEmployee(employee);
            }
            navigate('/employees');
        } catch (err) {
            console.error("Employee Creation Error:", err);
            if (err.response && err.response.data) {
                setError(typeof err.response.data === 'string' ? err.response.data : 'Server Error: ' + JSON.stringify(err.response.data));
            } else if (err.request) {
                setError('Network Error: No response received from server. Check if backend is running.');
            } else {
                setError('Error: ' + err.message);
            }
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background elements for glassmorphism depth */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-neon-pink/20 rounded-full blur-[120px] animate-pulse-slow"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-neon-blue/20 rounded-full blur-[120px] animate-pulse-slow delay-1000"></div>

            <div className="card w-full max-w-2xl animate-fade-in-up relative z-10">
                <div className="flex justify-between items-center mb-8">
                    <h3 className="text-4xl font-extrabold text-gradient drop-shadow-sm">
                        {isEditMode ? 'Edit Employee' : 'Add New Employee'}
                    </h3>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="group">
                            <label className="block text-gray-300 font-medium mb-1 group-focus-within:text-neon-pink transition-colors">First Name</label>
                            <input
                                type="text" name="firstName" value={employee.firstName} onChange={handleChange}
                                className="input-field" required placeholder="John"
                            />
                        </div>
                        <div className="group">
                            <label className="block text-gray-300 font-medium mb-1 group-focus-within:text-neon-pink transition-colors">Last Name</label>
                            <input
                                type="text" name="lastName" value={employee.lastName} onChange={handleChange}
                                className="input-field" required placeholder="Doe"
                            />
                        </div>
                    </div>

                    <div className="group">
                        <label className="block text-gray-300 font-medium mb-1 group-focus-within:text-neon-pink transition-colors">Email Address</label>
                        <input
                            type="email" name="email" value={employee.email} onChange={handleChange}
                            className="input-field" required placeholder="john.doe@company.com"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="group">
                            <label className="block text-gray-300 font-medium mb-1 group-focus-within:text-neon-pink transition-colors">Department</label>
                            <input
                                type="text" name="department" value={employee.department} onChange={handleChange}
                                className="input-field" required placeholder="Engineering"
                            />
                        </div>
                        <div className="group">
                            <label className="block text-gray-300 font-medium mb-1 group-focus-within:text-neon-pink transition-colors">Designation</label>
                            <input
                                type="text" name="designation" value={employee.designation} onChange={handleChange}
                                className="input-field" required placeholder="Software Engineer"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="group">
                            <label className="block text-gray-300 font-medium mb-1 group-focus-within:text-neon-pink transition-colors">Salary</label>
                            <input
                                type="number" name="salary" value={employee.salary} onChange={handleChange}
                                className="input-field" required placeholder="50000"
                            />
                        </div>
                        <div className="group">
                            <label className="block text-gray-300 font-medium mb-1 group-focus-within:text-neon-pink transition-colors">Date of Joining</label>
                            <input
                                type="date" name="dateOfJoining" value={employee.dateOfJoining} onChange={handleChange}
                                className="input-field" required
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="bg-red-500/10 border border-red-500/50 text-red-200 text-sm mt-4 text-center py-3 rounded-lg backdrop-blur-sm animate-pulse">
                            {error}
                        </div>
                    )}

                    <div className="flex items-center justify-end gap-4 mt-8 pt-4 border-t border-white/10">
                        <Link to="/employees" className="btn-secondary">
                            Cancel
                        </Link>
                        <button className="btn-primary">
                            {isEditMode ? 'Update Employee' : 'Create Employee'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EmployeeForm;
