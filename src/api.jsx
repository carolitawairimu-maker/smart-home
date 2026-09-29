// src/api.jsx
const API_URL = "http://localhost:4000/devices";

export const fetchDevices = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Failed to connect to Hub");
    return await response.json();
  } catch (error) {
    console.error("Hub Connection Error:", error);
    return [];
  }
};

export const updateDeviceStatus = async (id, newStatus) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: newStatus }),
    });

    if (!response.ok) throw new Error("Failed to update hardware state");
    return await response.json();
  } catch (error) {
    console.error("Device Override Error:", error);
    throw error;
  }
};