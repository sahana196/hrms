import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import leaveService from '../services/leave.service';
import authService from '../services/auth.service';

const LeaveList = () => {
    const [leaves, setLeaves] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false); // Simplified check
    const [showForm, setShowForm] = useState(false);
    const [newLeave, setNewLeave] = useState({ startDate: '', endDate: '', reason: '' });

    useEffect(() => {
        // Simple role check based on what we know (in real app check token roles)
        // For this demo, let's assume we fetch all if the user tries to toggle admin view or by default
        loadLeaves();
    }, [isAdmin]);

    const loadLeaves = async () => {
        try {
            // Ideally check user role from token decode
            // Here we try to fetch 'all' first, if 403 then 'my-leaves'
            try {
                const response = await leaveService.getAllLeaves();
                setLeaves(response.data);
                setIsAdmin(true); // If this succeeds, user is likely admin/hr
            } catch (e) {
                const response = await leaveService.getMyLeaves();
                setLeaves(response.data);
                setIsAdmin(false);
            }
        } catch (error) {
            console.error("Error loading leaves", error);
        }
    };

    const handleApply = async (e) => {
        e.preventDefault();
        try {
            await leaveService.applyForLeave(newLeave);
            setShowForm(false);
            setNewLeave({ startDate: '', endDate: '', reason: '' });
            loadLeaves(); // Reload list
        } catch (error) {
            alert('Failed to apply for leave');
        }
    };

    const handleStatusUpdate = async (id, status) => {
        try {
            await leaveService.updateLeaveStatus(id, status);
            loadLeaves();
        } catch (error) {
            alert('Failed to update status');
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Leave Management</h2>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    {showForm ? 'Cancel' : 'Apply for Leave'}
                </button>
            </div>

            {showForm && (
                <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
                    <h3 className="text-xl font-semibold mb-4">New Leave Request</h3>
                    <form onSubmit={handleApply} className="grid grid-cols-1 gap-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-700">Start Date</label>
                                <input
                                    type="date"
                                    className="w-full px-4 py-2 border rounded"
                                    value={newLeave.startDate}
                                    onChange={(e) => setNewLeave({ ...newLeave, startDate: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">End Date</label>
                                <input
                                    type="date"
                                    className="w-full px-4 py-2 border rounded"
                                    value={newLeave.endDate}
                                    onChange={(e) => setNewLeave({ ...newLeave, endDate: e.target.value })}
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-gray-700">Reason</label>
                            <textarea
                                className="w-full px-4 py-2 border rounded"
                                value={newLeave.reason}
                                onChange={(e) => setNewLeave({ ...newLeave, reason: e.target.value })}
                                required
                            />
                        </div>
                        <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">Submit Request</button>
                    </form>
                </div>
            )}

            <div className="bg-white shadow-md rounded overflow-x-auto">
                <table className="min-w-full table-auto">
                    <thead>
                        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                            {isAdmin && <th className="py-3 px-6 text-left">Employee</th>}
                            <th className="py-3 px-6 text-left">Start Date</th>
                            <th className="py-3 px-6 text-left">End Date</th>
                            <th className="py-3 px-6 text-left">Reason</th>
                            <th className="py-3 px-6 text-center">Status</th>
                            <th className="py-3 px-6 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                        {leaves.map((leave) => (
                            <tr key={leave.id} className="border-b border-gray-200 hover:bg-gray-100">
                                {isAdmin && <td className="py-3 px-6 text-left font-medium">{leave.user?.username}</td>}
                                <td className="py-3 px-6 text-left">{leave.startDate}</td>
                                <td className="py-3 px-6 text-left">{leave.endDate}</td>
                                <td className="py-3 px-6 text-left">{leave.reason}</td>
                                <td className="py-3 px-6 text-center">
                                    <span className={`px-3 py-1 rounded-full text-xs 
                                        ${leave.status === 'APPROVED' ? 'bg-green-200 text-green-800' :
                                            leave.status === 'REJECTED' ? 'bg-red-200 text-red-800' : 'bg-yellow-200 text-yellow-800'}`}>
                                        {leave.status}
                                    </span>
                                </td>
                                <td className="py-3 px-6 text-center">
                                    {isAdmin && leave.status === 'PENDING' && (
                                        <div className="flex item-center justify-center space-x-2">
                                            <button onClick={() => handleStatusUpdate(leave.id, 'APPROVED')} className="w-4 transform hover:text-green-500 hover:scale-110">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                </svg>
                                            </button>
                                            <button onClick={() => handleStatusUpdate(leave.id, 'REJECTED')} className="w-4 transform hover:text-red-500 hover:scale-110">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="mt-4">
                <Link to="/dashboard" className="text-blue-600 hover:underline">Back to Dashboard</Link>
            </div>
        </div>
    );
};

export default LeaveList;
