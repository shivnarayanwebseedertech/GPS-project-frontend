import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import PageHeader from '../components/PageHeader';
import LoadingSpinner from '../components/LoadingSpinner';
import VideoPlayer from '../components/VideoPlayer';

const LiveCameraFeeds = () => {
    const navigate = useNavigate();
    const { user, token } = useContext(AuthContext);
    const [selectedTruck, setSelectedTruck] = useState(null);
    const [selectedCamera, setSelectedCamera] = useState('internal');
    const [loading, setLoading] = useState(true);
    const [showRecordings, setShowRecordings] = useState(false);
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
    
    // Sample truck data
    const [trucks, setTrucks] = useState([]);
    const [recordings, setRecordings] = useState([]);

    useEffect(() => {
        const fetchTrucksWithCameras = async () => {
            setLoading(true);
            setTimeout(() => {
                setTrucks([
                    {
                        id: 1,
                        vehicleNo: 'TN01AB1234',
                        driverName: 'John Doe',
                        status: 'active',
                        location: 'Chennai',
                        cameras: {
                            internal: { 
                                status: 'online', 
                                streamUrl: '/api/camera/1/internal',
                                lastFrame: '2025-08-30T12:15:00Z'
                            },
                            external: { 
                                status: 'online', 
                                streamUrl: '/api/camera/1/external',
                                lastFrame: '2025-08-30T12:15:00Z'
                            }
                        }
                    },
                    {
                        id: 2,
                        vehicleNo: 'TN02CD5678',
                        driverName: 'Mike Smith',
                        status: 'active',
                        location: 'Mumbai',
                        cameras: {
                            internal: { 
                                status: 'offline', 
                                streamUrl: null,
                                lastFrame: '2025-08-30T11:45:00Z'
                            },
                            external: { 
                                status: 'online', 
                                streamUrl: '/api/camera/2/external',
                                lastFrame: '2025-08-30T12:14:00Z'
                            }
                        }
                    },
                    {
                        id: 3,
                        vehicleNo: 'TN03EF9012',
                        driverName: 'Sarah Wilson',
                        status: 'active',
                        location: 'Delhi',
                        cameras: {
                            internal: { 
                                status: 'online', 
                                streamUrl: '/api/camera/3/internal',
                                lastFrame: '2025-08-30T12:16:00Z'
                            },
                            external: { 
                                status: 'online', 
                                streamUrl: '/api/camera/3/external',
                                lastFrame: '2025-08-30T12:16:00Z'
                            }
                        }
                    }
                ]);

                if (user?.role === 'admin') {
                    setRecordings([
                        { id: 1, truckId: 1, camera: 'internal', timestamp: '2025-08-30T10:30:00Z', duration: '15:30', size: '245MB' },
                        { id: 2, truckId: 1, camera: 'external', timestamp: '2025-08-30T10:30:00Z', duration: '15:30', size: '289MB' },
                        { id: 3, truckId: 2, camera: 'external', timestamp: '2025-08-30T09:15:00Z', duration: '22:15', size: '387MB' },
                        { id: 4, truckId: 3, camera: 'internal', timestamp: '2025-08-30T08:45:00Z', duration: '18:45', size: '312MB' }
                    ]);
                }

                setSelectedTruck(1);
                setLoading(false);
            }, 1000);
        };

        fetchTrucksWithCameras();
    }, [user]);

    const getCameraStatus = (camera) => {
        switch (camera.status) {
            case 'online':
                return <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Online</span>;
            case 'offline':
                return <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">Offline</span>;
            case 'connecting':
                return <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">Connecting</span>;
            default:
                return <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">Unknown</span>;
        }
    };

    const selectedTruckData = trucks.find(truck => truck.id === selectedTruck);

    return (
        <div className="space-y-4 sm:space-y-6">
            {/* Page Header */}
            <PageHeader
                title="Live Camera Feeds"
                subtitle="Monitor real-time video feeds from truck cameras"
                actionButton={user?.role === 'admin' ? {
                    label: showRecordings ? 'Hide Recordings' : 'View Recordings',
                    icon: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z',
                    onClick: () => setShowRecordings(!showRecordings)
                } : null}
            />

            {/* Mobile Truck Selector Button */}
            <div className="lg:hidden">
                <button
                    onClick={() => setIsMobileSidebarOpen(true)}
                    className="w-full p-4 bg-white rounded-xl border border-gray-200 shadow-sm flex items-center justify-between"
                >
                    <div className="flex items-center gap-3">
                        {selectedTruckData && (
                            <>
                                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-semibold">
                                    {selectedTruckData.vehicleNo.slice(-2)}
                                </div>
                                <div className="text-left">
                                    <div className="text-sm font-medium text-gray-900">{selectedTruckData.vehicleNo}</div>
                                    <div className="text-xs text-gray-500">{selectedTruckData.driverName}</div>
                                </div>
                            </>
                        )}
                    </div>
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
            </div>

            {loading ? (
                <div className="p-12 text-center">
                    <LoadingSpinner text="Loading camera feeds..." />
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6">
                    {/* Desktop Truck Selection Sidebar */}
                    <div className="hidden lg:block lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 sticky top-6">
                            <div className="px-4 lg:px-6 py-4 border-b border-gray-200">
                                <h3 className="text-lg font-semibold text-gray-900">Available Trucks</h3>
                            </div>
                            <div className="p-3 lg:p-4 max-h-96 overflow-y-auto">
                                <div className="space-y-3">
                                    {trucks.map(truck => (
                                        <button
                                            key={truck.id}
                                            onClick={() => setSelectedTruck(truck.id)}
                                            className={`w-full p-3 lg:p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                                                selectedTruck === truck.id
                                                    ? 'border-indigo-200 bg-indigo-50'
                                                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                            }`}
                                        >
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="text-sm font-medium text-gray-900">{truck.vehicleNo}</div>
                                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                    truck.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                                }`}>
                                                    {truck.status}
                                                </span>
                                            </div>
                                            <div className="text-xs text-gray-500 mb-2">{truck.driverName}</div>
                                            <div className="text-xs text-gray-500 mb-3">{truck.location}</div>
                                            
                                            <div className="space-y-1">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-xs text-gray-600">Internal</span>
                                                    {getCameraStatus(truck.cameras.internal)}
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-xs text-gray-600">External</span>
                                                    {getCameraStatus(truck.cameras.external)}
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Truck Selection Modal */}
                    {isMobileSidebarOpen && (
                        <>
                            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden" onClick={() => setIsMobileSidebarOpen(false)} />
                            <div className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-2xl max-h-[70vh] lg:hidden">
                                <div className="p-4 border-b border-gray-200">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-lg font-semibold text-gray-900">Select Truck</h3>
                                        <button onClick={() => setIsMobileSidebarOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <div className="p-4 overflow-y-auto">
                                    <div className="space-y-3">
                                        {trucks.map(truck => (
                                            <button
                                                key={truck.id}
                                                onClick={() => {
                                                    setSelectedTruck(truck.id);
                                                    setIsMobileSidebarOpen(false);
                                                }}
                                                className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                                                    selectedTruck === truck.id
                                                        ? 'border-indigo-200 bg-indigo-50'
                                                        : 'border-gray-200'
                                                }`}
                                            >
                                                <div className="flex items-center justify-between mb-2">
                                                    <div className="text-sm font-medium text-gray-900">{truck.vehicleNo}</div>
                                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                        truck.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                                    }`}>
                                                        {truck.status}
                                                    </span>
                                                </div>
                                                <div className="text-xs text-gray-500 mb-2">{truck.driverName}</div>
                                                <div className="space-y-1">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-xs text-gray-600">Internal</span>
                                                        {getCameraStatus(truck.cameras.internal)}
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-xs text-gray-600">External</span>
                                                        {getCameraStatus(truck.cameras.external)}
                                                    </div>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {/* Main Camera Feed Area */}
                    <div className="lg:col-span-3">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                            {selectedTruckData ? (
                                <>
                                    {/* Camera Controls */}
                                    <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-900">
                                                    {selectedTruckData.vehicleNo}
                                                </h3>
                                                <p className="text-sm text-gray-500">
                                                    {selectedTruckData.driverName} • {selectedTruckData.location}
                                                </p>
                                            </div>
                                            
                                            {/* Camera Toggle */}
                                            <div className="flex items-center bg-gray-100 rounded-lg p-1 w-full sm:w-auto">
                                                <button
                                                    onClick={() => setSelectedCamera('internal')}
                                                    className={`flex-1 sm:flex-none px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                                                        selectedCamera === 'internal'
                                                            ? 'bg-white text-gray-900 shadow'
                                                            : 'text-gray-600 hover:text-gray-900'
                                                    }`}
                                                >
                                                    Internal
                                                </button>
                                                <button
                                                    onClick={() => setSelectedCamera('external')}
                                                    className={`flex-1 sm:flex-none px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                                                        selectedCamera === 'external'
                                                            ? 'bg-white text-gray-900 shadow'
                                                            : 'text-gray-600 hover:text-gray-900'
                                                    }`}
                                                >
                                                    External
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Video Feed */}
                                    <div className="p-4 sm:p-6">
                                        <VideoPlayer
                                            streamUrl={selectedTruckData.cameras[selectedCamera].streamUrl}
                                            truck={selectedTruckData.vehicleNo}
                                            camera={selectedCamera}
                                        />

                                        {/* Camera Info */}
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                                            <div className="bg-gray-50 rounded-lg p-4">
                                                <h4 className="text-sm font-medium text-gray-900 mb-2">Status</h4>
                                                {getCameraStatus(selectedTruckData.cameras[selectedCamera])}
                                            </div>
                                            <div className="bg-gray-50 rounded-lg p-4">
                                                <h4 className="text-sm font-medium text-gray-900 mb-2">Camera Type</h4>
                                                <p className="text-sm text-gray-600 capitalize">{selectedCamera} View</p>
                                            </div>
                                            <div className="bg-gray-50 rounded-lg p-4">
                                                <h4 className="text-sm font-medium text-gray-900 mb-2">Last Update</h4>
                                                <p className="text-sm text-gray-600">
                                                    {new Date(selectedTruckData.cameras[selectedCamera].lastFrame).toLocaleTimeString()}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="p-12 text-center">
                                    <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                    </svg>
                                    <p className="text-gray-600 font-medium">Select a truck to view camera feeds</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Recording History (Admin Only) */}
            {user?.role === 'admin' && showRecordings && recordings.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                    <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900">Recording History (7 Days)</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Truck</th>
                                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Camera</th>
                                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Timestamp</th>
                                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase hidden sm:table-cell">Duration</th>
                                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase hidden sm:table-cell">Size</th>
                                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {recordings.map(recording => {
                                    const truck = trucks.find(t => t.id === recording.truckId);
                                    return (
                                        <tr key={recording.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-4 sm:px-6 py-4 text-sm font-medium text-gray-900">{truck?.vehicleNo}</td>
                                            <td className="px-4 sm:px-6 py-4">
                                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                    recording.camera === 'internal' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                                                }`}>
                                                    {recording.camera}
                                                </span>
                                            </td>
                                            <td className="px-4 sm:px-6 py-4 text-sm text-gray-900">
                                                <div className="sm:hidden">
                                                    {new Date(recording.timestamp).toLocaleDateString()}<br />
                                                    <span className="text-xs text-gray-500">{recording.duration} • {recording.size}</span>
                                                </div>
                                                <div className="hidden sm:block">
                                                    {new Date(recording.timestamp).toLocaleString()}
                                                </div>
                                            </td>
                                            <td className="px-4 sm:px-6 py-4 text-sm text-gray-900 hidden sm:table-cell">{recording.duration}</td>
                                            <td className="px-4 sm:px-6 py-4 text-sm text-gray-900 hidden sm:table-cell">{recording.size}</td>
                                            <td className="px-4 sm:px-6 py-4">
                                                <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
                                                    <button className="inline-flex items-center justify-center px-3 py-1 text-sm border border-indigo-300 text-indigo-700 rounded-md hover:bg-indigo-50 transition-colors">
                                                        View
                                                    </button>
                                                    <button className="inline-flex items-center justify-center px-3 py-1 text-sm border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
                                                        Download
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LiveCameraFeeds;
