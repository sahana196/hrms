// src/components/LeaveList.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import leaveService from "../services/leave.service";

const LeaveList = () => {
    const [leaves, setLeaves] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [newLeave, setNewLeave] = useState({
        startDate: "",
        endDate: "",
        reason: "",
    });
    const [error, setError] = useState("");

    useEffect(() => {
        loadLeaves();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAdmin]);

    const loadLeaves = async () => {
        try {
            // Try admin view first
            try {
                const response = await leaveService.getAllLeaves();
                setLeaves(response.data);
                setIsAdmin(true);
            } catch (e) {
                // Fallback to my leaves
                const response = await leaveService.getMyLeaves();
                setLeaves(response.data);
                setIsAdmin(false);
            }
        } catch (err) {
            console.error("Error loading leaves", err);
            setError("Failed to load leave data.");
        }
    };

    const handleApply = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await leaveService.applyForLeave(newLeave);
            setShowForm(false);
            setNewLeave({ startDate: "", endDate: "", reason: "" });
            loadLeaves();
        } catch (err) {
            console.error(err);
            alert("Failed to apply for leave");
        }
    };

    const handleStatusUpdate = async (id, status) => {
        try {
            await leaveService.updateLeaveStatus(id, status);
            loadLeaves();
        } catch (err) {
            console.error(err);
            alert("Failed to update status");
        }
    };

    return (
        <div className="hrms-page">
            {/* header: title + button */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "16px",
                }}
            >
                <h1>Leave Management</h1>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="hrms-btn hrms-btn-primary"
                >
                    {showForm ? "Cancel" : "Apply for Leave"}
                </button>
            </div>

            {/* error message if any */}
            {error && (
                <div
                    style={{
                        marginBottom: "14px",
                        padding: "8px 10px",
                        borderRadius: "10px",
                        backgroundColor: "rgba(248,113,113,0.16)",
                        color: "#fecaca",
                        fontSize: "0.85rem",
                    }}
                >
                    {error}
                </div>
            )}

            {/* apply leave form */}
            {showForm && (
                <div
                    style={{
                        marginBottom: "18px",
                        padding: "16px 18px",
                        borderRadius: "14px",
                        background: "rgba(15,23,42,0.9)",
                        border: "1px solid rgba(148,163,184,0.5)",
                    }}
                >
                    <h3 style={{ marginBottom: "10px" }}>New Leave Request</h3>
                    <form onSubmit={handleApply}>
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr",
                                gap: "12px",
                                marginBottom: "10px",
                            }}
                        >
                            <label style={{ fontSize: "0.85rem" }}>
                                Start Date
                                <input
                                    type="date"
                                    className="auth-input"
                                    style={{ marginTop: "4px" }}
                                    value={newLeave.startDate}
                                    onChange={(e) =>
                                        setNewLeave({ ...newLeave, startDate: e.target.value })
                                    }
                                    required
                                />
                            </label>

                            <label style={{ fontSize: "0.85rem" }}>
                                End Date
                                <input
                                    type="date"
                                    className="auth-input"
                                    style={{ marginTop: "4px" }}
                                    value={newLeave.endDate}
                                    onChange={(e) =>
                                        setNewLeave({ ...newLeave, endDate: e.target.value })
                                    }
                                    required
                                />
                            </label>
                        </div>

                        <label style={{ fontSize: "0.85rem", display: "block" }}>
                            Reason
                            <textarea
                                className="auth-input"
                                style={{
                                    marginTop: "4px",
                                    minHeight: "70px",
                                    resize: "vertical",
                                }}
                                value={newLeave.reason}
                                onChange={(e) =>
                                    setNewLeave({ ...newLeave, reason: e.target.value })
                                }
                                required
                            />
                        </label>

                        <button
                            type="submit"
                            className="auth-button"
                            style={{ marginTop: "10px" }}
                        >
                            Submit Request
                        </button>
                    </form>
                </div>
            )}

            {/* leave table */}
            <table className="hrms-table">
                <thead>
                    <tr>
                        {isAdmin && <th>Employee</th>}
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Reason</th>
                        <th>Status</th>
                        <th style={{ textAlign: "center" }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {leaves.map((leave) => (
                        <tr key={leave.id}>
                            {isAdmin && <td>{leave.user?.username}</td>}
                            <td>{leave.startDate}</td>
                            <td>{leave.endDate}</td>
                            <td>{leave.reason}</td>
                            <td>
                                <span
                                    style={{
                                        padding: "3px 10px",
                                        borderRadius: "999px",
                                        fontSize: "0.75rem",
                                        backgroundColor:
                                            leave.status === "APPROVED"
                                                ? "rgba(22,163,74,0.18)"
                                                : leave.status === "REJECTED"
                                                    ? "rgba(239,68,68,0.18)"
                                                    : "rgba(250,204,21,0.18)",
                                        color:
                                            leave.status === "APPROVED"
                                                ? "#4ade80"
                                                : leave.status === "REJECTED"
                                                    ? "#fca5a5"
                                                    : "#facc15",
                                    }}
                                >
                                    {leave.status}
                                </span>
                            </td>
                            <td>
                                {isAdmin && leave.status === "PENDING" && (
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            gap: "10px",
                                        }}
                                    >
                                        <button
                                            onClick={() =>
                                                handleStatusUpdate(leave.id, "APPROVED")
                                            }
                                            title="Approve"
                                            style={{
                                                background: "none",
                                                border: "none",
                                                cursor: "pointer",
                                                color: "#4ade80",
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
                                                    d="M5 13l4 4L19 7"
                                                />
                                            </svg>
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleStatusUpdate(leave.id, "REJECTED")
                                            }
                                            title="Reject"
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
                                                    d="M6 18L18 6M6 6l12 12"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                    {leaves.length === 0 && (
                        <tr>
                            <td
                                colSpan={isAdmin ? 6 : 5}
                                style={{ textAlign: "center", padding: "10px" }}
                            >
                                No leave requests found
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

export default LeaveList;
