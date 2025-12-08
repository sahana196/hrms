// src/pages/Dashboard.jsx  (or whatever your file is called)
import React from "react";
import "./dashboard.css";

const Dashboard = ({ onLogout }) => {
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
                    <button className="btn-logout" onClick={onLogout}>
                        Logout
                    </button>
                </div>
            </header>

            {/* Main content */}
            <main className="dash-main">
                <h1 className="dash-title">HRMS Dashboard</h1>
                <p className="dash-subtitle">
                    Manage employees, leaves, attendance and audit logs in one place.
                </p>

                <div className="dash-grid">
                    {/* Employees */}
                    <section
                        className="dash-card"
                        onClick={() => (window.location.href = "/employees")}
                    >
                        <div className="dash-card-icon"></div>
                        <h2 className="dash-card-title">Employees</h2>
                        <p className="dash-card-text">
                            Manage employee records, view profiles, and update details.
                        </p>
                        <span className="dash-card-link">Go to Employees →</span>
                    </section>

                    {/* Leaves */}
                    <section
                        className="dash-card"
                        onClick={() => (window.location.href = "/leaves")}
                    >
                        <div className="dash-card-icon"></div>
                        <h2 className="dash-card-title">Leaves</h2>
                        <p className="dash-card-text">
                            View leave requests, approve time off, and check balances.
                        </p>
                        <span className="dash-card-link">Go to Leaves →</span>
                    </section>

                    {/* Attendance */}
                    <section
                        className="dash-card"
                        onClick={() => (window.location.href = "/attendance")}
                    >
                        <div className="dash-card-icon"></div>
                        <h2 className="dash-card-title">Attendance</h2>
                        <p className="dash-card-text">
                            Check-in / check-out, view daily logs and work hours.
                        </p>
                        <span className="dash-card-link">Go to Attendance →</span>
                    </section>

                    {/* Audit Logs */}
                    <section
                        className="dash-card"
                        onClick={() => (window.location.href = "/audit-logs")}
                    >
                        <div className="dash-card-icon"></div>
                        <h2 className="dash-card-title">Audit Logs</h2>
                        <p className="dash-card-text">
                            Monitor system activity, track changes and security events.
                        </p>
                        <span className="dash-card-link">Go to Audit Logs →</span>
                    </section>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
