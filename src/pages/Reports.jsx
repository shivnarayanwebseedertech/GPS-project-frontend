import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import PageHeader from "../components/PageHeader";

const Reports = () => {
  const { user, token } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [selectedReport, setSelectedReport] = useState("trip-summary");
  const [dateRange, setDateRange] = useState({
    startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0], // 7 days ago
    endDate: new Date().toISOString().split("T")[0], // Today
  });

  const [filters, setFilters] = useState({
    truckId: "",
    driverId: "",
    status: "all",
  });

  // Sample report data - replace with actual API calls
  const [reportData, setReportData] = useState({
    tripSummary: [
      {
        id: 1,
        tripId: "TR001",
        truck: "TN01AB1234",
        driver: "John Doe",
        startLocation: "Chennai",
        endLocation: "Bangalore",
        distance: "347 km",
        duration: "6h 45m",
        status: "Completed",
        date: "2025-08-28",
      },
      {
        id: 2,
        tripId: "TR002",
        truck: "TN02CD5678",
        driver: "Mike Smith",
        startLocation: "Mumbai",
        endLocation: "Pune",
        distance: "148 km",
        duration: "3h 20m",
        status: "Completed",
        date: "2025-08-27",
      },
      {
        id: 3,
        tripId: "TR003",
        truck: "TN03EF9012",
        driver: "Sarah Wilson",
        startLocation: "Delhi",
        endLocation: "Jaipur",
        distance: "280 km",
        duration: "5h 15m",
        status: "Ongoing",
        date: "2025-08-29",
      },
      {
        id: 4,
        tripId: "TR004",
        truck: "TN04GH3456",
        driver: "Lisa Brown",
        startLocation: "Kolkata",
        endLocation: "Bhubaneswar",
        distance: "441 km",
        duration: "8h 30m",
        status: "Scheduled",
        date: "2025-08-30",
      },
    ],
    fleetUtilization: [
      {
        truck: "TN01AB1234",
        totalTrips: 15,
        completedTrips: 14,
        totalDistance: "4,250 km",
        utilization: "93%",
        avgSpeed: "58 km/h",
      },
      {
        truck: "TN02CD5678",
        totalTrips: 12,
        completedTrips: 11,
        totalDistance: "3,680 km",
        utilization: "87%",
        avgSpeed: "62 km/h",
      },
      {
        truck: "TN03EF9012",
        totalTrips: 18,
        completedTrips: 16,
        totalDistance: "5,120 km",
        utilization: "89%",
        avgSpeed: "55 km/h",
      },
      {
        truck: "TN04GH3456",
        totalTrips: 10,
        completedTrips: 9,
        totalDistance: "2,890 km",
        utilization: "90%",
        avgSpeed: "60 km/h",
      },
    ],
    driverPerformance: [
      {
        driver: "John Doe",
        trips: 15,
        onTimeDelivery: "94%",
        avgSpeed: "58 km/h",
        violations: 2,
        rating: 4.8,
      },
      {
        driver: "Mike Smith",
        trips: 12,
        onTimeDelivery: "91%",
        avgSpeed: "62 km/h",
        violations: 1,
        rating: 4.6,
      },
      {
        driver: "Sarah Wilson",
        trips: 18,
        onTimeDelivery: "89%",
        avgSpeed: "55 km/h",
        violations: 3,
        rating: 4.5,
      },
      {
        driver: "Lisa Brown",
        trips: 10,
        onTimeDelivery: "96%",
        avgSpeed: "60 km/h",
        violations: 0,
        rating: 4.9,
      },
    ],
  });

  const reportTypes = [
    {
      id: "trip-summary",
      label: "Trip Summary Report",
      icon: "map",
      description: "Complete trip details with routes and timings",
    },
    {
      id: "fleet-utilization",
      label: "Fleet Utilization Report",
      icon: "truck",
      description: "Vehicle usage and performance metrics",
    },
    {
      id: "driver-performance",
      label: "Driver Performance Report",
      icon: "user",
      description: "Driver statistics and ratings",
    },
    {
      id: "route-analysis",
      label: "Route Analysis Report",
      icon: "route",
      description: "Route optimization and efficiency analysis",
    },
  ];

  const getReportIcon = (iconType) => {
    switch (iconType) {
      case "map":
        return (
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
              d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
            />
          </svg>
        );
      case "truck":
        return (
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
              d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
            />
          </svg>
        );
      case "user":
        return (
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
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        );
      case "route":
        return (
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
              d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
            />
          </svg>
        );
    }
  };

  const generateReport = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  const exportReport = (format) => {
    console.log(`Exporting report as ${format}`);
    // Implementation for export functionality
  };

  const renderReportContent = () => {
    switch (selectedReport) {
      case "trip-summary":
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Trip Summary Report
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Trip ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Vehicle
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Driver
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Route
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Distance
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Duration
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {reportData.tripSummary.map((trip) => (
                    <tr
                      key={trip.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {trip.tripId}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {trip.truck}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {trip.driver}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {trip.startLocation} → {trip.endLocation}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {trip.distance}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {trip.duration}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            trip.status === "Completed"
                              ? "bg-green-100 text-green-800"
                              : trip.status === "Ongoing"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {trip.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {trip.date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case "fleet-utilization":
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Fleet Utilization Report
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Vehicle
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Total Trips
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Completed
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Distance
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Utilization
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Avg Speed
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {reportData.fleetUtilization.map((fleet, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {fleet.truck}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {fleet.totalTrips}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {fleet.completedTrips}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {fleet.totalDistance}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            parseFloat(fleet.utilization) >= 90
                              ? "bg-green-100 text-green-800"
                              : parseFloat(fleet.utilization) >= 80
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {fleet.utilization}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {fleet.avgSpeed}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case "driver-performance":
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Driver Performance Report
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Driver
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Trips
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      On-Time Delivery
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Avg Speed
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Violations
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Rating
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {reportData.driverPerformance.map((driver, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {driver.driver}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {driver.trips}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {driver.onTimeDelivery}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {driver.avgSpeed}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            driver.violations === 0
                              ? "bg-green-100 text-green-800"
                              : driver.violations <= 2
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {driver.violations}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          <span className="text-sm font-medium text-gray-900">
                            {driver.rating}
                          </span>
                          <svg
                            className="w-4 h-4 text-yellow-400"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      default:
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12">
            <div className="text-center">
              <svg
                className="w-16 h-16 text-gray-300 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <p className="text-gray-600 font-medium">Route Analysis Report</p>
              <p className="text-sm text-gray-500 mt-1">
                Coming soon - Advanced route optimization analytics
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <PageHeader
        title="Reports & Analytics"
        subtitle="Generate comprehensive reports for fleet operations"
        showBackButton={false}
      >
        {/* Custom buttons for export */}
        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors flex items-center gap-2">
          Export PDF
        </button>
        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors flex items-center gap-2">
          Export Excel
        </button>
      </PageHeader>

      {/* Filters & Controls */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Date Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Start Date
            </label>
            <input
              type="date"
              value={dateRange.startDate}
              onChange={(e) =>
                setDateRange({ ...dateRange, startDate: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              End Date
            </label>
            <input
              type="date"
              value={dateRange.endDate}
              onChange={(e) =>
                setDateRange({ ...dateRange, endDate: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            />
          </div>

          {/* Filters */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Truck Filter
            </label>
            <select
              value={filters.truckId}
              onChange={(e) =>
                setFilters({ ...filters, truckId: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            >
              <option value="">All Trucks</option>
              <option value="TN01AB1234">TN01AB1234</option>
              <option value="TN02CD5678">TN02CD5678</option>
              <option value="TN03EF9012">TN03EF9012</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status Filter
            </label>
            <select
              value={filters.status}
              onChange={(e) =>
                setFilters({ ...filters, status: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="ongoing">Ongoing</option>
              <option value="scheduled">Scheduled</option>
            </select>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={generateReport}
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Generating...
              </>
            ) : (
              <>
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
                    d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Generate Report
              </>
            )}
          </button>
        </div>
      </div>

      {/* Report Type Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {reportTypes.map((report) => (
          <button
            key={report.id}
            onClick={() => setSelectedReport(report.id)}
            className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
              selectedReport === report.id
                ? "border-indigo-200 bg-indigo-50"
                : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center gap-3 mb-2">
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  selectedReport === report.id
                    ? "bg-indigo-100 text-indigo-600"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {getReportIcon(report.icon)}
              </div>
              <div className="text-sm font-medium text-gray-900">
                {report.label}
              </div>
            </div>
            <div className="text-xs text-gray-500">{report.description}</div>
          </button>
        ))}
      </div>

      {/* Report Content */}
      {renderReportContent()}
    </div>
  );
};

export default Reports;
