import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import employeeService from '../services/employee.service';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadEmployees();
    }, []);

    const loadEmployees = async () => {
        try {
            const response = await employeeService.getAllEmployees();
            setEmployees(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error loading employees", error);
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this employee?")) {
            try {
                await employeeService.deleteEmployee(id);
                loadEmployees();
            } catch (error) {
                console.error("Error deleting employee", error);
                alert("Failed to delete employee");
            }
        }
    };

    if (loading) return <div className="text-center mt-10">Loading...</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Employees</h2>
                <Link to="/employees/add" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add Employee</Link>
            </div>

            <div className="bg-white shadow-md rounded my-6 overflow-x-auto">
                <table className="min-w-full table-auto">
                    <thead>
                        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                            <th className="py-3 px-6 text-left">Name</th>
                            <th className="py-3 px-6 text-left">Email</th>
                            <th className="py-3 px-6 text-left">Department</th>
                            <th className="py-3 px-6 text-left">Designation</th>
                            <th className="py-3 px-6 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                        {employees.map((employee) => (
                            <tr key={employee.id} className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-6 text-left whitespace-nowrap">
                                    <div className="flex items-center">
                                        <span className="font-medium">{employee.firstName} {employee.lastName}</span>
                                    </div>
                                </td>
                                <td className="py-3 px-6 text-left">
                                    <span>{employee.email}</span>
                                </td>
                                <td className="py-3 px-6 text-left">
                                    <span>{employee.department}</span>
                                </td>
                                <td className="py-3 px-6 text-left">
                                    <span>{employee.designation}</span>
                                </td>
                                <td className="py-3 px-6 text-center">
                                    <div className="flex item-center justify-center">
                                        <Link to={`/employees/edit/${employee.id}`} className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                            </svg>
                                        </Link>
                                        <button onClick={() => handleDelete(employee.id)} className="w-4 mr-2 transform hover:text-red-500 hover:scale-110">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {employees.length === 0 && (
                            <tr>
                                <td colSpan="5" className="py-3 px-6 text-center">No employees found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <Link to="/dashboard" className="text-blue-600 hover:underline">Back to Dashboard</Link>
        </div>
    );
};

export default EmployeeList;
