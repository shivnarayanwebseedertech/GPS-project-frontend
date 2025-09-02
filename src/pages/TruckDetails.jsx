import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import LoadingSpinner from '../components/LoadingSpinner';

const TruckDetails = () => {
  const { truckId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState('live');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  
  const [truckData, setTruckData] = useState(null);
  const [cameraFeeds, setCameraFeeds] = useState([]);
  const [locationHistory, setLocationHistory] = useState([]);

  // Sample data - replace with actual API calls
  useEffect(() => {
    const fetchTruckDetails = async () => {
      setLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        setTruckData({
          id: truckId,
          vehicleNo: "TN01AB1234",
          model: "Tata LPT 1613",
          driverName: "John Doe",
          driverPhoto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
          truckPhoto: "https://images.unsplash.com/photo-1558618046-fbd3c650d5f6?w=300&h=200&fit=crop",
          status: "active",
          currentLocation: "Chennai, Tamil Nadu",
          lastUpdated: "2 minutes ago",
          speed: "65 km/h",
          fuel: "75%",
          temperature: "32°C"
        });

        // Sample camera feeds
        setCameraFeeds([
          {
            id: 1,
            name: "Front Camera",
            isActive: true,
            lastRecorded: "2 minutes ago"
          },
          {
            id: 2,
            name: "Driver Camera",
            isActive: true,
            lastRecorded: "2 minutes ago"
          },
          {
            id: 3,
            name: "Cargo Camera",
            isActive: false,
            lastRecorded: "1 hour ago"
          },
          {
            id: 4,
            name: "Rear Camera",
            isActive: true,
            lastRecorded: "2 minutes ago"
          }
        ]);

        // Sample location history for last 7 days
        const history = [];
        for (let i = 0; i < 7; i++) {
          const date = new Date();
          date.setDate(date.getDate() - i);
          history.push({
            date: date.toISOString().split('T')[0],
            locations: [
              { time: "09:00", location: "Chennai Central", coordinates: [13.0827, 80.2707] },
              { time: "12:30", location: "Bangalore Highway", coordinates: [12.9716, 77.5946] },
              { time: "15:45", location: "Hosur Toll Plaza", coordinates: [12.1265, 77.8369] },
              { time: "18:20", location: "Electronic City", coordinates: [12.8456, 77.6603] }
            ]
          });
        }
        setLocationHistory(history);
        
        setLoading(false);
      }, 1000);
    };

    if (truckId) {
      fetchTruckDetails();
    }
  }, [truckId]);

  const tabs = [
    { id: 'live', name: 'Live Feeds', icon: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z' },
    { id: 'history', name: 'Camera History', icon: 'M12 8v4l3 3m6 6a9 9 0 11-18 0 9 9 0 0118 0z' },
    { id: 'location', name: 'Location Tracking', icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' },
    { id: 'route-history', name: 'Route History', icon: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7' }
  ];

  const CameraFeedPlaceholder = ({ camera, isLive = false }) => (
    <div className="bg-gray-900 rounded-lg overflow-hidden">
      <div className="aspect-video flex items-center justify-center bg-gray-800 relative">
        {isLive && camera.isActive && (
          <div className="absolute top-3 left-3 flex items-center gap-2 bg-red-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            LIVE
          </div>
        )}
        <div className="text-center text-gray-400">
          <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          <p className="font-medium">{camera.name}</p>
          <p className="text-sm text-gray-500">
            {camera.isActive ? "Camera Feed Active" : "Camera Offline"}
          </p>
        </div>
      </div>
      <div className="p-3 bg-gray-800 text-white">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">{camera.name}</span>
          <span className="text-xs text-gray-400">Last: {camera.lastRecorded}</span>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="p-12 text-center">
        <LoadingSpinner text="Loading truck details..." />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Back Button */}
      <PageHeader
        title={`Truck Details - ${truckData?.vehicleNo}`}
        subtitle={`${truckData?.model} • Driver: ${truckData?.driverName}`}
        showBackButton={true}
        onBack={() => navigate('/trucks')}
      />

      {/* Truck Information Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Truck Photo Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="text-center">
            <div className="w-full h-32 bg-gray-200 rounded-lg mb-4 overflow-hidden">
              {truckData?.truckPhoto ? (
                <img 
                  src={truckData.truckPhoto} 
                  alt="Truck"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                  </svg>
                </div>
              )}
            </div>
            <h3 className="font-semibold text-gray-900">{truckData?.vehicleNo}</h3>
            <p className="text-sm text-gray-600">{truckData?.model}</p>
          </div>
        </div>

        {/* Driver Photo Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="text-center">
            <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4 overflow-hidden">
              {truckData?.driverPhoto ? (
                <img 
                  src={truckData.driverPhoto} 
                  alt="Driver"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              )}
            </div>
            <h3 className="font-semibold text-gray-900">{truckData?.driverName}</h3>
            <p className="text-sm text-gray-600">Driver</p>
          </div>
        </div>

        {/* Status Info */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Status</span>
              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                truckData?.status === 'active' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {truckData?.status}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Speed</span>
              <span className="text-sm font-semibold">{truckData?.speed}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Fuel</span>
              <span className="text-sm font-semibold">{truckData?.fuel}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Temperature</span>
              <span className="text-sm font-semibold">{truckData?.temperature}</span>
            </div>
          </div>
        </div>

        {/* Location Info */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="space-y-4">
            <div>
              <span className="text-sm text-gray-600">Current Location</span>
              <p className="text-sm font-semibold">{truckData?.currentLocation}</p>
            </div>
            <div>
              <span className="text-sm text-gray-600">Last Updated</span>
              <p className="text-sm font-semibold">{truckData?.lastUpdated}</p>
            </div>
            <button className="w-full bg-indigo-100 text-indigo-700 py-2 px-4 rounded-lg text-sm font-medium hover:bg-indigo-200 transition-colors">
              View on Map
            </button>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  selectedTab === tab.id
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} />
                </svg>
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {/* Live Feeds Tab */}
          {selectedTab === 'live' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Live Camera Feeds</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {cameraFeeds.map((camera) => (
                  <CameraFeedPlaceholder key={camera.id} camera={camera} isLive={true} />
                ))}
              </div>
            </div>
          )}

          {/* Camera History Tab */}
          {selectedTab === 'history' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Camera History</h3>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  max={new Date().toISOString().split('T')[0]}
                  min={new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {cameraFeeds.map((camera) => (
                  <CameraFeedPlaceholder key={camera.id} camera={{...camera, name: `${camera.name} - ${selectedDate}`}} />
                ))}
              </div>
            </div>
          )}

          {/* Location Tracking Tab */}
          {selectedTab === 'location' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Current Location</h3>
              <div className="bg-gray-100 rounded-xl h-96 flex items-center justify-center border-2 border-dashed border-gray-300 mb-6">
                <div className="text-center">
                  <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p className="text-gray-600 font-medium">Live Location Map</p>
                  <p className="text-sm text-gray-500 mt-1">Current: {truckData?.currentLocation}</p>
                </div>
              </div>
            </div>
          )}

          {/* Route History Tab */}
          {selectedTab === 'route-history' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Route History (Last 7 Days)</h3>
              <div className="space-y-4">
                {locationHistory.map((day, index) => (
                  <div key={day.date} className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-3">
                      {new Date(day.date).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                      {day.locations.map((location, idx) => (
                        <div key={idx} className="bg-white p-3 rounded border">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">{location.time}</span>
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            </svg>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{location.location}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TruckDetails;
