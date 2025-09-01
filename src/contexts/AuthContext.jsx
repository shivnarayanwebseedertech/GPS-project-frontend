import React, { createContext, useState, useEffect } from 'react';
import { moduleMap } from '../components/Sidebar';

export const AuthContext = createContext();

// const ALL_MODULES = ['dashboard', 'user-management', 'reports', 'settings'];
const ALL_MODULES = Object.keys(moduleMap);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const stored = localStorage.getItem('user');
        return stored ? JSON.parse(stored) : null;
    });

    const [token, setToken] = useState(() => localStorage.getItem('token'));
    const [modules, setModules] = useState([]);

    useEffect(() => {
        if (!user || !user.role) {
            setModules([]);
            return;
        }
        if (user.role === 'admin') {
            setModules(ALL_MODULES); // Admin gets all modules
        } else {
            setModules(user.modules || []); // Regular user gets assigned modules from backend
        }
    }, [user]);

    const loginUser = (userData, token) => {
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', token);
        setUser(userData);
        setToken(token);
    };

    const logoutUser = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setUser(null);
        setToken(null);
        setModules([]);
    };

    return (
        <AuthContext.Provider value={{ user, token, modules, loginUser, logoutUser }}>
            {children}
        </AuthContext.Provider>
    );
};
