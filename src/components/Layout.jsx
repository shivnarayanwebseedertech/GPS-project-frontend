// src/components/Layout.jsx
import React from 'react';
import Sidebar from './Sidebar';

const Layout = ({ children, modules }) => (
    <div className="flex min-h-screen bg-gray-100">
        <aside className="w-64">
            <Sidebar modules={modules} />
        </aside>
        <main className="flex-grow p-6">{children}</main>
    </div>
);

export default Layout;
