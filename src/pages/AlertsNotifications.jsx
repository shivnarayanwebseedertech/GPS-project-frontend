import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import LoadingSpinner from "../components/LoadingSpinner";

const AlertsNotifications = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("alerts");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const [alerts, setAlerts] = useState([]);
  const [notifications, setNotifications] = useState([]);

  // Sample data - replace with actual API calls
  useEffect(() => {
    const fetchAlertsAndNotifications = async () => {
      setLoading(true);

      // Simulate API call
      setTimeout(() => {
        setAlerts([
          {
            id: 1,
            type: "speed_violation",
            severity: "high",
            title: "Speed Limit Exceeded",
            message:
              "Vehicle TN01AB1234 exceeded speed limit (95 km/h in 80 km/h zone)",
            truck: "TN01AB1234",
            driver: "John Doe",
            location: "Chennai Highway",
            timestamp: "2025-09-03T10:30:00Z",
            isRead: false,
            isResolved: false,
          },
          {
            id: 2,
            type: "geofence_violation",
            severity: "medium",
            title: "Geofence Exit Alert",
            message: "Vehicle TN02CD5678 has exited authorized delivery zone",
            truck: "TN02CD5678",
            driver: "Mike Smith",
            location: "Mumbai Industrial Area",
            timestamp: "2025-09-03T09:45:00Z",
            isRead: true,
            isResolved: false,
          },
          {
            id: 3,
            type: "maintenance",
            severity: "medium",
            title: "Maintenance Due",
            message:
              "Vehicle TN03EF9012 is due for scheduled maintenance (5000 km reached)",
            truck: "TN03EF9012",
            driver: "Sarah Wilson",
            location: "Delhi Service Center",
            timestamp: "2025-09-03T08:15:00Z",
            isRead: false,
            isResolved: false,
          },
          {
            id: 4,
            type: "idle_time",
            severity: "low",
            title: "Extended Idle Time",
            message: "Vehicle TN04GH3456 has been idle for 25 minutes",
            truck: "TN04GH3456",
            driver: "Lisa Brown",
            location: "Bangalore Rest Stop",
            timestamp: "2025-09-03T07:30:00Z",
            isRead: true,
            isResolved: true,
          },
        ]);

        setNotifications([
          {
            id: 1,
            type: "system",
            title: "System Maintenance Scheduled",
            message:
              "Scheduled system maintenance on September 5th, 2025 from 2:00 AM to 4:00 AM IST",
            timestamp: "2025-09-03T06:00:00Z",
            isRead: false,
            priority: "high",
          },
          {
            id: 2,
            type: "user",
            title: "New User Added",
            message:
              'New operator "David Johnson" has been added to the system',
            timestamp: "2025-09-02T16:30:00Z",
            isRead: true,
            priority: "low",
          },
          {
            id: 3,
            type: "report",
            title: "Monthly Report Generated",
            message:
              "August 2025 fleet performance report is ready for download",
            timestamp: "2025-09-01T09:00:00Z",
            isRead: false,
            priority: "medium",
          },
        ]);

        setLoading(false);
      }, 1000);
    };

    fetchAlertsAndNotifications();
  }, []);

  const getAlertIcon = (type, severity) => {
    const severityColors = {
      high: "text-red-600 bg-red-100",
      medium: "text-orange-600 bg-orange-100",
      low: "text-yellow-600 bg-yellow-100",
    };

    const typeIcons = {
      speed_violation: "M13 10V3L4 14h7v7l9-11h-7z",
      geofence_violation:
        "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z",
      maintenance:
        "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z",
      idle_time: "M12 8v4l3 3m6 6a9 9 0 11-18 0 9 9 0 0118 0z",
    };

    return (
      <div
        className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center ${severityColors[severity]}`}
      >
        <svg
          className="w-4 h-4 sm:w-5 sm:h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={typeIcons[type]}
          />
        </svg>
      </div>
    );
  };

  const getNotificationIcon = (type, priority) => {
    const priorityColors = {
      high: "text-red-600 bg-red-100",
      medium: "text-blue-600 bg-blue-100",
      low: "text-gray-600 bg-gray-100",
    };

    const typeIcons = {
      system: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
      user: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
      report:
        "M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
    };

    return (
      <div
        className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center ${priorityColors[priority]}`}
      >
        <svg
          className="w-4 h-4 sm:w-5 sm:h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={typeIcons[type]}
          />
        </svg>
      </div>
    );
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));

    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`;
    }
  };

  const markAsRead = (type, id) => {
    if (type === "alert") {
      setAlerts(
        alerts.map((alert) =>
          alert.id === id ? { ...alert, isRead: true } : alert
        )
      );
    } else {
      setNotifications(
        notifications.map((notification) =>
          notification.id === id
            ? { ...notification, isRead: true }
            : notification
        )
      );
    }
  };

  const resolveAlert = (id) => {
    setAlerts(
      alerts.map((alert) =>
        alert.id === id ? { ...alert, isResolved: true } : alert
      )
    );
  };

  const filteredAlerts = alerts.filter((alert) => {
    if (selectedFilter === "all") return true;
    if (selectedFilter === "unread") return !alert.isRead;
    if (selectedFilter === "unresolved") return !alert.isResolved;
    return alert.severity === selectedFilter;
  });

  const filteredNotifications = notifications.filter((notification) => {
    if (selectedFilter === "all") return true;
    if (selectedFilter === "unread") return !notification.isRead;
    return notification.priority === selectedFilter;
  });

  const tabs = [
    {
      id: "alerts",
      name: "Alerts",
      shortName: "Alerts",
      count: alerts.filter((a) => !a.isRead).length,
    },
    {
      id: "notifications",
      name: "Notifications",
      shortName: "Notifs",
      count: notifications.filter((n) => !n.isRead).length,
    },
  ];

  if (loading) {
    return (
      <div className="p-12 text-center">
        <LoadingSpinner text="Loading alerts and notifications..." />
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Page Header */}
      <PageHeader
        title="Alerts & Notifications"
        subtitle="Monitor fleet alerts and system notifications"
        showBackButton={false}
      />

      {/* Overview Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-3 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600">
                Critical Alerts
              </p>
              <p className="text-lg sm:text-3xl font-bold text-red-600 mt-1 sm:mt-2">
                {
                  alerts.filter((a) => a.severity === "high" && !a.isResolved)
                    .length
                }
              </p>
            </div>
            <div className="w-8 h-8 sm:w-12 sm:h-12 bg-red-100 rounded-lg sm:rounded-xl flex items-center justify-center">
              <svg
                className="w-4 h-4 sm:w-6 sm:h-6 text-red-600"
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
        </div>

        <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-3 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600">
                Unread Alerts
              </p>
              <p className="text-lg sm:text-3xl font-bold text-orange-600 mt-1 sm:mt-2">
                {alerts.filter((a) => !a.isRead).length}
              </p>
            </div>
            <div className="w-8 h-8 sm:w-12 sm:h-12 bg-orange-100 rounded-lg sm:rounded-xl flex items-center justify-center">
              <svg
                className="w-4 h-4 sm:w-6 sm:h-6 text-orange-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-3 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600">
                Resolved Today
              </p>
              <p className="text-lg sm:text-3xl font-bold text-green-600 mt-1 sm:mt-2">
                {alerts.filter((a) => a.isResolved).length}
              </p>
            </div>
            <div className="w-8 h-8 sm:w-12 sm:h-12 bg-green-100 rounded-lg sm:rounded-xl flex items-center justify-center">
              <svg
                className="w-4 h-4 sm:w-6 sm:h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-3 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600">
                New Notifications
              </p>
              <p className="text-lg sm:text-3xl font-bold text-blue-600 mt-1 sm:mt-2">
                {notifications.filter((n) => !n.isRead).length}
              </p>
            </div>
            <div className="w-8 h-8 sm:w-12 sm:h-12 bg-blue-100 rounded-lg sm:rounded-xl flex items-center justify-center">
              <svg
                className="w-4 h-4 sm:w-6 sm:h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Tab Navigation */}
        <div className="border-b border-gray-200">
          <nav className="flex px-4 sm:px-6" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-3 sm:py-4 px-1 sm:px-2 border-b-2 font-medium text-xs sm:text-sm transition-colors ${
                  activeTab === tab.id
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <span className="hidden sm:inline">{tab.name}</span>
                <span className="sm:hidden">{tab.shortName}</span>
                {tab.count > 0 && (
                  <span className="bg-red-100 text-red-600 text-xs font-semibold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Filters */}
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center gap-2 sm:gap-4">
            <span className="text-xs sm:text-sm font-medium text-gray-700">
              Filter:
            </span>
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="px-2 sm:px-3 py-1 sm:py-2 border border-gray-200 rounded-md sm:rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-xs sm:text-sm"
            >
              <option value="all">All</option>
              <option value="unread">Unread</option>
              {activeTab === "alerts" && (
                <>
                  <option value="unresolved">Unresolved</option>
                  <option value="high">High Severity</option>
                  <option value="medium">Medium Severity</option>
                  <option value="low">Low Severity</option>
                </>
              )}
              {activeTab === "notifications" && (
                <>
                  <option value="high">High Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="low">Low Priority</option>
                </>
              )}
            </select>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-3 sm:p-6">
          {activeTab === "alerts" && (
            <div className="space-y-3 sm:space-y-4">
              {filteredAlerts.length === 0 ? (
                <div className="text-center py-8 sm:py-12">
                  <svg
                    className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-3 sm:mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                  <p className="text-gray-500 font-medium text-sm sm:text-base">
                    No alerts found
                  </p>
                  <p className="text-xs sm:text-sm text-gray-400 mt-1">
                    All alerts have been resolved or none match the current
                    filter
                  </p>
                </div>
              ) : (
                filteredAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`p-3 sm:p-4 border rounded-lg sm:rounded-xl transition-colors ${
                      alert.isRead
                        ? "border-gray-200 bg-gray-50"
                        : "border-indigo-200 bg-indigo-50"
                    }`}
                  >
                    <div className="flex items-start gap-2 sm:gap-4">
                      {getAlertIcon(alert.type, alert.severity)}

                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2 gap-2">
                          <div className="flex-1">
                            <h4 className="text-xs sm:text-sm font-semibold text-gray-900">
                              {alert.title}
                            </h4>
                            <p className="text-xs sm:text-sm text-gray-600 mt-1 line-clamp-2">
                              {alert.message}
                            </p>
                          </div>
                          <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                            {alert.isResolved ? (
                              <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                                Resolved
                              </span>
                            ) : (
                              <span
                                className={`px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs font-semibold rounded-full ${
                                  alert.severity === "high"
                                    ? "bg-red-100 text-red-800"
                                    : alert.severity === "medium"
                                    ? "bg-orange-100 text-orange-800"
                                    : "bg-yellow-100 text-yellow-800"
                                }`}
                              >
                                {alert.severity}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                          <div className="flex flex-wrap gap-2 sm:gap-4 text-xs text-gray-500">
                            <span className="truncate">
                              Vehicle: {alert.truck}
                            </span>
                            <span className="truncate">
                              Driver: {alert.driver}
                            </span>
                            <span className="hidden sm:inline truncate">
                              Location: {alert.location}
                            </span>
                            <span>{formatTime(alert.timestamp)}</span>
                          </div>

                          <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
                            {!alert.isRead && (
                              <button
                                onClick={() => markAsRead("alert", alert.id)}
                                className="px-2 sm:px-3 py-1 text-xs border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors"
                              >
                                Mark Read
                              </button>
                            )}
                            {!alert.isResolved && (
                              <button
                                onClick={() => resolveAlert(alert.id)}
                                className="px-2 sm:px-3 py-1 text-xs border border-green-300 text-green-700 rounded hover:bg-green-50 transition-colors"
                              >
                                Resolve
                              </button>
                            )}
                            <button
                              onClick={() =>
                                navigate(
                                  `/trucks/${
                                    alert.truck.replace(/\D/g, "") || "1"
                                  }`
                                )
                              }
                              className="px-2 sm:px-3 py-1 text-xs border border-indigo-300 text-indigo-700 rounded hover:bg-indigo-50 transition-colors"
                            >
                              View Truck
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="space-y-3 sm:space-y-4">
              {filteredNotifications.length === 0 ? (
                <div className="text-center py-8 sm:py-12">
                  <svg
                    className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-3 sm:mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                    />
                  </svg>
                  <p className="text-gray-500 font-medium text-sm sm:text-base">
                    No notifications found
                  </p>
                  <p className="text-xs sm:text-sm text-gray-400 mt-1">
                    All notifications have been read or none match the current
                    filter
                  </p>
                </div>
              ) : (
                filteredNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-3 sm:p-4 border rounded-lg sm:rounded-xl transition-colors ${
                      notification.isRead
                        ? "border-gray-200 bg-gray-50"
                        : "border-blue-200 bg-blue-50"
                    }`}
                  >
                    <div className="flex items-start gap-2 sm:gap-4">
                      {getNotificationIcon(
                        notification.type,
                        notification.priority
                      )}

                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2 gap-2">
                          <div className="flex-1">
                            <h4 className="text-xs sm:text-sm font-semibold text-gray-900">
                              {notification.title}
                            </h4>
                            <p className="text-xs sm:text-sm text-gray-600 mt-1 line-clamp-2">
                              {notification.message}
                            </p>
                          </div>
                          <span
                            className={`px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs font-semibold rounded-full flex-shrink-0 ${
                              notification.priority === "high"
                                ? "bg-red-100 text-red-800"
                                : notification.priority === "medium"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {notification.priority}
                          </span>
                        </div>

                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs text-gray-500">
                            {formatTime(notification.timestamp)}
                          </span>

                          {!notification.isRead && (
                            <button
                              onClick={() =>
                                markAsRead("notification", notification.id)
                              }
                              className="px-2 sm:px-3 py-1 text-xs border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors"
                            >
                              Mark Read
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlertsNotifications;
