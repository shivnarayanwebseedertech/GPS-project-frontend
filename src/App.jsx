import React from "react";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./contexts/AuthContext.jsx";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import UserManagement from "./pages/UserManagement.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Reports from "./pages/Reports.jsx";
import TruckManagement from "./pages/TruckManagement.jsx";
import TripManagement from "./pages/TripManagement.jsx";
import Settings from "./pages/Settings.jsx";
import LiveCameraFeeds from "./pages/LiveCameraFeeds.jsx";
import RecipientManagement from "./pages/RecipientManagement.jsx";
import TruckDetails from "./pages/TruckDetails.jsx";
import AlertsNotifications from "./pages/AlertsNotifications.jsx";

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
              <Reports />
            </Layout>
          }
        />
        <Route
          path="/settings"
          element={
            <Layout modules={modules}>
              <Settings />
            </Layout>
          }
        />
        <Route
          path="/trucks"
          element={
            <Layout modules={modules}>
              <TruckManagement />
            </Layout>
          }
        />
        <Route
          path="/trips"
          element={
            <Layout modules={modules}>
              <TripManagement />
            </Layout>
          }
        />
        <Route
          path="/feeds"
          element={
            <Layout modules={modules}>
              <LiveCameraFeeds />
            </Layout>
          }
        />
        <Route
          path="/recipients"
          element={
            <Layout modules={modules}>
              <RecipientManagement />
            </Layout>
          }
        />
        <Route
          path="/trucks/:truckId"
          element={
            <Layout modules={modules}>
              <TruckDetails />
            </Layout>
          }
        />
        <Route
          path="/alerts-notifications"
          element={
            <Layout modules={modules}>
              <AlertsNotifications />
            </Layout>
          }
        />

        {/* Add more routes here as needed */}
      </Route>
    </Routes>
  );
}

export default App;
