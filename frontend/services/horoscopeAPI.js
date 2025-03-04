import axios from 'axios';

const API_BASE_URL = 'http://192.168.1.73:6000';  // Your Express server URL

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
  try {
    const response = await axios.get(`${API_BASE_URL}/api/horoscope/get-my-charts`);
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