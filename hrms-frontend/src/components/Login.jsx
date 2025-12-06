import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../services/auth.service';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await authService.login(username, password);
            navigate('/dashboard');
        } catch (err) {
            setError('Invalid username or password');
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
            <h1 className="text-6xl font-bold mb-8">HRMS</h1>

            <div className="w-full max-w-sm">
                <h3 className="text-2xl font-semibold text-center mb-6">Login</h3>
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-sm mb-2">User Name</label>
                        <input
                            type="text"
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
                            className="w-full p-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:border-blue-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p className="text-red-400 text-sm">{error}</p>}

                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded transition">
                        Sign In
                    </button>

                    <div className="text-center mt-4">
                        <Link to="/register" className="text-sm text-white font-bold hover:text-gray-200">
                            Don't have an account? Register
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
