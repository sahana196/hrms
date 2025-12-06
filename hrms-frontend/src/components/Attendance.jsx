import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import attendanceService from '../services/attendance.service';

const Attendance = () => {
    const [history, setHistory] = useState([]);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

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
        setMessage('');
        setError('');
        try {
            await attendanceService.clockIn();
            setMessage('Clocked In Successfully!');
            loadHistory();
        } catch (err) {
            setError(err.response?.data || 'Failed to clock in');
        }
    };

    const handleClockOut = async () => {
        setMessage('');
        setError('');
        try {
            await attendanceService.clockOut();
            setMessage('Clocked Out Successfully!');
            loadHistory();
        } catch (err) {
            setError(err.response?.data || 'Failed to clock out');
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Attendance</h2>

            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <div className="flex space-x-4 mb-4">
                    <button onClick={handleClockIn} className="bg-green-500 text-white px-6 py-3 rounded text-lg font-semibold hover:bg-green-600 transition">
                        Clock In
                    </button>
                    <button onClick={handleClockOut} className="bg-orange-500 text-white px-6 py-3 rounded text-lg font-semibold hover:bg-orange-600 transition">
                        Clock Out
                    </button>
                </div>
                {message && <p className="text-green-600 font-medium">{message}</p>}
                {error && <p className="text-red-500 font-medium">{error}</p>}
            </div>

            <h3 className="text-xl font-bold text-gray-700 mb-4">My Attendance History</h3>
            <div className="bg-white shadow-md rounded overflow-x-auto">
                <table className="min-w-full table-auto">
                    <thead>
                        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                            <th className="py-3 px-6 text-left">Date</th>
                            <th className="py-3 px-6 text-left">Clock In</th>
                            <th className="py-3 px-6 text-left">Clock Out</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                        {history.map((record) => (
                            <tr key={record.id} className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-6 text-left">{record.date}</td>
                                <td className="py-3 px-6 text-left">{record.clockInTime ? new Date(record.clockInTime).toLocaleTimeString() : '-'}</td>
                                <td className="py-3 px-6 text-left">{record.clockOutTime ? new Date(record.clockOutTime).toLocaleTimeString() : '-'}</td>
                            </tr>
                        ))}
                        {history.length === 0 && (
                            <tr>
                                <td colSpan="3" className="py-3 px-6 text-center">No history found</td>
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

export default Attendance;
