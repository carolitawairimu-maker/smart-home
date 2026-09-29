// src/Dashboard.jsx
import { useState, useEffect } from 'react';
import { fetchDevices, updateDeviceStatus } from './api';

export default function Dashboard() {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getNetworkData = async () => {
      const data = await fetchDevices();
      setDevices(data);
      setLoading(false);
    };

    getNetworkData();
  }, []);

  const handleToggle = async (id, currentStatus) => {
    // 1. Determine next state based on current status
    const newStatus = currentStatus === 'Off' ? 'On' : 'Off';

    try {
      // 2. Persist update to JSON Server via PATCH request
      const updatedDevice = await updateDeviceStatus(id, newStatus);

      // 3. Immutably update React state so UI syncs immediately
      setDevices((prevDevices) =>
        prevDevices.map((device) =>
          device.id === id ? { ...device, status: updatedDevice.status } : device
        )
      );
    } catch (err) {
      alert("Failed to toggle device. Check if Nexus Hub (JSON Server) is running.");
    }
  };

  if (loading) return <h2>Connecting to Nexus Hub...</h2>;

  return (
    <div className="dashboard-container">
      <h1>Smart Home Control Panel</h1>
      <div className="grid">
        {devices.map((device) => (
          <div key={device.id} className="card">
            <h3>{device.name}</h3>
            <p>Type: {device.type}</p>
            <p>
              <strong>Status: {device.status}</strong>
            </p>

            {/* Toggle button specifically for switchable devices */}
            {(device.status === 'On' || device.status === 'Off') && (
              <button
                onClick={() => handleToggle(device.id, device.status)}
                className="toggle-btn"
              >
                Turn {device.status === 'Off' ? 'On' : 'Off'}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}