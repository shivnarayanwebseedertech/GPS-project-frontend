import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import PageHeader from "../components/PageHeader";
import LoadingSpinner from "../components/LoadingSpinner";
import PasswordChangeForm from "../components/PasswordChangeForm";

const Settings = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState("general");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [settings, setSettings] = useState({
    // General Settings
    systemName: "GPS Fleet Tracker",
    companyName: "Fleet Management Co.",
    timezone: "Asia/Kolkata",
    language: "en",

    // Notification Settings
    emailNotifications: true,
    smsNotifications: false,
    alertEmail: "admin@company.com",
    notificationSound: true,

    // Alert Thresholds
    speedThreshold: 80, // km/h
    idleThreshold: 15, // minutes
    geofenceAlerts: true,
    maintenanceAlerts: true,

    // Map Settings
    mapProvider: "google",
    defaultZoom: 13,
    trafficLayer: true,
    satelliteView: false,

    // Data Retention
    gpsDataRetention: 90, // days
    videoDataRetention: 7, // days
    reportDataRetention: 365, // days

    // Security Settings
    sessionTimeout: 30, // minutes
    passwordExpiry: 90, // days
    twoFactorAuth: false,
    apiAccess: true,
  });

  useEffect(() => {
    // Simulate loading settings from API
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const handleChange = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Settings saved:", settings);
      setSaved(true);
    } catch (err) {
      console.error("Failed to save settings:", err);
    } finally {
      setSaving(false);
    }
  };

  const resetToDefaults = () => {
    if (
      window.confirm(
        "Are you sure you want to reset all settings to default values?"
      )
    ) {
      setSettings({
        systemName: "GPS Fleet Tracker",
        companyName: "Fleet Management Co.",
        timezone: "Asia/Kolkata",
        language: "en",
        emailNotifications: true,
        smsNotifications: false,
        alertEmail: "admin@company.com",
        notificationSound: true,
        speedThreshold: 80,
        idleThreshold: 15,
        geofenceAlerts: true,
        maintenanceAlerts: true,
        mapProvider: "google",
        defaultZoom: 13,
        trafficLayer: true,
        satelliteView: false,
        gpsDataRetention: 90,
        videoDataRetention: 7,
        reportDataRetention: 365,
        sessionTimeout: 30,
        passwordExpiry: 90,
        twoFactorAuth: false,
        apiAccess: true,
      });
      setSaved(false);
    }
  };

  const tabs = [
    {
      id: "general",
      name: "General",
      shortName: "General",
      icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z",
    },
    {
      id: "notifications",
      name: "Notifications",
      shortName: "Alerts",
      icon: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9",
    },
    {
      id: "alerts",
      name: "Alert Thresholds",
      shortName: "Limits",
      icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z",
    },
    {
      id: "maps",
      name: "Maps & Location",
      shortName: "Maps",
      icon: "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7",
    },
    {
      id: "data",
      name: "Data & Storage",
      shortName: "Storage",
      icon: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4",
    },
    {
      id: "security",
      name: "Security & Privacy",
      shortName: "Security",
      icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
    },
  ];

  if (loading) {
    return (
      <div className="p-12 text-center">
        <LoadingSpinner text="Loading settings..." />
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Page Header */}
      <PageHeader
        title="Settings"
        titleIcon="M12 15.5A3.5 3.5 0 0 1 8.5 12A3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5 3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97c0-.33-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.31-.61-.22l-2.49 1c-.52-.39-1.06-.73-1.69-.98l-.37-2.65A.506.506 0 0 0 14 2h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.22-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1c0 .33.03.65.07.97l-2.11 1.66c-.19.15-.25.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4 1.06.74 1.69.99l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.63-.26 1.17-.59 1.69-.99l2.49 1.01c.22.08.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.66Z"

        iconBgColor="bg-orange-500"
        subtitle="Manage system preferences and configurations"
        actionButton={{
          label: "Save Changes",
          onClick: () => console.log("Save settings"),
          icon: "M5 13l4 4L19 7",
        }}
        showBackButton={false}
      />

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Mobile Tab Navigation */}
        <div className="sm:hidden border-b border-gray-200">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-full flex items-center justify-between p-4 text-left"
          >
            <div className="flex items-center gap-2">
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
                  d={tabs.find((tab) => tab.id === activeTab)?.icon}
                />
              </svg>
              <span className="font-medium text-gray-900">
                {tabs.find((tab) => tab.id === activeTab)?.shortName}
              </span>
            </div>
            <svg
              className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                mobileMenuOpen ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {mobileMenuOpen && (
            <div className="border-t border-gray-200">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                    activeTab === tab.id
                      ? "bg-indigo-50 text-indigo-600 border-r-2 border-indigo-600"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
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
                      d={tab.icon}
                    />
                  </svg>
                  <span className="font-medium">{tab.shortName}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Desktop Tab Navigation */}
        <div className="hidden sm:block border-b border-gray-200">
          <nav className="flex overflow-x-auto px-4 sm:px-6" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-4 px-3 lg:px-4 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
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
                    d={tab.icon}
                  />
                </svg>
                <span className="hidden sm:inline">{tab.name}</span>
                <span className="sm:hidden">{tab.shortName}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6">
          {/* General Settings */}
          {activeTab === "general" && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">
                General Settings
              </h3>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    System Name
                  </label>
                  <input
                    type="text"
                    value={settings.systemName}
                    onChange={(e) => handleChange("systemName", e.target.value)}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-sm sm:text-base"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={settings.companyName}
                    onChange={(e) =>
                      handleChange("companyName", e.target.value)
                    }
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-sm sm:text-base"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Timezone
                  </label>
                  <select
                    value={settings.timezone}
                    onChange={(e) => handleChange("timezone", e.target.value)}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-sm sm:text-base"
                  >
                    <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                    <option value="UTC">UTC</option>
                    <option value="America/New_York">
                      America/New_York (EST)
                    </option>
                    <option value="Europe/London">Europe/London (GMT)</option>
                    <option value="Asia/Tokyo">Asia/Tokyo (JST)</option>
                  </select>
                </div>

                {/* <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Language
                  </label>
                  <select
                    value={settings.language}
                    onChange={(e) => handleChange('language', e.target.value)}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-sm sm:text-base"
                  >
                    <option value="en">English</option>
                    <option value="hi">Hindi</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                  </select>
                </div> */}
              </div>
            </div>
          )}

          {/* Notification Settings */}
          {activeTab === "notifications" && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Notification Settings
              </h3>

              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 bg-gray-50 rounded-lg sm:rounded-xl gap-3 sm:gap-0">
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900">
                      Email Notifications
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-500">
                      Receive alerts via email
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.emailNotifications}
                      onChange={(e) =>
                        handleChange("emailNotifications", e.target.checked)
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 bg-gray-50 rounded-lg sm:rounded-xl gap-3 sm:gap-0">
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900">
                      SMS Notifications
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-500">
                      Receive alerts via SMS
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.smsNotifications}
                      onChange={(e) =>
                        handleChange("smsNotifications", e.target.checked)
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Alert Email Address
                  </label>
                  <input
                    type="email"
                    value={settings.alertEmail}
                    onChange={(e) => handleChange("alertEmail", e.target.value)}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-sm sm:text-base"
                    placeholder="alerts@company.com"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Alert Settings */}
          {activeTab === "alerts" && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Alert Thresholds
              </h3>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Speed Threshold (km/h)
                  </label>
                  <input
                    type="number"
                    min="10"
                    max="200"
                    value={settings.speedThreshold}
                    onChange={(e) =>
                      handleChange("speedThreshold", parseInt(e.target.value))
                    }
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-sm sm:text-base"
                  />
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    Alert when vehicle exceeds this speed
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Idle Time Threshold (minutes)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="120"
                    value={settings.idleThreshold}
                    onChange={(e) =>
                      handleChange("idleThreshold", parseInt(e.target.value))
                    }
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-sm sm:text-base"
                  />
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    Alert when vehicle is idle for this duration
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 bg-gray-50 rounded-lg sm:rounded-xl gap-3 sm:gap-0">
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900">
                      Geofence Alerts
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-500">
                      Alert when vehicles enter/exit geofences
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.geofenceAlerts}
                      onChange={(e) =>
                        handleChange("geofenceAlerts", e.target.checked)
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 bg-gray-50 rounded-lg sm:rounded-xl gap-3 sm:gap-0">
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900">
                      Maintenance Alerts
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-500">
                      Alert for scheduled maintenance
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.maintenanceAlerts}
                      onChange={(e) =>
                        handleChange("maintenanceAlerts", e.target.checked)
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Map Settings */}
          {activeTab === "maps" && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Map Configuration
              </h3>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Map Provider
                  </label>
                  <select
                    value={settings.mapProvider}
                    onChange={(e) =>
                      handleChange("mapProvider", e.target.value)
                    }
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-sm sm:text-base"
                  >
                    <option value="google">Google Maps</option>
                    <option value="openstreet">OpenStreetMap</option>
                    <option value="mapbox">Mapbox</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Default Zoom Level
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    value={settings.defaultZoom}
                    onChange={(e) =>
                      handleChange("defaultZoom", parseInt(e.target.value))
                    }
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs sm:text-sm text-gray-500 mt-1">
                    <span>1 (World)</span>
                    <span>Current: {settings.defaultZoom}</span>
                    <span>20 (Street)</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 bg-gray-50 rounded-lg sm:rounded-xl gap-3 sm:gap-0">
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900">
                      Traffic Layer
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-500">
                      Show real-time traffic information
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.trafficLayer}
                      onChange={(e) =>
                        handleChange("trafficLayer", e.target.checked)
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 bg-gray-50 rounded-lg sm:rounded-xl gap-3 sm:gap-0">
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900">
                      Satellite View
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-500">
                      Default to satellite imagery
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.satelliteView}
                      onChange={(e) =>
                        handleChange("satelliteView", e.target.checked)
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Data & Storage Settings */}
          {activeTab === "data" && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Data Retention Policies
              </h3>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    GPS Data Retention (days)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="365"
                    value={settings.gpsDataRetention}
                    onChange={(e) =>
                      handleChange("gpsDataRetention", parseInt(e.target.value))
                    }
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-sm sm:text-base"
                  />
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    How long to keep GPS tracking data
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Video Data Retention (days)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="30"
                    value={settings.videoDataRetention}
                    onChange={(e) =>
                      handleChange(
                        "videoDataRetention",
                        parseInt(e.target.value)
                      )
                    }
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-sm sm:text-base"
                  />
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    How long to keep camera recordings
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Report Data Retention (days)
                  </label>
                  <input
                    type="number"
                    min="30"
                    max="1095"
                    value={settings.reportDataRetention}
                    onChange={(e) =>
                      handleChange(
                        "reportDataRetention",
                        parseInt(e.target.value)
                      )
                    }
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-sm sm:text-base"
                  />
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    How long to keep generated reports
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Security Settings */}
          {activeTab === "security" && (
            <div className="space-y-8">
              <h3 className="text-lg font-semibold text-gray-900">
                Security Configuration
              </h3>

              {/* Password Change Component */}
              <PasswordChangeForm />

              {/* Other Security Settings */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Session Timeout (minutes)
                  </label>
                  <input
                    type="number"
                    min="5"
                    max="480"
                    value={settings.sessionTimeout}
                    onChange={(e) =>
                      handleChange("sessionTimeout", parseInt(e.target.value))
                    }
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-sm sm:text-base"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password Expiry (days)
                  </label>
                  <input
                    type="number"
                    min="30"
                    max="365"
                    value={settings.passwordExpiry}
                    onChange={(e) =>
                      handleChange("passwordExpiry", parseInt(e.target.value))
                    }
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-sm sm:text-base"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 bg-gray-50 rounded-lg sm:rounded-xl gap-3 sm:gap-0">
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900">
                      API Access
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-500">
                      Allow third-party API access
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.apiAccess}
                      onChange={(e) =>
                        handleChange("apiAccess", e.target.checked)
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-6 border-t border-gray-200 gap-4 sm:gap-0">
            <button
              type="button"
              onClick={resetToDefaults}
              className="order-2 sm:order-1 px-4 sm:px-6 py-2.5 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 font-medium transition-colors text-sm sm:text-base"
            >
              Reset to Defaults
            </button>

            <div className="order-1 sm:order-2 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
              {saved && (
                <div className="flex items-center justify-center sm:justify-start gap-2 text-green-600">
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
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-sm">Settings saved successfully!</span>
                </div>
              )}

              <button
                type="submit"
                disabled={saving}
                className="w-full sm:w-auto px-4 sm:px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium transition-colors shadow-lg disabled:opacity-50 flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                {saving ? (
                  <>
                    <LoadingSpinner showText={false} size="sm" />
                    Saving...
                  </>
                ) : (
                  "Save Settings"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;
