// src/components/Attendance.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import attendanceService from "../services/attendance.service";

const Attendance = () => {
    const [history, setHistory] = useState([]);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        loadHistory();
    }, []);

    const loadHistory = async () => {
        try {
            const response = await attendanceService.getMyHistory();
            setHistory(response.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleClockIn = async () => {
        setMessage("");
        setError("");
        try {
            await attendanceService.clockIn();
            setMessage("Clocked In Successfully!");
            loadHistory();
        } catch (err) {
            setError(err.response?.data || "Failed to clock in");
        }
    };

    const handleClockOut = async () => {
        setMessage("");
        setError("");
        try {
            await attendanceService.clockOut();
            setMessage("Clocked Out Successfully!");
            loadHistory();
        } catch (err) {
            setError(err.response?.data || "Failed to clock out");
        }
    };

    return (
        <div className="hrms-page">
            <h1 style={{ marginBottom: "14px" }}>Attendance</h1>

            {/* clock in/out panel */}
            <div
                style={{
                    marginBottom: "18px",
                    padding: "16px 18px",
                    borderRadius: "14px",
                    background: "rgba(15,23,42,0.9)",
                    border: "1px solid rgba(148,163,184,0.5)",
                }}
            >
                <div style={{ display: "flex", gap: "12px", marginBottom: "10px" }}>
                    <button
                        onClick={handleClockIn}
                        className="auth-button"
                        style={{ maxWidth: "160px" }}
                    >
                        Clock In
                    </button>
                    <button
                        onClick={handleClockOut}
                        className="auth-button"
                        style={{
                            maxWidth: "160px",
                            background: "linear-gradient(135deg,#f97316,#fb923c)",
                            boxShadow: "0 14px 30px rgba(248, 148, 80, 0.6)",
                        }}
                    >
                        Clock Out
                    </button>
                </div>

                {message && (
                    <p style={{ color: "#4ade80", fontSize: "0.9rem" }}>{message}</p>
                )}
                {error && (
                    <p style={{ color: "#fecaca", fontSize: "0.9rem" }}>{error}</p>
                )}
            </div>

            {/* history table */}
            <h3 style={{ marginBottom: "8px" }}>My Attendance History</h3>
            <table className="hrms-table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Clock In</th>
                        <th>Clock Out</th>
                    </tr>
                </thead>
                <tbody>
                    {history.map((record) => (
                        <tr key={record.id}>
                            <td>{record.date}</td>
                            <td>
                                {record.clockInTime
                                    ? new Date(record.clockInTime).toLocaleTimeString()
                                    : "-"}
                            </td>
                            <td>
                                {record.clockOutTime
                                    ? new Date(record.clockOutTime).toLocaleTimeString()
                                    : "-"}
                            </td>
                        </tr>
                    ))}
                    {history.length === 0 && (
                        <tr>
                            <td colSpan="3" style={{ textAlign: "center", padding: "10px" }}>
                                No history found
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

export default Attendance;
