import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import PageHeader from '../components/PageHeader';
import LoadingSpinner from '../components/LoadingSpinner';

const RecipientManagement = () => {
    const navigate = useNavigate();
    const { user, token } = useContext(AuthContext);
    const [recipients, setRecipients] = useState([]);
    const [trucks, setTrucks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [showPanel, setShowPanel] = useState(false);
    const [panelState, setPanelState] = useState('closed');
    const [editId, setEditId] = useState(null);
    
    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        company: '',
        status: 'active',
        assignedTrucks: []
    });

    // Sample data - replace with actual API calls
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setTimeout(() => {
                // Sample recipients
                setRecipients([
                    {
                        id: 1,
                        name: 'John Doe',
                        email: 'john.doe@company.com',
                        phone: '+91 9876543210',
                        address: '123 Business Street, Chennai',
                        company: 'ABC Corp',
                        status: 'active',
                        assignedTrucks: ['TN01AB1234', 'TN02CD5678'],
                        createdAt: '2025-08-25T10:30:00Z',
                        lastActive: '2025-08-30T09:15:00Z'
                    },
                    {
                        id: 2,
                        name: 'Sarah Wilson',
                        email: 'sarah.wilson@logistics.com',
                        phone: '+91 9123456780',
                        address: '456 Commerce Road, Mumbai',
                        company: 'Wilson Logistics',
                        status: 'active',
                        assignedTrucks: ['TN03EF9012'],
                        createdAt: '2025-08-20T14:20:00Z',
                        lastActive: '2025-08-29T16:45:00Z'
                    },
                    {
                        id: 3,
                        name: 'Mike Johnson',
                        email: 'mike.j@warehouse.in',
                        phone: '+91 9988776655',
                        address: '789 Industrial Area, Bangalore',
                        company: 'Johnson Warehouse',
                        status: 'inactive',
                        assignedTrucks: [],
                        createdAt: '2025-08-15T11:00:00Z',
                        lastActive: '2025-08-26T12:30:00Z'
                    }
                ]);

                // Sample available trucks
                setTrucks([
                    { id: 1, vehicleNo: 'TN01AB1234', driverName: 'John Driver' },
                    { id: 2, vehicleNo: 'TN02CD5678', driverName: 'Mike Driver' },
                    { id: 3, vehicleNo: 'TN03EF9012', driverName: 'Sarah Driver' },
                    { id: 4, vehicleNo: 'TN04GH3456', driverName: 'Lisa Driver' }
                ]);

                setLoading(false);
            }, 1000);
        };

        fetchData();
    }, []);

    // Panel animation system
    const openPanel = () => {
        setShowPanel(true);
        setPanelState('opening');
        requestAnimationFrame(() => {
            setPanelState('open');
        });
    };

    const closePanel = () => {
        setPanelState('closing');
        setTimeout(() => {
            setShowPanel(false);
            setPanelState('closed');
            setForm({
                name: '',
                email: '',
                phone: '',
                address: '',
                company: '',
                status: 'active',
                assignedTrucks: []
            });
            setEditId(null);
        }, 400);
    };

    // Filter recipients
    const filteredRecipients = recipients.filter(recipient => {
        const matchesSearch = recipient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            recipient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            recipient.company.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || recipient.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('Saving recipient:', form);
            closePanel();
            // Refresh recipients in real implementation
        } catch (err) {
            console.error('Recipient save failed:', err);
        }
    };

    const handleEdit = (recipient) => {
        setEditId(recipient.id);
        setForm({
            name: recipient.name,
            email: recipient.email,
            phone: recipient.phone,
            address: recipient.address,
            company: recipient.company,
            status: recipient.status,
            assignedTrucks: recipient.assignedTrucks
        });
        openPanel();
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this recipient?')) return;
        try {
            console.log('Deleting recipient:', id);
            setRecipients(recipients.filter(recipient => recipient.id !== id));
        } catch (err) {
            console.error('Recipient delete failed:', err);
        }
    };

    const handleTruckAssignment = (truckId) => {
        setForm(prev => ({
            ...prev,
            assignedTrucks: prev.assignedTrucks.includes(truckId)
                ? prev.assignedTrucks.filter(id => id !== truckId)
                : [...prev.assignedTrucks, truckId]
        }));
    };

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <PageHeader
                title="Recipient Management"
                subtitle="Manage delivery recipients and their truck assignments"
                actionButton={{
                    label: 'Add Recipient',
                    icon: 'M12 6v6m0 0v6m0-6h6m-6 0H6',
                    onClick: openPanel
                }}
            />

            {/* Search and Filters */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                placeholder="Search by name, email, or company..."
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                                className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                            />
                        </div>
                    </div>
                    <div className="sm:w-48">
                        <select
                            value={statusFilter}
                            onChange={e => setStatusFilter(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                        >
                            <option value="all">All Status</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Add/Edit Modal */}
            {showPanel && (
                <>
                    <div
                        className={`fixed h-screen inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-400 ${
                            panelState === 'closing' ? 'opacity-0' : 'opacity-100'
                        }`}
                        onClick={closePanel}
                    />
                    <div className={`fixed h-screen inset-0 z-50 flex items-center justify-center p-4 transition-all duration-400 ease-out ${
                        panelState === 'opening' || panelState === 'closing'
                            ? 'scale-95 opacity-0 translate-y-4'
                            : 'scale-100 opacity-100 translate-y-0'
                    }`}>
                        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
                            {/* Header */}
                            <div className="px-8 py-6 border-b border-gray-100">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                                            <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-bold text-gray-900">
                                                {editId ? 'Edit Recipient' : 'Add New Recipient'}
                                            </h2>
                                            <p className="text-gray-500 text-sm">
                                                {editId ? 'Update recipient information and truck assignments' : 'Add a new delivery recipient'}
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={closePanel}
                                        className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                                    >
                                        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="flex-1 overflow-y-auto p-8">
                                <form onSubmit={handleSubmit} className="space-y-8">
                                    {/* Basic Information */}
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
                                                    onChange={e => setForm({...form, name: e.target.value})}
                                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                                    placeholder="Enter recipient name"
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
                                                    onChange={e => setForm({...form, email: e.target.value})}
                                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                                    placeholder="Enter email address"
                                                    required
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Phone Number
                                                </label>
                                                <input
                                                    type="tel"
                                                    value={form.phone}
                                                    onChange={e => setForm({...form, phone: e.target.value})}
                                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                                    placeholder="+91 9876543210"
                                                    required
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Company Name
                                                </label>
                                                <input
                                                    type="text"
                                                    value={form.company}
                                                    onChange={e => setForm({...form, company: e.target.value})}
                                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                                    placeholder="Enter company name"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Delivery Address
                                            </label>
                                            <textarea
                                                rows={3}
                                                value={form.address}
                                                onChange={e => setForm({...form, address: e.target.value})}
                                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors resize-none"
                                                placeholder="Enter complete delivery address"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Status
                                            </label>
                                            <select
                                                value={form.status}
                                                onChange={e => setForm({...form, status: e.target.value})}
                                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                            >
                                                <option value="active">Active</option>
                                                <option value="inactive">Inactive</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Truck Assignment */}
                                    <div className="space-y-6">
                                        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                            <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                                            Truck Assignment
                                        </h3>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            {trucks.map(truck => (
                                                <label
                                                    key={truck.id}
                                                    className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                                                        form.assignedTrucks.includes(truck.vehicleNo)
                                                            ? 'border-indigo-200 bg-indigo-50'
                                                            : 'border-gray-200 hover:border-gray-300'
                                                    }`}
                                                >
                                                    <input
                                                        type="checkbox"
                                                        checked={form.assignedTrucks.includes(truck.vehicleNo)}
                                                        onChange={() => handleTruckAssignment(truck.vehicleNo)}
                                                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                                    />
                                                    <div className="ml-3">
                                                        <div className="text-sm font-medium text-gray-900">{truck.vehicleNo}</div>
                                                        <div className="text-xs text-gray-500">{truck.driverName}</div>
                                                    </div>
                                                </label>
                                            ))}
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
                                    {editId ? 'Update Recipient' : 'Add Recipient'}
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {/* Recipients Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">All Recipients ({filteredRecipients.length} recipients)</h3>
                </div>

                {loading ? (
                    <div className="p-12 text-center">
                        <LoadingSpinner text="Loading recipients..." />
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Recipient</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Company</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Assigned Trucks</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Active</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredRecipients.map(recipient => (
                                    <tr key={recipient.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-semibold">
                                                    {recipient.name.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900">{recipient.name}</div>
                                                    <div className="text-sm text-gray-500">{recipient.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-900">{recipient.phone}</div>
                                            <div className="text-sm text-gray-500 truncate max-w-xs">{recipient.address}</div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-900">{recipient.company}</td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                recipient.status === 'active' 
                                                    ? 'bg-green-100 text-green-800' 
                                                    : 'bg-gray-100 text-gray-800'
                                            }`}>
                                                {recipient.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {recipient.assignedTrucks.length > 0 ? (
                                                <div className="flex flex-wrap gap-1">
                                                    {recipient.assignedTrucks.slice(0, 2).map(truck => (
                                                        <span key={truck} className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                                                            {truck}
                                                        </span>
                                                    ))}
                                                    {recipient.assignedTrucks.length > 2 && (
                                                        <span className="inline-block bg-gray-200 text-gray-600 px-2 py-1 rounded text-xs">
                                                            +{recipient.assignedTrucks.length - 2}
                                                        </span>
                                                    )}
                                                </div>
                                            ) : (
                                                <span className="text-gray-500 text-sm">No trucks assigned</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {new Date(recipient.lastActive).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleEdit(recipient)}
                                                    className="inline-flex items-center px-3 py-1 text-sm border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(recipient.id)}
                                                    className="inline-flex items-center px-3 py-1 text-sm border border-red-300 text-red-700 rounded-md hover:bg-red-50 transition-colors"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {filteredRecipients.length === 0 && (
                                    <tr>
                                        <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                                            <div className="flex flex-col items-center gap-2">
                                                <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                                No recipients found
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

export default RecipientManagement;
