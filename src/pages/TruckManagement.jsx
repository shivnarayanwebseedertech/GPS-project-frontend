import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import PageHeader from "../components/PageHeader";
import LoadingSpinner from "../components/LoadingSpinner";
import useToggle from "../hooks/useToggle";
import useDebounce from "../hooks/useDebounce";

const TruckManagement = () => {
  const navigate = useNavigate();
  const { user, token } = useContext(AuthContext);
  const [trucks, setTrucks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showPanel, togglePanel] = useToggle(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    vehicleNo: "",
    model: "",
    driverName: "",
    driverPhoto: null,
    truckPhoto: null,
    status: "active",
  });

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Sample truck data - replace with actual API calls
  useEffect(() => {
    const fetchTrucks = async () => {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setTrucks([
          {
            id: 1,
            vehicleNo: "TN01AB1234",
            model: "Tata LPT 1613",
            driverName: "John Doe",
            driverPhoto: null,
            truckPhoto: null,
            status: "active",
            currentLocation: "Chennai",
            lastUpdated: "2 hours ago",
          },
          {
            id: 2,
            vehicleNo: "TN02CD5678",
            model: "Ashok Leyland 1616",
            driverName: "Mike Smith",
            driverPhoto: null,
            truckPhoto: null,
            status: "active",
            currentLocation: "Mumbai",
            lastUpdated: "30 minutes ago",
          },
          {
            id: 3,
            vehicleNo: "TN03EF9012",
            model: "Mahindra Blazo X 28",
            driverName: "Sarah Wilson",
            driverPhoto: null,
            truckPhoto: null,
            status: "inactive",
            currentLocation: "Delhi",
            lastUpdated: "1 day ago",
          },
          {
            id: 4,
            vehicleNo: "TN04GH3456",
            model: "Eicher Pro 1110XP",
            driverName: "Lisa Brown",
            driverPhoto: null,
            truckPhoto: null,
            status: "active",
            currentLocation: "Kolkata",
            lastUpdated: "1 hour ago",
          },
        ]);
        setLoading(false);
      }, 1000);
    };
    fetchTrucks();
  }, []);

  // Simplified panel management
  const openPanel = () => {
    if (!showPanel) togglePanel();
  };

  const closePanel = () => {
    if (showPanel) togglePanel();
    setForm({
      vehicleNo: "",
      model: "",
      driverName: "",
      driverPhoto: null,
      truckPhoto: null,
      status: "active",
    });
    setEditId(null);
  };

  // Filter trucks based on debounced search and status
  const filteredTrucks = trucks.filter((truck) => {
    const matchesSearch =
      truck.vehicleNo
        .toLowerCase()
        .includes(debouncedSearchTerm.toLowerCase()) ||
      truck.driverName
        .toLowerCase()
        .includes(debouncedSearchTerm.toLowerCase()) ||
      truck.model.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || truck.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Simulate API call
      console.log("Saving truck:", form);
      closePanel();
      // Refresh truck list in real implementation
    } catch (err) {
      console.error("Truck save failed:", err);
    }
  };

  const handleEdit = (truck) => {
    setEditId(truck.id);
    setForm({
      vehicleNo: truck.vehicleNo,
      model: truck.model,
      driverName: truck.driverName,
      driverPhoto: truck.driverPhoto,
      truckPhoto: truck.truckPhoto,
      status: truck.status,
    });
    openPanel();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this truck?")) return;
    try {
      // Simulate API call
      console.log("Deleting truck:", id);
      setTrucks(trucks.filter((truck) => truck.id !== id));
    } catch (err) {
      console.error("Truck delete failed:", err);
    }
  };

  const handleFileUpload = (field, file) => {
    setForm((prev) => ({
      ...prev,
      [field]: file,
    }));
  };

  const assignToTrip = (truckId) => {
    // Navigate to trip management with pre-selected truck
    navigate("/trips", { state: { selectedTruck: truckId } });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Truck Management"
        subtitle="Manage your fleet vehicles and drivers"
        actionButton={{
          label: "Add Truck",
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
                placeholder="Search by vehicle number, driver, or model..."
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
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Modal Panel */}
      {showPanel && (
        <>
          {/* Backdrop */}
          <div
            className="fixed h-screen inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-400"
            onClick={closePanel}
          />

          {/* Modal Panel */}
          <div className="fixed h-screen inset-0 z-50 flex items-center justify-center p-4 transition-all duration-400 ease-out">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
              {/* Header */}
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
                          d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
                        />
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        {editId ? "Edit Truck" : "Add New Truck"}
                      </h2>
                      <p className="text-gray-500 text-sm">
                        {editId
                          ? "Update truck and driver information"
                          : "Add a new vehicle to your fleet"}
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

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Vehicle Information */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                      Vehicle Information
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Vehicle Number
                        </label>
                        <input
                          type="text"
                          value={form.vehicleNo}
                          onChange={(e) =>
                            setForm({ ...form, vehicleNo: e.target.value })
                          }
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                          placeholder="e.g., TN01AB1234"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Truck Model
                        </label>
                        <input
                          type="text"
                          value={form.model}
                          onChange={(e) =>
                            setForm({ ...form, model: e.target.value })
                          }
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                          placeholder="e.g., Tata LPT 1613"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Status
                      </label>
                      <select
                        value={form.status}
                        onChange={(e) =>
                          setForm({ ...form, status: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </div>
                  </div>

                  {/* Driver Information */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                      Driver Information
                    </h3>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Driver Name
                      </label>
                      <input
                        type="text"
                        value={form.driverName}
                        onChange={(e) =>
                          setForm({ ...form, driverName: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                        placeholder="Enter driver's full name"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Driver Photo
                        </label>
                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center hover:border-indigo-300 transition-colors">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                              handleFileUpload("driverPhoto", e.target.files[0])
                            }
                            className="hidden"
                            id="driver-photo"
                          />
                          <label
                            htmlFor="driver-photo"
                            className="cursor-pointer"
                          >
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
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                              />
                            </svg>
                            <p className="text-sm text-gray-600">
                              Upload Driver Photo
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              PNG, JPG up to 5MB
                            </p>
                          </label>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Truck Photo
                        </label>
                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center hover:border-indigo-300 transition-colors">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                              handleFileUpload("truckPhoto", e.target.files[0])
                            }
                            className="hidden"
                            id="truck-photo"
                          />
                          <label
                            htmlFor="truck-photo"
                            className="cursor-pointer"
                          >
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
                                d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
                              />
                            </svg>
                            <p className="text-sm text-gray-600">
                              Upload Truck Photo
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              PNG, JPG up to 5MB
                            </p>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>

              {/* Footer */}
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
                  {editId ? "Update Truck" : "Add Truck"}
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Trucks Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Fleet Overview ({filteredTrucks.length} trucks)
          </h3>
        </div>

        {loading ? (
          <div className="p-12 text-center">
            <LoadingSpinner text="Loading trucks..." />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Vehicle
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Driver
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Last Update
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredTrucks.map((truck) => (
                  <tr
                    key={truck.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-semibold">
                          {truck.vehicleNo.slice(-2)}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {truck.vehicleNo}
                          </div>
                          <div className="text-sm text-gray-500">
                            {truck.model}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-semibold">
                          {truck.driverName.charAt(0).toUpperCase()}
                        </div>
                        <div className="text-sm font-medium text-gray-900">
                          {truck.driverName}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          truck.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {truck.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {truck.currentLocation}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {truck.lastUpdated}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(truck)}
                          className="inline-flex items-center px-3 py-1 text-sm border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => assignToTrip(truck.id)}
                          className="inline-flex items-center px-3 py-1 text-sm border border-indigo-300 text-indigo-700 rounded-md hover:bg-indigo-50 transition-colors"
                        >
                          Assign Trip
                        </button>
                        <button
                          onClick={() => handleDelete(truck.id)}
                          className="inline-flex items-center px-3 py-1 text-sm border border-red-300 text-red-700 rounded-md hover:bg-red-50 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredTrucks.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
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
                            d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
                          />
                        </svg>
                        No trucks found
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

export default TruckManagement;
