import React, { useState, useEffect, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from "../assets/webseederlogo.png";
import { AuthContext } from '../contexts/AuthContext';

export const moduleMap = {
    dashboard: { label: 'Dashboard', path: '/' },
    'user-management': { label: 'User Management', path: '/users' },
    reports: { label: 'Reports', path: '/reports' },
    settings: { label: 'Settings', path: '/settings' },
};

const Sidebar = ({ modules }) => {
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { user } = useContext(AuthContext);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    // Close mobile menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isMobileMenuOpen && !event.target.closest('.sidebar-container')) {
                setIsMobileMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isMobileMenuOpen]);

    return (
        <>
            {/* Mobile Header with Hamburger */}
            <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
                <div className="flex items-center justify-between p-4">
                    <div className="h-10"><img src={logo} className='h-full w-full object-contain object-center' /></div>
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        aria-label="Toggle menu"
                    >
                        <div className="w-6 h-6 flex flex-col justify-center items-center">
                            <span
                                className={`bg-gray-600 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isMobileMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'
                                    }`}
                            ></span>
                            <span
                                className={`bg-gray-600 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                                    }`}
                            ></span>
                            <span
                                className={`bg-gray-600 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isMobileMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'
                                    }`}
                            ></span>
                        </div>
                    </button>
                </div>
            </div>

            {/* Mobile Overlay */}
            {isMobileMenuOpen && (
                <div className="lg:hidden fixed inset-0 z-40 bg-black/10 bg-opacity-50" />
            )}

            {/* Desktop Sidebar */}
            <nav className="hidden lg:flex flex-col fixed top-0 left-0 h-screen w-64 bg-white border-r border-gray-200 shadow-sm z-30">
                <div className="p-4 space-y-4 border-b border-gray-100">
                    <div className="h-10"><img src={logo} className='h-full w-full object-contain object-center' /></div>
                    <h1 className='capitalize text-gray-600 italic text-center'>Welcome {user.name === "" ? "admin" : user.name}!</h1>
                </div>

                <div className="flex-grow p-4">
                    <ul className="space-y-2">
                        {modules.map((mod) => {
                            if (!moduleMap[mod]) return null;
                            return (
                                <li key={mod}>
                                    <NavLink
                                        to={moduleMap[mod].path}
                                        className={({ isActive }) =>
                                            `group flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${isActive
                                                ? 'bg-indigo-50 text-indigo-700 border-r-2 border-indigo-700'
                                                : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600'
                                            }`
                                        }
                                    >
                                        <span className="truncate">{moduleMap[mod].label}</span>
                                    </NavLink>
                                </li>
                            );
                        })}
                    </ul>
                </div>

                <div className="p-4 border-t border-gray-100">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center px-4 py-3 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Logout
                    </button>
                </div>
            </nav>

            {/* Mobile Sidebar */}
            <nav
                className={`sidebar-container lg:hidden fixed top-0 left-0 z-50 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                        <div className="h-12"><img src={logo} className='h-full w-full object-contain object-center' /></div>
                        <button
                            onClick={closeMobileMenu}
                            className="p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="flex-grow p-4 overflow-y-auto">
                    <ul className="space-y-2">
                        {modules.map((mod) => {
                            if (!moduleMap[mod]) return null;
                            return (
                                <li key={mod}>
                                    <NavLink
                                        to={moduleMap[mod].path}
                                        onClick={closeMobileMenu}
                                        className={({ isActive }) =>
                                            `group flex items-center px-4 py-4 text-base font-medium rounded-lg transition-all duration-200 ${isActive
                                                ? 'bg-indigo-50 text-indigo-700 border-r-2 border-indigo-700'
                                                : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600'
                                            }`
                                        }
                                    >
                                        <span className="truncate">{moduleMap[mod].label}</span>
                                    </NavLink>
                                </li>
                            );
                        })}
                    </ul>
                </div>

                <div className="p-4 border-t border-gray-100">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center px-4 py-4 text-base font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Logout
                    </button>
                </div>
            </nav>
        </>
    );
};

export default Sidebar;
