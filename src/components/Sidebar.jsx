import React, { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/webseederlogo.png";
import { AuthContext } from "../contexts/AuthContext";

export const moduleMap = {
  dashboard: { label: "Dashboard", path: "/" },
  "user-management": { label: "User Management", path: "/users" },
  reports: { label: "Reports", path: "/reports" },
  settings: { label: "Settings", path: "/settings" },
};

const Sidebar = ({ modules }) => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useContext(AuthContext);

  // Icons for main navigation
  const navigationIcons = {
    dashboard: (
      <svg
        className="w-4 h-4 lg:w-5 lg:h-5 flex-shrink-0"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        />
      </svg>
    ),
    "user-management": (
      <svg
        className="w-4 h-4 lg:w-5 lg:h-5 flex-shrink-0"
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
    ),
    reports: (
      <svg
        className="w-4 h-4 lg:w-5 lg:h-5 flex-shrink-0"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    ),
    settings: (
      <svg
        className="w-4 h-4 lg:w-5 lg:h-5 flex-shrink-0"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
  };

  // Quick Actions data
  const quickActions = [
    {
      label: "Truck Management",
      path: "/trucks",
      icon: (
        <svg
          className="w-4 h-4 lg:w-5 lg:h-5 text-blue-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
          />
        </svg>
      ),
    },
    {
      label: "Trip Management",
      path: "/trips",
      icon: (
        <svg
          className="w-4 h-4 lg:w-5 lg:h-5 text-green-600"
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
      ),
    },
    {
      label: "Live Camera Feeds",
      path: "/feeds",
      icon: (
        <svg
          className="w-4 h-4 lg:w-5 lg:h-5 text-purple-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      label: "Recipients",
      path: "/recipients",
      icon: (
        <svg
          className="w-4 h-4 lg:w-5 lg:h-5 text-orange-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleQuickAction = (path) => {
    navigate(path);
    closeMobileMenu(); // Close mobile menu if open
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest(".sidebar-container")) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Mobile Header with Hamburger */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between p-4">
          <div className="h-8">
            <img
              src={logo}
              className="h-full w-full object-contain object-center"
            />
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span
                className={`bg-gray-600 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
                  isMobileMenuOpen
                    ? "rotate-45 translate-y-1"
                    : "-translate-y-0.5"
                }`}
              ></span>
              <span
                className={`bg-gray-600 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${
                  isMobileMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              ></span>
              <span
                className={`bg-gray-600 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
                  isMobileMenuOpen
                    ? "-rotate-45 -translate-y-1"
                    : "translate-y-0.5"
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
          <div className="h-10">
            <img
              src={logo}
              className="h-full w-full object-contain object-center"
            />
          </div>
          <h1 className="capitalize text-gray-600 italic text-center text-sm">
            Welcome {user?.name === "" ? "admin" : user?.name}!
          </h1>
        </div>

        {/* Single Responsive Alert & Notification Button */}
        <div className="px-3 sm:px-4 py-3 sm:py-4 border-b border-gray-100">
          <button
            onClick={() => {
              navigate("/alerts-notifications");
              closeMobileMenu(); // Close mobile menu if open
            }}
            className="w-full flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 bg-gradient-to-r from-red-50 to-blue-50 text-gray-700 rounded-lg hover:from-red-100 hover:to-blue-100 transition-all duration-200 relative"
          >
            <div className="flex items-center gap-1 sm:gap-2">
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600"
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
            <span className="text-xs sm:text-sm font-medium text-gray-900">
              Alerts & Notifications
            </span>
            {/* Responsive Badge */}
            <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center font-semibold">
              5
            </span>
          </button>
        </div>

        <div className="flex-grow p-4 overflow-y-auto">
          {/* Main Navigation */}
          <ul className="space-y-2">
            {modules.map((mod) => {
              if (!moduleMap[mod]) return null;
              return (
                <li key={mod}>
                  <NavLink
                    to={moduleMap[mod].path}
                    className={({ isActive }) =>
                      `group flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                        isActive
                          ? "bg-indigo-50 text-indigo-700 border-r-2 border-indigo-700"
                          : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
                      }`
                    }
                  >
                    {navigationIcons[mod]}
                    <span className="truncate">{moduleMap[mod].label}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>

          {/* Quick Actions Section */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Quick Actions
            </h3>
            <ul className="space-y-2">
              {quickActions.map(({ label, path, icon }) => (
                <li key={label}>
                  <button
                    onClick={() => handleQuickAction(path)}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 hover:text-indigo-600 transition-all duration-200"
                  >
                    <div className="flex-shrink-0">{icon}</div>
                    <span className="truncate">{label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="p-4 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center px-4 py-3 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            Logout
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <nav
        className={`sidebar-container lg:hidden fixed top-0 left-0 z-50 h-full w-72 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="h-8">
              <img
                src={logo}
                className="h-full w-full object-contain object-center"
              />
            </div>
            <button
              onClick={closeMobileMenu}
              className="p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <h1 className="capitalize text-gray-600 italic text-center text-xs mt-2">
            Welcome {user?.name === "" ? "admin" : user?.name}!
          </h1>
        </div>

        {/* Mobile Single Button */}
        <div className="px-3 py-3 border-b border-gray-100">
          <button
            onClick={() => {
              navigate("/alerts-notifications");
              closeMobileMenu();
            }}
            className="w-full flex items-center gap-2 p-2.5 bg-gradient-to-r from-red-50 to-blue-50 text-gray-700 rounded-lg hover:from-red-100 hover:to-blue-100 transition-all duration-200 relative"
          >
            <div className="flex items-center gap-1">
              {/* <svg
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
              </svg> */}
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
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </div>
            <span className="text-xs font-medium text-gray-900">
              Alerts & Notifications
            </span>
            <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
              5
            </span>
          </button>
        </div>

        <div className="flex-grow p-3 overflow-y-auto">
          {/* Main Navigation - Mobile */}
          <ul className="space-y-1">
            {modules.map((mod) => {
              if (!moduleMap[mod]) return null;
              return (
                <li key={mod}>
                  <NavLink
                    to={moduleMap[mod].path}
                    onClick={closeMobileMenu}
                    className={({ isActive }) =>
                      `group flex items-center gap-2 px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                        isActive
                          ? "bg-indigo-50 text-indigo-700 border-r-2 border-indigo-700"
                          : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
                      }`
                    }
                  >
                    {navigationIcons[mod]}
                    <span className="truncate text-sm">
                      {moduleMap[mod].label}
                    </span>
                  </NavLink>
                </li>
              );
            })}
          </ul>

          {/* Quick Actions Section - Mobile */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Quick Actions
            </h3>
            <ul className="space-y-1">
              {quickActions.map(({ label, path, icon }) => (
                <li key={label}>
                  <button
                    onClick={() => handleQuickAction(path)}
                    className="w-full flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 hover:text-indigo-600 transition-all duration-200"
                  >
                    <div className="flex-shrink-0">{icon}</div>
                    <span className="truncate text-sm">{label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="p-3 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center px-3 py-2.5 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            Logout
          </button>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
