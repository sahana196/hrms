import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import employeeService from "../services/employee.service";

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

    if (loading) {
        return <div className="hrms-page">Loading...</div>;
    }

    return (
        <div className="hrms-page">
            {/* header: title + add button */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "16px",
                }}
            >
                <h1>Employees</h1>
                <Link
                    to="/employees/add"
                    className="hrms-btn hrms-btn-primary"
                    style={{ textDecoration: "none" }}
                >
                    Add Employee
                </Link>
            </div>

            {/* table */}
            <table className="hrms-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Department</th>
                        <th>Designation</th>
                        <th style={{ textAlign: "center" }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
                        <tr key={employee.id}>
                            <td>
                                {employee.firstName} {employee.lastName}
                            </td>
                            <td>{employee.email}</td>
                            <td>{employee.department}</td>
                            <td>{employee.designation}</td>
                            <td>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        gap: "10px",
                                    }}
                                >
                                    <Link
                                        to={`/employees/edit/${employee.id}`}
                                        title="Edit"
                                        style={{ color: "inherit" }}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            width="18"
                                            height="18"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                            />
                                        </svg>
                                    </Link>

                                    <button
                                        onClick={() => handleDelete(employee.id)}
                                        title="Delete"
                                        style={{
                                            background: "none",
                                            border: "none",
                                            cursor: "pointer",
                                            color: "#f87171",
                                        }}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            width="18"
                                            height="18"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}

                    {employees.length === 0 && (
                        <tr>
                            <td colSpan="5" style={{ textAlign: "center" }}>
                                No employees found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            <Link to="/dashboard" className="hrms-back-link">
                Back to Dashboard
            </Link>
        </div>
    );
};

export default EmployeeList;
