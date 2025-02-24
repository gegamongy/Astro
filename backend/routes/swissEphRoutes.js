const express = require("express");
const { getPlanetaryPositions, getHouseCusps } = require("../services/swissEphemeris");

const router = express.Router();

/**
 * GET /getCurrentHoroscope
 * Expects query parameters:
 * - datetime: ISO 8601 date string (e.g., "2025-02-23T12:00:00Z")
 * - latitude: Latitude as a float
 * - longitude: Longitude as a float
 */
router.get("/get-current-horoscope", async (req, res) => {
  try {
    const { datetime, latitude, longitude } = req.query;

    if (!datetime || !latitude || !longitude) {
      return res.status(400).json({ error: "Missing required query parameters" });
    }

    const date = new Date(datetime);
    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);

    if (isNaN(lat) || isNaN(lon)) {
      return res.status(400).json({ error: "Invalid latitude or longitude" });
    }

    // Get planetary positions and house cusps
    const [planetPositions, houses] = await Promise.all([
      getPlanetaryPositions(date, lat, lon),
      getHouseCusps(date, lat, lon)
    ]);

    // Assign house numbers to planets based on cusp data
    Object.keys(planetPositions).forEach((planet) => {
      const absDegree = planetPositions[planet].absolute_degree;
      planetPositions[planet].house = Object.keys(houses)
        .map(Number)
        .sort((a, b) => houses[a] - houses[b])
        .find((house) => absDegree < houses[house]) || 12;
    });

    res.json({
      houses,
      planet_positions: planetPositions,
    });

    console.log("Successfully accessed get-current-horoscope endpoint!")
  } catch (error) {
    console.error("Error generating horoscope bitch:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
