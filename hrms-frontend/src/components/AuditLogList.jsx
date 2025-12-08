import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import auditService from "../services/audit.service";

const AuditLogList = () => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadLogs();
    }, []);

    const loadLogs = async () => {
        setLoading(true);
        setError("");

        try {
            const response = await auditService.getAllLogs();
            const raw = Array.isArray(response?.data) ? response.data : [];

            const sortedLogs = [...raw].sort(
                (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
            );

            setLogs(sortedLogs);
        } catch (err) {
            console.error("Error loading logs", err);
            if (err.response?.status === 403) {
                setError(
                    "You are not authorized to view audit logs. This page is for Admin users only."
                );
            } else {
                setError("Failed to load audit logs. Please try again later.");
            }
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="audit-page">
                <div className="audit-card">
                    Loading logs...
                </div>
            </div>
        );
    }

    return (
        <div className="audit-page">
            <div className="audit-card">
                <h2 className="audit-title">Audit Logs (Admin View)</h2>

                {error && <div className="audit-error">{error}</div>}

                <table className="audit-table">
                    <thead>
                        <tr>
                            <th>Timestamp</th>
                            <th>User</th>
                            <th>Action</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {logs.map((log) => (
                            <tr
                                key={log.id ?? `${log.timestamp}-${log.username}-${log.action}`}
                            >
                                <td>
                                    {log.timestamp
                                        ? new Date(log.timestamp).toLocaleString()
                                        : "-"}
                                </td>
                                <td>{log.username || "-"}</td>
                                <td>{log.action || "-"}</td>
                                <td>{log.details || "-"}</td>
                            </tr>
                        ))}

                        {logs.length === 0 && !error && (
                            <tr>
                                <td colSpan="4" style={{ textAlign: "center", padding: "12px" }}>
                                    No logs found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                <Link to="/dashboard" className="audit-back-link">
                    Back to Dashboard
                </Link>
            </div>
        </div>
    );
};

export default AuditLogList;
