import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import auditService from '../services/audit.service';

const AuditLogList = () => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        loadLogs();
    }, []);

    const loadLogs = async () => {
        try {
            const response = await auditService.getAllLogs();
            // Sort client side if needed or rely on backend
            const sortedLogs = response.data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
            setLogs(sortedLogs);
            setLoading(false);
        } catch (err) {
            console.error("Error loading logs", err);
            setError("Failed to load audit logs. You might not have permission (Admin only).");
            setLoading(false);
        }
    };

    if (loading) return <div className="text-center mt-10">Loading Logs...</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Audit Logs (Admin View)</h2>

            {error && <div className="bg-red-100 text-red-700 p-4 rounded mb-4">{error}</div>}

            <div className="bg-white shadow-md rounded overflow-x-auto">
                <table className="min-w-full table-auto">
                    <thead>
                        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                            <th className="py-3 px-6 text-left">Timestamp</th>
                            <th className="py-3 px-6 text-left">User</th>
                            <th className="py-3 px-6 text-left">Action</th>
                            <th className="py-3 px-6 text-left">Details</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                        {logs.map((log) => (
                            <tr key={log.id} className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-6 text-left whitespace-nowrap">
                                    {new Date(log.timestamp).toLocaleString()}
                                </td>
                                <td className="py-3 px-6 text-left font-medium">{log.username}</td>
                                <td className="py-3 px-6 text-left">{log.action}</td>
                                <td className="py-3 px-6 text-left">{log.details}</td>
                            </tr>
                        ))}
                        {logs.length === 0 && (
                            <tr>
                                <td colSpan="4" className="py-3 px-6 text-center">No logs found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="mt-4">
                <Link to="/dashboard" className="text-blue-600 hover:underline">Back to Dashboard</Link>
            </div>
        </div>
    );
};

export default AuditLogList;
