import React from 'react';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from './contexts/AuthContext.jsx';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import UserManagement from './pages/UserManagement.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

function App() {
  const { modules } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route
          path="/"
          element={
            <Layout modules={modules}>
              <Dashboard />
            </Layout>
          }
        />
        <Route
          path="/users"
          element={
            <Layout modules={modules}>
              <UserManagement />
            </Layout>
          }
        />
        <Route
          path="/reports"
          element={
            <Layout modules={modules}>
              <h1>reports page</h1>
            </Layout>
          }
        />
        <Route
          path="/settings"
          element={
            <Layout modules={modules}>
              <h1>settings page</h1>
            </Layout>
          }
        />
        {/* Add more routes here as needed */}
      </Route>
    </Routes>
  );
}

export default App;
