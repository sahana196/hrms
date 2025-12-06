import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../services/auth.service';

const Dashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        authService.logout();
        navigate('/login');
    };

    return (
        <div className="flex flex-col min-h-screen relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
                <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-neon-blue/10 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-neon-pink/10 rounded-full blur-[100px]"></div>
            </div>

            {/* Navbar */}
            <div className="flex items-center justify-between px-8 py-5 border-b border-white/10 backdrop-blur-md relative z-10">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-neon-pink to-neon-purple flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-neon-pink/30">H</div>
                    <h1 className="text-2xl font-bold text-white tracking-wide">HRMS <span className="font-light text-gray-400">Dashboard</span></h1>
                </div>
                <div className="flex items-center space-x-6">
                    <span className="text-gray-300 font-medium">Welcome, <span className="text-neon-blue">User</span></span>
                    <button
                        onClick={handleLogout}
                        className="px-5 py-2 text-sm font-semibold text-white border border-white/20 rounded-lg hover:bg-white/10 hover:border-neon-pink transition-all duration-300"
                    >
                        Logout
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 p-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

                    <Link to="/employees" className="card group hover:border-neon-pink/50 transition-all duration-300 transform hover:-translate-y-2">
                        <div className="h-12 w-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-4 group-hover:bg-blue-500/40 transition-colors">
                            <span className="text-2xl">👥</span>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-neon-blue transition-colors">Employees</h3>
                        <p className="text-gray-400 text-sm">Manage employee records, view profiles, and update details.</p>
                        <div className="mt-4 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full w-1/3 bg-neon-blue"></div>
                        </div>
                    </Link>

                    <Link to="/leaves" className="card group hover:border-neon-pink/50 transition-all duration-300 transform hover:-translate-y-2">
                        <div className="h-12 w-12 rounded-full bg-green-500/20 flex items-center justify-center mb-4 group-hover:bg-green-500/40 transition-colors">
                            <span className="text-2xl">🌴</span>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors">Leaves</h3>
                        <p className="text-gray-400 text-sm">View leave requests, approve time off, and check balances.</p>
                        <div className="mt-4 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full w-2/3 bg-green-500"></div>
                        </div>
                    </Link>

                    <Link to="/attendance" className="card group hover:border-neon-pink/50 transition-all duration-300 transform hover:-translate-y-2">
                        <div className="h-12 w-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-4 group-hover:bg-purple-500/40 transition-colors">
                            <span className="text-2xl">🕒</span>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-neon-purple transition-colors">Attendance</h3>
                        <p className="text-gray-400 text-sm">Check-in / Check-out, view daily logs and work hours.</p>
                        <div className="mt-4 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full w-1/2 bg-neon-purple"></div>
                        </div>
                    </Link>

                    <Link to="/audit" className="card group hover:border-neon-pink/50 transition-all duration-300 transform hover:-translate-y-2">
                        <div className="h-12 w-12 rounded-full bg-orange-500/20 flex items-center justify-center mb-4 group-hover:bg-orange-500/40 transition-colors">
                            <span className="text-2xl">🛡️</span>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">Audit Logs</h3>
                        <p className="text-gray-400 text-sm">Monitor system activity, track changes and security events.</p>
                        <div className="mt-4 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full w-1/4 bg-orange-500"></div>
                        </div>
                    </Link>

                </div>
            </div>
        </div>
    );
};

export default Dashboard;
