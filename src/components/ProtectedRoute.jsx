import React, { useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { moduleMap } from './Sidebar';

const ProtectedRoute = () => {
    const { token, modules, user } = useContext(AuthContext);
    const location = useLocation();

    // If no token, redirect to login
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // If admin, allow access to all routes
    if (user?.role === 'admin') {
        return <Outlet />;
    }

    // For non-admin users, check module access for ALL routes (including dashboard)
    // Create reverse mapping: path -> required module
    const pathToModule = {};
    Object.entries(moduleMap).forEach(([moduleKey, moduleData]) => {
        pathToModule[moduleData.path] = moduleKey;
    });

    const requiredModule = pathToModule[location.pathname];

    // If current route requires a module and user doesn't have it, redirect to first available module
    if (requiredModule && !modules.includes(requiredModule)) {
        // Find first available module path
        const firstAvailableModule = modules[0];
        const firstAvailablePath = moduleMap[firstAvailableModule]?.path || '/';
        return <Navigate to={firstAvailablePath} replace />;
    }

    // If user somehow has no modules, redirect to login (safety check)
    if (!modules || modules.length === 0) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
