import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import LoadingSpinner from "../components/LoadingSpinner";
import PageHeader from "../components/PageHeader";
import useToggle from '../hooks/useToggle';
import useDebounce from '../hooks/useDebounce';

const TripManagement = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, token } = useContext(AuthContext);
  const [trips, setTrips] = useState([]);
  const [trucks, setTrucks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showPanel, togglePanel] = useToggle(false);
  const [showTrackingModal, toggleTrackingModal] = useToggle(false);
  const [editId, setEditId] = useState(null);
  const [selectedTrip, setSelectedTrip] = useState(null);

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const [form, setForm] = useState({
    truckId: "",
    startLocation: {
      address: "",
      coordinates: { lat: "", lng: "" },
    },
    endLocation: {
      address: "",
      coordinates: { lat: "", lng: "" },
    },
    estimatedStartTime: "",
    notes: "",
  });

  // Sample data - replace with actual API calls
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setTimeout(() => {
        // Sample trucks
        setTrucks([
          {
            id: 1,
            vehicleNo: "TN01AB1234",
            driverName: "John Doe",
            status: "available",
          },
          {
            id: 2,
            vehicleNo: "TN02CD5678",
            driverName: "Mike Smith",
            status: "available",
          },
          {
            id: 3,
            vehicleNo: "TN03EF9012",
            driverName: "Sarah Wilson",
            status: "on-trip",
          },
          {
            id: 4,
            vehicleNo: "TN04GH3456",
            driverName: "Lisa Brown",
            status: "available",
          },
        ]);

        // Sample trips
        setTrips([
          {
            id: 1,
            tripId: "TR001",
            truck: { vehicleNo: "TN01AB1234", driverName: "John Doe" },
            startLocation: "Chennai",
            endLocation: "Bangalore",
            status: "ongoing",
            estimatedStartTime: "2025-08-29T09:00",
            actualStartTime: "2025-08-29T09:15",
            progress: 65,
            currentSpeed: "65 km/h",
            eta: "2:30 PM",
            distance: "347 km",
          },
          {
            id: 2,
            tripId: "TR002",
            truck: { vehicleNo: "TN02CD5678", driverName: "Mike Smith" },
            startLocation: "Mumbai",
            endLocation: "Pune",
            status: "completed",
            estimatedStartTime: "2025-08-28T07:00",
            actualStartTime: "2025-08-28T07:10",
            progress: 100,
            currentSpeed: "0 km/h",
            eta: "Arrived",
            distance: "148 km",
          },
          {
            id: 3,
            tripId: "TR003",
            truck: { vehicleNo: "TN04GH3456", driverName: "Lisa Brown" },
            startLocation: "Delhi",
            endLocation: "Jaipur",
            status: "scheduled",
            estimatedStartTime: "2025-08-30T06:00",
            actualStartTime: null,
            progress: 0,
            currentSpeed: "0 km/h",
            eta: "Not started",
            distance: "280 km",
          },
        ]);

        setLoading(false);
      }, 1000);
    };
    fetchData();

    // Pre-select truck if coming from truck management
    const selectedTruck = location.state?.selectedTruck;
    if (selectedTruck) {
      setForm((prev) => ({ ...prev, truckId: selectedTruck }));
      openPanel();
    }
  }, [location.state]);

  // Simplified panel management
  const openPanel = () => {
    if (!showPanel) togglePanel();
  };

  const closePanel = () => {
    if (showPanel) togglePanel();
    setForm({
      truckId: "",
      startLocation: { address: "", coordinates: { lat: "", lng: "" } },
      endLocation: { address: "", coordinates: { lat: "", lng: "" } },
      estimatedStartTime: "",
      notes: "",
    });
    setEditId(null);
  };

  // Filter trips using debounced search
  const filteredTrips = trips.filter((trip) => {
    const matchesSearch =
      trip.tripId.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      trip.truck.vehicleNo.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      trip.truck.driverName.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || trip.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Creating trip:", form);
      closePanel();
      // Refresh trips in real implementation
    } catch (err) {
      console.error("Trip creation failed:", err);
    }
  };

  const openTrackingModal = (trip) => {
    setSelectedTrip(trip);
    if (!showTrackingModal) toggleTrackingModal();
  };

  const closeTrackingModal = () => {
    if (showTrackingModal) toggleTrackingModal();
    setSelectedTrip(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "ongoing":
        return "bg-blue-100 text-blue-800";
      case "scheduled":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title="Trip Management"
        subtitle="Plan, track and monitor delivery trips"
        actionButton={{
          label: "Create Trip",
          icon: "M12 6v6m0 0v6m0-6h6m-6 0H6",
          onClick: openPanel,
        }}
      />

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search by trip ID, vehicle, or driver..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              />
            </div>
          </div>
          <div className="sm:w-48">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            >
              <option value="all">All Status</option>
              <option value="scheduled">Scheduled</option>
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Create Trip Modal */}
      {showPanel && (
        <>
          <div
            className="fixed h-screen inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-400"
            onClick={closePanel}
          />
          <div className="fixed h-screen inset-0 z-50 flex items-center justify-center p-4 transition-all duration-400 ease-out">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col">
              <div className="px-8 py-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-indigo-600"
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
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        Create New Trip
                      </h2>
                      <p className="text-gray-500 text-sm">
                        Plan a delivery route for your fleet
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={closePanel}
                    className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                  >
                    <svg
                      className="w-6 h-6 text-gray-400"
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
              </div>

              <div className="flex-1 overflow-y-auto p-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                      Trip Details
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Select Truck
                        </label>
                        <select
                          value={form.truckId}
                          onChange={(e) =>
                            setForm({ ...form, truckId: e.target.value })
                          }
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                          required
                        >
                          <option value="">Choose a truck</option>
                          {trucks
                            .filter((truck) => truck.status === "available")
                            .map((truck) => (
                              <option key={truck.id} value={truck.id}>
                                {truck.vehicleNo} - {truck.driverName}
                              </option>
                            ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Estimated Start Time
                        </label>
                        <input
                          type="datetime-local"
                          value={form.estimatedStartTime}
                          onChange={(e) =>
                            setForm({
                              ...form,
                              estimatedStartTime: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                      Route Information
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Start Location
                        </label>
                        <div className="space-y-3">
                          <input
                            type="text"
                            placeholder="Enter start address"
                            value={form.startLocation.address}
                            onChange={(e) =>
                              setForm({
                                ...form,
                                startLocation: {
                                  ...form.startLocation,
                                  address: e.target.value,
                                },
                              })
                            }
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                            required
                          />
                          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center bg-gray-50">
                            <svg
                              className="w-8 h-8 text-gray-400 mx-auto mb-2"
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
                            <p className="text-sm text-gray-600">
                              Click map to select start location
                            </p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          End Location
                        </label>
                        <div className="space-y-3">
                          <input
                            type="text"
                            placeholder="Enter destination address"
                            value={form.endLocation.address}
                            onChange={(e) =>
                              setForm({
                                ...form,
                                endLocation: {
                                  ...form.endLocation,
                                  address: e.target.value,
                                },
                              })
                            }
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                            required
                          />
                          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center bg-gray-50">
                            <svg
                              className="w-8 h-8 text-gray-400 mx-auto mb-2"
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
                            <p className="text-sm text-gray-600">
                              Click map to select destination
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Notes (Optional)
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Add any special instructions or notes..."
                        value={form.notes}
                        onChange={(e) =>
                          setForm({ ...form, notes: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors resize-none"
                      />
                    </div>
                  </div>
                </form>
              </div>

              <div className="px-8 py-6 border-t border-gray-100 flex justify-end gap-4">
                <button
                  type="button"
                  onClick={closePanel}
                  className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium transition-colors shadow-lg"
                >
                  Create Trip
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Ongoing Trip Tracking Modal */}
      {showTrackingModal && selectedTrip && (
        <>
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={closeTrackingModal}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
              <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                  Live Trip Tracking - {selectedTrip.tripId}
                </h2>
                <button
                  onClick={closeTrackingModal}
                  className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <svg
                    className="w-6 h-6 text-gray-400"
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

              <div className="flex-1 p-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <div className="bg-gray-100 rounded-xl h-96 flex items-center justify-center border-2 border-dashed border-gray-300">
                      <div className="text-center">
                        <svg
                          className="w-16 h-16 text-gray-400 mx-auto mb-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1}
                            d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                          />
                        </svg>
                        <p className="text-gray-600 font-medium">
                          Live Route Tracking
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          Google Maps integration will show here
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-white border border-gray-200 rounded-xl p-4">
                      <h4 className="font-semibold text-gray-900 mb-3">
                        Trip Progress
                      </h4>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Progress</span>
                          <span className="font-medium">
                            {selectedTrip.progress}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${selectedTrip.progress}%` }}
                          ></div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 pt-2">
                          <div>
                            <p className="text-xs text-gray-500">Speed</p>
                            <p className="font-semibold">
                              {selectedTrip.currentSpeed}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">ETA</p>
                            <p className="font-semibold">{selectedTrip.eta}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-xl p-4">
                      <h4 className="font-semibold text-gray-900 mb-3">
                        Trip Details
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Vehicle</span>
                          <span className="font-medium">
                            {selectedTrip.truck.vehicleNo}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Driver</span>
                          <span className="font-medium">
                            {selectedTrip.truck.driverName}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Distance</span>
                          <span className="font-medium">
                            {selectedTrip.distance}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Route</span>
                          <span className="font-medium text-right">
                            {selectedTrip.startLocation} →{" "}
                            {selectedTrip.endLocation}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Trips Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            All Trips ({filteredTrips.length} trips)
          </h3>
        </div>

        {loading ? (
          <div className="p-12 text-center">
            <LoadingSpinner text="Loading trips..." />
          </div>
        ) : (
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
                    Route
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Progress
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    ETA
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredTrips.map((trip) => (
                  <tr
                    key={trip.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {trip.tripId}
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {trip.truck.vehicleNo}
                        </div>
                        <div className="text-sm text-gray-500">
                          {trip.truck.driverName}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {trip.startLocation}
                      </div>
                      <div className="text-xs text-gray-500">↓</div>
                      <div className="text-sm text-gray-900">
                        {trip.endLocation}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                          trip.status
                        )}`}
                      >
                        {trip.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-indigo-600 h-2 rounded-full"
                            style={{ width: `${trip.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600">
                          {trip.progress}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {trip.eta}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        {trip.status === "ongoing" ? (
                          <button
                            onClick={() => openTrackingModal(trip)}
                            className="inline-flex items-center px-3 py-1 text-sm border border-indigo-300 text-indigo-700 rounded-md hover:bg-indigo-50 transition-colors"
                          >
                            Track Live
                          </button>
                        ) : (
                          <button className="inline-flex items-center px-3 py-1 text-sm border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
                            View Details
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredTrips.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-6 py-12 text-center text-gray-500"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <svg
                          className="w-12 h-12 text-gray-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1}
                            d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                          />
                        </svg>
                        No trips found
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default TripManagement;
