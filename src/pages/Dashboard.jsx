import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import PageHeader from "../components/PageHeader";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  // Sample data - removed activeTrucks count
  const [dashboardData, setDashboardData] = useState({
    ongoingTrips: 12,
    alerts: 3,
    totalUsers: 45,
  });

  const [recentActivities, setRecentActivities] = useState([
    {
      id: 1,
      type: "trip_started",
      truck: "TN01AB1234",
      time: "2 minutes ago",
      driver: "John Doe",
    },
    {
      id: 2,
      type: "trip_completed",
      truck: "TN02CD5678",
      time: "15 minutes ago",
      driver: "Mike Smith",
    },
    {
      id: 3,
      type: "alert",
      truck: "TN03EF9012",
      time: "1 hour ago",
      driver: "Sarah Wilson",
      message: "Route deviation detected",
    },
    {
      id: 4,
      type: "user_added",
      user: "New Operator: David Johnson",
      time: "2 hours ago",
    },
    {
      id: 5,
      type: "trip_started",
      truck: "TN04GH3456",
      time: "3 hours ago",
      driver: "Lisa Brown",
    },
  ]);

  const [activeTrucks, setActiveTrucks] = useState([
    {
      id: 1,
      vehicleNo: "TN01AB1234",
      driver: "John Doe",
      lat: 13.0827,
      lng: 80.2707,
      status: "Moving",
      speed: "65 km/h",
    },
    {
      id: 2,
      vehicleNo: "TN02CD5678",
      driver: "Mike Smith",
      lat: 12.9716,
      lng: 77.5946,
      status: "Stopped",
      speed: "0 km/h",
    },
    {
      id: 3,
      vehicleNo: "TN03EF9012",
      driver: "Sarah Wilson",
      lat: 11.0168,
      lng: 76.9558,
      status: "Moving",
      speed: "45 km/h",
    },
    {
      id: 4,
      vehicleNo: "TN04GH3456",
      driver: "Lisa Brown",
      lat: 10.8505,
      lng: 76.2711,
      status: "Moving",
      speed: "55 km/h",
    },
  ]);

  const getActivityIcon = (type) => {
    switch (type) {
      case "trip_started":
        return (
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
            <svg
              className="w-4 h-4 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </div>
        );
      case "trip_completed":
        return (
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <svg
              className="w-4 h-4 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        );
      case "alert":
        return (
          <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
            <svg
              className="w-4 h-4 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
        );
      default:
        return (
          <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
            <svg
              className="w-4 h-4 text-indigo-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
        );
    }
  };

  const handleQuickAction = (path) => {
    navigate(path);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <PageHeader
        title="Admin Dashboard"
        subtitle="Welcome back, Admin! Monitor and manage your fleet operations"
        showBackButton={false}
      />

      {/* Overview Cards - Removed Active Trucks Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Ongoing Trips Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Ongoing Trips</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {dashboardData.ongoingTrips}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                />
              </svg>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
              5 scheduled
            </span>
          </div>
        </div>

        {/* Alerts Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Alerts</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {dashboardData.alerts}
              </p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <svg
                className="w-6 h-6 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
              Needs attention
            </span>
          </div>
        </div>

        {/* Total Users Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {dashboardData.totalUsers}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <svg
                className="w-6 h-6 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">
              12 operators
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Grid - Now 50/50 layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Vehicles Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
              Active Vehicles
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              {activeTrucks.map((truck) => (
                <div
                  key={truck.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-semibold">
                      {truck.vehicleNo.slice(-2)}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {truck.vehicleNo}
                      </div>
                      <div className="text-sm text-gray-500">
                        {truck.driver}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">
                        {truck.speed}
                      </div>
                      <div
                        className={`text-xs font-medium ${
                          truck.status === "Moving"
                            ? "text-green-600"
                            : "text-gray-500"
                        }`}
                      >
                        {truck.status}
                      </div>
                    </div>
                    <button
                      onClick={() => handleQuickAction("/trips")}
                      className="px-3 py-1 text-xs font-medium text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
                    >
                      Track
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                Recent Activity
              </h3>
              <button
                onClick={() => handleQuickAction("/reports")}
                className="text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
              >
                View All
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  {getActivityIcon(activity.type)}
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900">
                      {activity.type === "trip_started" &&
                        `Trip started - ${activity.truck}`}
                      {activity.type === "trip_completed" &&
                        `Trip completed - ${activity.truck}`}
                      {activity.type === "alert" &&
                        `Alert - ${activity.truck}`}
                      {activity.type === "user_added" && activity.user}
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5">
                      {activity.driver && `Driver: ${activity.driver}`}
                      {activity.message && ` • ${activity.message}`}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      {activity.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;