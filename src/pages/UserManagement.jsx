import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import PageHeader from "../components/PageHeader";
import LoadingSpinner from "../components/LoadingSpinner";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
    modules: [],
  });
  const [editId, setEditId] = useState(null);
  const [showPanel, setShowPanel] = useState(false);
  const [panelState, setPanelState] = useState("closed"); // 'closed', 'opening', 'open', 'closing'

  const { token } = useContext(AuthContext);

  // Module categories and descriptions
  const moduleCategories = {
    Core: ["dashboard", "user-management", "settings"],
    "Analytics & Reports": ["reports", "analytics", "audit-logs"],
    Operations: ["billing", "notifications", "content-management"],
    Development: ["integrations", "api-access", "security"],
  };

  const getModuleDescription = (module) => {
    const descriptions = {
      dashboard: "Main overview and metrics",
      "user-management": "Manage users and permissions",
      reports: "Generate custom reports",
      settings: "System configuration",
      analytics: "Advanced analytics dashboard",
      billing: "Payment and subscription management",
      notifications: "Email and push notifications",
      integrations: "Third-party integrations",
      security: "Security settings and logs",
      "audit-logs": "System audit trails",
      "content-management": "Content creation and editing",
      "api-access": "API keys and documentation",
    };
    return descriptions[module] || "Module access";
  };

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API_URL}/users`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
      setLoading(false);
    };
    fetchUsers();
  }, [token]);

  // Enhanced animation system
  const openPanel = () => {
    setShowPanel(true);
    setPanelState("opening");

    // Force a reflow to ensure the panel is rendered before animation
    requestAnimationFrame(() => {
      setPanelState("open");
    });
  };

  const closePanel = () => {
    setPanelState("closing");
    setTimeout(() => {
      setShowPanel(false);
      setPanelState("closed");
      setForm({ name: "", email: "", password: "", role: "user", modules: [] });
      setEditId(null);
    }, 400);
  };

  // Create or Update user
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`${API_URL}/users/${editId}`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post(`${API_URL}/users`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      closePanel();
      fetchUsersRefresh();
    } catch (err) {
      console.error("User save failed:", err);
    }
  };

  // Delete user
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`${API_URL}/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUsersRefresh();
    } catch (err) {
      console.error("User delete failed:", err);
    }
  };

  // Edit user
  const handleEdit = (user) => {
    if (user.role === "admin") {
      alert("Admin users cannot be edited for security reasons.");
      return;
    }
    setEditId(user._id);
    setForm({
      name: user.name,
      email: user.email,
      password: "",
      role: user.role,
      modules: user.modules || [],
    });
    openPanel();
  };

  // Handle module checkbox
  const handleModuleChange = (mod) => {
    setForm((prev) => {
      const modules = prev.modules.includes(mod)
        ? prev.modules.filter((m) => m !== mod)
        : [...prev.modules, mod];
      return { ...prev, modules };
    });
  };

  const fetchUsersRefresh = () => {
    setUsers([]);
    setLoading(true);
    setTimeout(() => window.location.reload(), 500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <PageHeader
        title="User Management"
        titleIcon="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        iconBgColor="bg-orange-500"
        subtitle="Manage users and their permissions"
        showBackButton={false}
        actionButton={{
          label: "Add User",
          onClick: () => navigate("/users/add"),
          icon: "M12 4v16m8-8H4",
        }}
      />

      {/* Modal Panel */}
      {showPanel && (
        <>
          {/* Backdrop */}
          <div
            className={`fixed h-screen inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-400 ${
              panelState === "closing" ? "opacity-0" : "opacity-100"
            }`}
            onClick={closePanel}
          />

          {/* Modal Panel */}
          <div
            className={`fixed h-screen inset-0 z-50 flex items-center justify-center p-4 transition-all duration-400 ease-out ${
              panelState === "opening" || panelState === "closing"
                ? "scale-95 opacity-0 translate-y-4"
                : "scale-100 opacity-100 translate-y-0"
            }`}
            onClick={(e) => {
              if (e.target === e.currentTarget) closePanel();
            }}
          >
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
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        {editId ? "Edit User" : "Create New User"}
                      </h2>
                      <p className="text-gray-500 text-sm">
                        {editId
                          ? "Update user information and permissions"
                          : "Add a new user to your organization"}
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
                  {/* Basic Information Section */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                      Basic Information
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={form.name}
                          onChange={(e) =>
                            setForm({ ...form, name: e.target.value })
                          }
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                          placeholder="Enter full name"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={form.email}
                          onChange={(e) =>
                            setForm({ ...form, email: e.target.value })
                          }
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors disabled:bg-gray-50"
                          placeholder="Enter email address"
                          disabled={editId !== null}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Password
                      </label>
                      <input
                        type="password"
                        value={form.password}
                        onChange={(e) =>
                          setForm({ ...form, password: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                        placeholder={
                          editId
                            ? "Leave blank to keep current password"
                            : "Enter password"
                        }
                        required={!editId}
                      />
                    </div>
                  </div>

                  {/* Permissions Section */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                      Permissions & Access
                    </h3>

                    {/* Module Selection by Categories */}
                    <div className="space-y-6">
                      {Object.entries(moduleCategories).map(
                        ([category, modules], categoryIndex) => (
                          <div key={category} className="space-y-3">
                            <h4 className="text-md font-medium text-gray-800 flex items-center gap-2">
                              <svg
                                className="w-4 h-4 text-indigo-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                                />
                              </svg>
                              {category}
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                              {modules.map((module, moduleIndex) => (
                                <label
                                  key={module}
                                  className={`flex items-start p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 hover:shadow-md ${
                                    form.modules.includes(module)
                                      ? "border-indigo-200 bg-indigo-50"
                                      : "border-gray-200 hover:border-gray-300"
                                  }`}
                                  style={{
                                    animationDelay: `${
                                      categoryIndex * 100 + moduleIndex * 50
                                    }ms`,
                                    animation:
                                      panelState === "open"
                                        ? "slideInUp 0.3s ease-out forwards"
                                        : undefined,
                                  }}
                                >
                                  <input
                                    type="checkbox"
                                    checked={form.modules.includes(module)}
                                    onChange={() => handleModuleChange(module)}
                                    className="mt-0.5 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                  />
                                  <div className="ml-3 flex-1">
                                    <div className="text-sm font-medium text-gray-900 capitalize">
                                      {module.replace("-", " ")}
                                    </div>
                                    <div className="text-xs text-gray-500 mt-0.5">
                                      {getModuleDescription(module)}
                                    </div>
                                  </div>
                                </label>
                              ))}
                            </div>
                          </div>
                        )
                      )}
                    </div>

                    {/* Selected Modules Summary */}
                    {form.modules.length > 0 && (
                      <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4">
                        <h5 className="text-sm font-medium text-indigo-900 mb-2">
                          Selected Permissions ({form.modules.length})
                        </h5>
                        <div className="flex flex-wrap gap-2">
                          {form.modules.map((module) => (
                            <span
                              key={module}
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                            >
                              {module.replace("-", " ")}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
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
                  {editId ? "Update User" : "Create User"}
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">All Users</h3>
        </div>

        {loading ? (
          <div className="p-12 text-center">
            <LoadingSpinner text="Loading users..." />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Modules
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {users.map((u) => (
                  <tr
                    key={u._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-semibold">
                          {u.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {u.name}
                          </div>
                          <div className="text-sm text-gray-500">{u.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          u.role === "admin"
                            ? "bg-purple-100 text-purple-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {u.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {u.role === "admin" ? (
                          <span className="text-green-600 font-medium">
                            All Modules
                          </span>
                        ) : (
                          <div className="flex flex-wrap gap-1">
                            {(u.modules || []).slice(0, 3).map((mod) => (
                              <span
                                key={mod}
                                className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                              >
                                {mod.replace("-", " ")}
                              </span>
                            ))}
                            {u.modules && u.modules.length > 3 && (
                              <span className="inline-block bg-gray-200 text-gray-600 px-2 py-1 rounded text-xs">
                                +{u.modules.length - 3} more
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        {u.role === "admin" ? (
                          <span className="text-xs text-gray-400 italic">
                            Cannot be modified
                          </span>
                        ) : (
                          <>
                            <button
                              onClick={() => handleEdit(u)}
                              className="inline-flex items-center px-3 py-1 text-sm border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(u._id)}
                              className="inline-flex items-center px-3 py-1 text-sm border border-red-300 text-red-700 rounded-md hover:bg-red-50 transition-colors"
                            >
                              Delete
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
                {users.length === 0 && (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-6 py-12 text-center text-gray-500"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <svg
                          className="w-8 h-8 text-gray-300"
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
                        No users found
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

export default UserManagement;
