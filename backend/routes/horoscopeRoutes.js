const express = require("express");
const router = express.Router();
const Chart = require("../models/Charts");
const { getPlanetaryPositions, getHouseCusps } = require("../services/swissEphemeris");

// Get all charts (no authentication required)
router.get("/get-my-charts", async (req, res) => {
  console.log("/get-my-charts endpoint called");

  try {
    const charts = await Chart.find(); // Get all charts from DB
    res.json(charts);
  } catch (error) {
    console.error("Error fetching charts:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Add a new chart (no authentication required)
router.post("/add-chart", async (req, res) => {
    console.log("/add-chart endpoint called");
  
    try {
      const { name, description, data, showSharedAspects, selectedHousesChart } = req.body;
  
      // Extract the datetime and location from the chart data
      if (!data || data.length === 0) {
        return res.status(400).json({ message: "Chart data is required" });
      }
  
      const { datetime, latitude, longitude } = data[0]; // Assuming the first data entry contains the necessary details
      console.log("Datetime response: ", datetime, " , Location response", latitude,', ', longitude);
      // Get planetary positions and house cusps from Swiss Ephemeris
      
      console.log("Is datetime a Date object?", datetime instanceof Date);
      console.log("Type of datetime:", typeof datetime);

      const formattedDateTime = new Date(datetime);
      const planet_positions = await getPlanetaryPositions(formattedDateTime, latitude, longitude);
      const houses = await getHouseCusps(formattedDateTime, latitude, longitude);
      // Convert array to an object with numbered keys as strings
      const houseObject = houses.reduce((acc, value, index) => {
        acc[index + 1] = value; // Keys should be 1-12 as strings
        return acc;
      }, {});

      console.log('Add Chart Endpoint - current houses: ', houseObject)

      // Create new chart
      const newChart = new Chart({
        name,
        description,
        chart_data: data,
        show_shared_aspects: showSharedAspects,
        selected_houses_chart: selectedHousesChart,
        planet_positions,
        houses: houseObject,
      });
      console.log('NEW CHART: ', newChart)
      // Save to database
      await newChart.save();
  
      res.status(200).json({ success: true, message: "Chart added successfully", chart: newChart });
    } catch (error) {
      console.error("Error adding chart:", error);
      res.status(500).json({ message: "Server error" });
    }
  });

// Delete a chart by ID (no authentication required)
router.delete("/delete-chart/:id", async (req, res) => {
  console.log("/delete-chart endpoint called");

  try {
    const deletedChart = await Chart.findByIdAndDelete(req.params.id);
    if (!deletedChart) {
      return res.status(404).json({ message: "Chart not found" });
    }
    res.json({ message: "Chart deleted successfully" });
  } catch (error) {
    console.error("Error deleting chart:", error);
    res.status(500).json({ message: "Server error" });
  }
});


// Route to toggle the pinned status of a chart
router.post("/toggle-pin-chart", async (req, res) => {
    console.log('Pin chart endpoint called.')
    try {
      const { chartId, pinned } = req.body;
  
      if (!chartId || typeof pinned !== "boolean") {
        return res.status(400).json({ error: "Invalid request parameters" });
      }
  
      const updatedChart = await Chart.findByIdAndUpdate(
        chartId,
        { pinned },
        { new: true } // Return the updated document
      );
  
      if (!updatedChart) {
        return res.status(404).json({ error: "Chart not found" });
      }
  
      res.status(200).json({ message: "Chart updated successfully", chart: updatedChart });
    } catch (error) {
      console.error("Error updating pinned status:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });


module.exports = router;
