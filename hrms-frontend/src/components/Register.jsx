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
        <div className="auth-page">
            <div className="auth-card">
                <h1 className="auth-title">Join HRMS</h1>
                <h2 className="auth-subtitle">Create Account</h2>
                <p className="auth-text">
                    Register to get started with HRMS.
                </p>

                {error && <div className="auth-error">{error}</div>}
                {message && <div className="auth-error" style={{ color: '#4ade80', backgroundColor: 'rgba(74, 222, 128, 0.16)' }}>{message}</div>}

                <form onSubmit={handleRegister} className="auth-form">
                    <label className="auth-label">
                        Username
                        <input
                            type="text"
                            className="auth-input"
                            placeholder="Choose a username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </label>

                    <label className="auth-label">
                        Password
                        <input
                            type="password"
                            className="auth-input"
                            placeholder="Create a password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </label>

                    <label className="auth-label">
                        Role
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="auth-input"
                        >
                            <option value="EMPLOYEE">Employee</option>
                            <option value="HR">HR</option>
                            <option value="ADMIN">Admin</option>
                        </select>
                    </label>

                    <button className="auth-button" type="submit">
                        Register Now
                    </button>
                </form>

                <p className="auth-footer">
                    Already have an account?{" "}
                    <Link to="/login" className="auth-link">
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
