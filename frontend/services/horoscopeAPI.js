import axios from 'axios';
// import * as Network from 'expo-network';

const API_BASE_URL = 'http://192.168.17.1:6000';         // Your Express server URL
// const API_BASE_URL = `http://${address}:6000`;


/**
 * Fetches the current horoscope from the backend.
 * @param {string} datetime - ISO8601 datetime string (e.g., "2025-02-23T12:00:00Z")
 * @param {number} latitude - Latitude of the location
 * @param {number} longitude - Longitude of the location
 * @returns {Promise<Object>} - Horoscope data from the API
 */
export const getCurrentHoroscope = async (datetime, latitude, longitude) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/swiss/get-current-horoscope`, {
      params: { datetime, latitude, longitude },
    });

    return response.data; // Return horoscope data
  } catch (error) {
    console.error('Error fetching horoscope pussy:', error.response?.data || error.message);
    throw error; // Rethrow for handling in UI
  }
};

export const getMyCharts = async () => {
  console.log('Trying to call getMyCharts from horoscopeAPI')
  try {
    const response = await axios.get(`${API_BASE_URL}/api/horoscope/get-my-charts`);
    console.log('Successfully retrieved charts: ', response.data)
    return response.data; // Assumes the API returns an array of charts
  } catch (error) {
    console.error("Error fetching charts:", error);
    return [];
  }
};

export const addChart = async (chartData) => {
  console.log('Trying to call addChart from horoscopeAPI')
  try {
    const response = await axios.post(`${API_BASE_URL}/api/horoscope/add-chart`, chartData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data; // Return the API response data
  } catch (error) {
    console.error("API error - could not add Chart:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Network error.",
    };
  }
};

export const deleteChart = async (chartId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/api/horoscope/delete-chart/${chartId}`);
    console.log('Successfully deleted chart: ', chartId);
    return response.data;
  } catch (error) {
    console.error("Error deleting chart:", error.response?.data || error.message);
    throw error;
  }
};

export const togglePinChart = async (chartId, isPinned) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/horoscope/toggle-pin-chart`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chartId, pinned: isPinned }),
    });

    const data = await response.json();
    if (response.ok) {
      console.log("Chart pinned status updated:", data.chart);
    } else {
      console.error("Error:", data.error);
    }
  } catch (error) {
    console.error("Request failed:", error);
  }
};
