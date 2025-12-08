// src/components/Dashboard.jsx
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import authService from "../services/auth.service";
import "./dashboard.css";

const Dashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        authService.logout(); // remove token
        navigate("/login");
    };

    return (
        <div className="dash-page">
            {/* Top bar */}
            <header className="dash-header">
                <div className="dash-logo">
                    <span className="dash-logo-icon">H</span>
                    <span className="dash-logo-text">HRMS</span>
                </div>

                <div className="dash-user">
                    <span className="dash-user-label">Welcome, User</span>
                    <button className="btn-logout" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </header>

            {/* Main content */}
            <main className="dash-main">
                <h1 className="dash-title">HRMS Dashboard</h1>
                <p className="dash-subtitle">
                    Quick access to employees, leaves, attendance and audit logs.
                </p>

                <div className="dash-grid">
                    <Link to="/employees" className="dash-card">
                        <h2>Employees</h2>
                        <p>Manage employee records, view profiles, and update details.</p>
                    </Link>

                    <Link to="/leaves" className="dash-card">
                        <h2>Leaves</h2>
                        <p>View leave requests, approve time off, and check balances.</p>
                    </Link>

                    <Link to="/attendance" className="dash-card">
                        <h2>Attendance</h2>
                        <p>Clock-in / Clock-out and view daily logs and work hours.</p>
                    </Link>

                    <Link to="/audit" className="dash-card">
                        <h2>Audit Logs</h2>
                        <p>Monitor system activity, track changes and security events.</p>
                    </Link>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
