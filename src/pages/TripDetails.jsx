import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import LoadingSpinner from "../components/LoadingSpinner";

const TripDetails = () => {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState("overview");

  const [tripData, setTripData] = useState(null);
  const [tripEvents, setTripEvents] = useState([]);

  // Sample data - replace with actual API calls
  useEffect(() => {
    const fetchTripDetails = async () => {
      setLoading(true);

      // Simulate API call
      setTimeout(() => {
        setTripData({
          id: tripId,
          tripId: "TR001",
          vehicleNo: "TN01AB1234",
          driverName: "John Doe",
          driverPhoto:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
          vehiclePhoto:
            "https://images.unsplash.com/photo-1558618046-fbd3c650d5f6?w=300&h=200&fit=crop",
          route: {
            from: "Chennai",
            to: "Bangalore",
            distance: "347 km",
            estimatedDuration: "6h 30m",
          },
          status: "ongoing",
          progress: 65,
          startTime: "2025-09-06T08:00:00Z",
          estimatedArrival: "2025-09-06T14:30:00Z",
          actualStartTime: "2025-09-06T08:15:00Z",
          currentLocation: "Hosur Toll Plaza",
          lastUpdated: "2025-09-06T12:30:00Z",
          cargo: {
            type: "Electronics",
            weight: "2.5 tons",
            value: "₹5,50,000",
            description: "Consumer electronics - laptops, phones",
          },
          fuel: {
            startLevel: 95,
            currentLevel: 68,
            consumed: "42 liters",
            efficiency: "8.2 km/l",
          },
          weather: {
            current: "Partly Cloudy",
            temperature: "32°C",
            visibility: "Good",
          },
          checkpoints: [
            {
              name: "Chennai Depot",
              time: "08:15",
              status: "completed",
              delay: "+15 min",
            },
            {
              name: "Sriperumbudur",
              time: "09:30",
              status: "completed",
              delay: "+10 min",
            },
            {
              name: "Hosur Toll",
              time: "12:30",
              status: "current",
              delay: "+5 min",
            },
            {
              name: "Electronic City",
              time: "13:45",
              status: "upcoming",
              delay: "",
            },
            {
              name: "Bangalore Destination",
              time: "14:30",
              status: "upcoming",
              delay: "",
            },
          ],
          expenses: [
            { type: "Fuel", amount: 3200, location: "Chennai", time: "08:00" },
            { type: "Toll", amount: 450, location: "Hosur", time: "12:30" },
            {
              type: "Refreshment",
              amount: 150,
              location: "Hosur",
              time: "12:35",
            },
          ],
        });

        setTripEvents([
          {
            id: 1,
            type: "trip_started",
            title: "Trip Started",
            message: "Trip TR001 started from Chennai Depot",
            timestamp: "2025-09-06T08:15:00Z",
            location: "Chennai, Tamil Nadu",
            icon: "play",
          },
          {
            id: 2,
            type: "checkpoint_reached",
            title: "Checkpoint Reached",
            message: "Reached Sriperumbudur checkpoint",
            timestamp: "2025-09-06T09:30:00Z",
            location: "Sriperumbudur, Tamil Nadu",
            icon: "location",
          },
          {
            id: 3,
            type: "fuel_stop",
            title: "Fuel Stop",
            message: "Fuel purchased - ₹3,200",
            timestamp: "2025-09-06T10:15:00Z",
            location: "Krishnagiri, Tamil Nadu",
            icon: "fuel",
          },
          {
            id: 4,
            type: "toll_payment",
            title: "Toll Payment",
            message: "Toll paid at Hosur - ₹450",
            timestamp: "2025-09-06T12:30:00Z",
            location: "Hosur, Tamil Nadu",
            icon: "payment",
          },
        ]);

        setLoading(false);
      }, 1000);
    };

    if (tripId) {
      fetchTripDetails();
    }
  }, [tripId]);

  const getStatusColor = (status) => {
    const colors = {
      ongoing: "bg-blue-100 text-blue-800",
      completed: "bg-green-100 text-green-800",
      scheduled: "bg-yellow-100 text-yellow-800",
      cancelled: "bg-red-100 text-red-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const getEventIcon = (type) => {
    const icons = {
      trip_started:
        "M14.828 14.828a4 4 0 01-5.656 0M9 10a1 1 0 011-1h4a1 1 0 011 1v.01M15 10v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
      checkpoint_reached:
        "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z",
      fuel_stop:
        "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16",
      toll_payment:
        "M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z",
    };
    return (
      icons[type] || "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    );
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const tabs = [
    {
      id: "overview",
      name: "Overview",
      shortName: "Overview",
      icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
    },
    {
      id: "tracking",
      name: "Live Tracking",
      shortName: "Tracking",
      icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z",
    },
    {
      id: "events",
      name: "Trip Events",
      shortName: "Events",
      icon: "M12 8v4l3 3m6 6a9 9 0 11-18 0 9 9 0 0118 0z",
    },
    {
      id: "expenses",
      name: "Expenses",
      shortName: "Expenses",
      icon: "M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z",
    },
  ];

  if (loading) {
    return (
      <div className="p-8 sm:p-12 text-center">
        <LoadingSpinner text="Loading trip details..." />
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6 p-4 sm:p-0">
      {/* Header */}
      <PageHeader
        title={`Trip Details - ${tripData?.tripId}`}
        subtitle={`${tripData?.route.from} → ${tripData?.route.to} • ${tripData?.vehicleNo}`}
        showBackButton={true}
        backTo="/trips"
      />

      {/* Trip Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h3 className="text-xs sm:text-sm font-medium text-gray-600">
              Status
            </h3>
            <span
              className={`px-2 sm:px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                tripData?.status
              )}`}
            >
              {tripData?.status}
            </span>
          </div>
          <div className="text-xl sm:text-2xl font-bold text-gray-900">
            {tripData?.progress}%
          </div>
          <p className="text-xs sm:text-sm text-gray-600">Progress</p>
        </div>

        <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h3 className="text-xs sm:text-sm font-medium text-gray-600">
              Distance
            </h3>
            <svg
              className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600"
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
          <div className="text-xl sm:text-2xl font-bold text-gray-900">
            {tripData?.route.distance}
          </div>
          <p className="text-xs sm:text-sm text-gray-600">Total Distance</p>
        </div>

        <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h3 className="text-xs sm:text-sm font-medium text-gray-600">
              ETA
            </h3>
            <svg
              className="w-6 h-6 sm:w-8 sm:h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6 6a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div className="text-lg sm:text-2xl font-bold text-gray-900">
            {formatTime(tripData?.estimatedArrival)}
          </div>
          <p className="text-xs sm:text-sm text-gray-600">
            {formatDate(tripData?.estimatedArrival)}
          </p>
        </div>

        <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h3 className="text-xs sm:text-sm font-medium text-gray-600">
              Current Location
            </h3>
            <svg
              className="w-6 h-6 sm:w-8 sm:h-8 text-orange-600"
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
            </svg>
          </div>
          <div className="text-sm sm:text-lg font-bold text-gray-900 truncate">
            {tripData?.currentLocation}
          </div>
          <p className="text-xs sm:text-sm text-gray-600">
            Last updated: {formatTime(tripData?.lastUpdated)}
          </p>
        </div>
      </div>

      {/* Vehicle & Driver Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
              {tripData?.vehiclePhoto ? (
                <img
                  src={tripData.vehiclePhoto}
                  alt="Vehicle"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
                    />
                  </svg>
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 text-base sm:text-lg truncate">
                {tripData?.vehicleNo}
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                Vehicle Information
              </p>
              <div className="mt-1 sm:mt-2 space-y-1">
                <p className="text-xs sm:text-sm text-gray-500">
                  Fuel: {tripData?.fuel.currentLevel}%
                </p>
                <p className="text-xs sm:text-sm text-gray-500">
                  Efficiency: {tripData?.fuel.efficiency}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-200 rounded-full overflow-hidden flex-shrink-0">
              {tripData?.driverPhoto ? (
                <img
                  src={tripData.driverPhoto}
                  alt="Driver"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400"
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
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 text-base sm:text-lg truncate">
                {tripData?.driverName}
              </h3>
              <p className="text-sm sm:text-base text-gray-600">Driver</p>
              <div className="mt-1 sm:mt-2 space-y-1">
                <p className="text-xs sm:text-sm text-gray-500">
                  Trip started: {formatTime(tripData?.actualStartTime)}
                </p>
                <p className="text-xs sm:text-sm text-gray-500">
                  Weather: {tripData?.weather.current},{" "}
                  {tripData?.weather.temperature}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation and Content */}
      <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Tab Navigation */}
        <div className="border-b border-gray-200">
          <nav className="flex overflow-x-auto px-3 sm:px-6" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`flex items-center gap-1 sm:gap-2 py-3 sm:py-4 px-2 sm:px-1 border-b-2 font-medium text-xs sm:text-sm transition-colors whitespace-nowrap ${
                  selectedTab === tab.id
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0"
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
        <div className="p-3 sm:p-6">
          {/* Overview Tab */}
          {selectedTab === "overview" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                {/* Route Progress */}
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
                    Route Progress
                  </h3>
                  <div className="space-y-3">
                    {tripData?.checkpoints.map((checkpoint, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div
                          className={`w-3 h-3 rounded-full flex-shrink-0 ${
                            checkpoint.status === "completed"
                              ? "bg-green-500"
                              : checkpoint.status === "current"
                              ? "bg-blue-500"
                              : "bg-gray-300"
                          }`}
                        ></div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2">
                            <span
                              className={`font-medium text-sm sm:text-base truncate ${
                                checkpoint.status === "current"
                                  ? "text-blue-600"
                                  : "text-gray-900"
                              }`}
                            >
                              {checkpoint.name}
                            </span>
                            <div className="flex items-center gap-2 flex-shrink-0">
                              <span className="text-xs sm:text-sm text-gray-500">
                                {checkpoint.time}
                              </span>
                              {checkpoint.delay && (
                                <span className="text-xs text-orange-600 bg-orange-100 px-2 py-1 rounded">
                                  {checkpoint.delay}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Cargo Information */}
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
                    Cargo Information
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-3 sm:p-4 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                      <span className="text-gray-600 text-sm">Type:</span>
                      <span className="font-medium text-sm sm:text-base">
                        {tripData?.cargo.type}
                      </span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                      <span className="text-gray-600 text-sm">Weight:</span>
                      <span className="font-medium text-sm sm:text-base">
                        {tripData?.cargo.weight}
                      </span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                      <span className="text-gray-600 text-sm">Value:</span>
                      <span className="font-medium text-sm sm:text-base">
                        {tripData?.cargo.value}
                      </span>
                    </div>
                    <div className="pt-2 border-t border-gray-200">
                      <p className="text-xs sm:text-sm text-gray-600">
                        {tripData?.cargo.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Live Tracking Tab */}
          {selectedTab === "tracking" && (
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-6">
                Live Location Tracking
              </h3>
              <div className="bg-gray-100 rounded-lg sm:rounded-xl h-64 sm:h-96 flex items-center justify-center border-2 border-dashed border-gray-300">
                <div className="text-center px-4">
                  <svg
                    className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <p className="text-gray-600 font-medium text-sm sm:text-base">
                    Live Tracking Map
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1 break-words">
                    Current: {tripData?.currentLocation}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Trip Events Tab */}
          {selectedTab === "events" && (
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-6">
                Trip Events Timeline
              </h3>
              <div className="space-y-3 sm:space-y-4">
                {tripEvents.map((event) => (
                  <div
                    key={event.id}
                    className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d={getEventIcon(event.type)}
                        />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-900 text-sm sm:text-base">
                            {event.title}
                          </h4>
                          <p className="text-gray-600 text-xs sm:text-sm mt-1">
                            {event.message}
                          </p>
                          <p className="text-gray-500 text-xs mt-1 truncate">
                            {event.location}
                          </p>
                        </div>
                        <span className="text-xs sm:text-sm text-gray-500 flex-shrink-0">
                          {formatTime(event.timestamp)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Expenses Tab */}
          {selectedTab === "expenses" && (
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-6">
                Trip Expenses
              </h3>

              {/* Mobile Card View */}
              <div className="block sm:hidden space-y-3">
                {tripData?.expenses.map((expense, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-gray-900">
                        {expense.type}
                      </span>
                      <span className="font-bold text-lg text-gray-900">
                        ₹{expense.amount}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{expense.location}</span>
                      <span>{formatTime(expense.time)}</span>
                    </div>
                  </div>
                ))}
                <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-200">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-900">Total</span>
                    <span className="font-bold text-xl text-indigo-600">
                      ₹
                      {tripData?.expenses.reduce(
                        (sum, expense) => sum + expense.amount,
                        0
                      )}
                    </span>
                  </div>
                </div>
              </div>

              {/* Desktop Table View */}
              <div className="hidden sm:block overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Location
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Time
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {tripData?.expenses.map((expense, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          {expense.type}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          ₹{expense.amount}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {expense.location}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {formatTime(expense.time)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-gray-50">
                    <tr>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                        Total
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                        ₹
                        {tripData?.expenses.reduce(
                          (sum, expense) => sum + expense.amount,
                          0
                        )}
                      </td>
                      <td className="px-6 py-4"></td>
                      <td className="px-6 py-4"></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TripDetails;
