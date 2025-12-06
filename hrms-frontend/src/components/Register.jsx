import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../services/auth.service';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('EMPLOYEE');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        try {
            await authService.register(username, password, role);
            setMessage('Registration successful! Redirecting to login...');
            setTimeout(() => {
                navigate('/login');
            }, 1500);
        } catch (err) {
            setError(err.response?.data || 'Registration failed');
        }
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white'
        }}>
            <h1 className="text-5xl font-bold mb-8">Join HRMS</h1>

            <div className="w-full max-w-sm">
                <h3 className="text-xl font-semibold text-center mb-6">Create Account</h3>
                <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                        <label className="block text-sm mb-2">Username</label>
                        <input
                            type="text"
                            placeholder="Choose a username"
                            className="w-full p-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:border-blue-500"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm mb-2">Password</label>
                        <input
                            type="password"
                            placeholder="Create a password"
                            className="w-full p-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:border-blue-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm mb-2">Role</label>
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="w-full p-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:border-blue-500 text-white"
                        >
                            <option value="EMPLOYEE">Employee</option>
                            <option value="HR">HR</option>
                            <option value="ADMIN">Admin</option>
                        </select>
                    </div>

                    {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
                    {message && <p className="text-green-400 text-sm mt-2">{message}</p>}

                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded transition mt-4">
                        Register Now
                    </button>

                    <div className="text-center mt-4">
                        <Link to="/login" className="text-sm text-white font-bold hover:text-gray-200">
                            Already have an account? Sign In
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
