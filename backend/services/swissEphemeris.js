const swisseph = require("swisseph");

/**
 * Get planetary positions for a given datetime and location.
 * @param {Date} datetime - The date/time in UTC.
 * @param {number} latitude - The latitude of the location.
 * @param {number} longitude - The longitude of the location.
 * @returns {Promise<object>} - Object containing planetary positions.
 */
async function getPlanetaryPositions(datetime, latitude, longitude) {
  return new Promise((resolve, reject) => {
    const julianDay = swisseph.swe_julday(
      datetime.getFullYear(),
      datetime.getMonth() + 1,
      datetime.getDate(),
      datetime.getHours() + datetime.getMinutes() / 60,
      swisseph.SE_GREG_CAL
    );

    const planets = {
      Sun: swisseph.SE_SUN,
      Moon: swisseph.SE_MOON,
      Mercury: swisseph.SE_MERCURY,
      Venus: swisseph.SE_VENUS,
      Mars: swisseph.SE_MARS,
      Jupiter: swisseph.SE_JUPITER,
      Saturn: swisseph.SE_SATURN,
      Uranus: swisseph.SE_URANUS,
      Neptune: swisseph.SE_NEPTUNE,
      Pluto: swisseph.SE_PLUTO
    };

    const planetPositions = {};

    let processed = 0;
    for (const [name, id] of Object.entries(planets)) {
      swisseph.swe_calc_ut(julianDay, id, swisseph.SEFLG_SWIEPH, (result) => {
        if (!result) {
          return reject(`Error computing ${name} position`);
        }

        planetPositions[name] = {
          absolute_degree: result.longitude, // Position in ecliptic (0-360°)
          relative_degree: result.longitude % 30, // Position within zodiac (0-30°)
          sign: getZodiacSign(result.longitude)
        };

        processed++;
        if (processed === Object.keys(planets).length) {
          resolve(planetPositions);
        }
      });
    }
  });
}

/**
 * Get house cusps based on selected house division system.
 */
async function getHouseCusps(datetime, latitude, longitude, houseSystem = "P") {
    return new Promise((resolve, reject) => {
      const julianDay = swisseph.swe_julday(
        datetime.getFullYear(),
        datetime.getMonth() + 1,
        datetime.getDate(),
        datetime.getHours() + datetime.getMinutes() / 60,
        swisseph.SE_GREG_CAL
      );
  
      if (houseSystem === "X") {
        // Custom Spatial House Calculation (Placeholder)
        const spatialHouses = calculateSpatialHouses(julianDay, latitude, longitude);
        return resolve(spatialHouses);
      }
  

      swisseph.swe_houses(
        julianDay,
        latitude,
        longitude,
        houseSystem, // "P" = Placidus, "C" = Campanus, "X" = Custom Spatial System
        (result) => {
          if (!result || !result.house) {
            return reject("Error computing house cusps");
          }
  
          resolve(result.house);
        }
      );
    });
  }
  


function calculateSpatialHouses(julianDay, latitude, longitude) {
// Placeholder: Implement your 3D house division logic
// Example: Distribute house cusps based on altitude and planetary position
    return Array(12).fill().map((_, i) => (i * 30) + (latitude % 30)); 
}

/**
 * Get the zodiac sign based on absolute ecliptic degree.
 * @param {number} absoluteDegree - The planet's absolute position (0-360°).
 * @returns {string} - Zodiac sign name.
 */
function getZodiacSign(absoluteDegree) {
  const signs = [
    "Aries", "Taurus", "Gemini", "Cancer",
    "Leo", "Virgo", "Libra", "Scorpio",
    "Sagittarius", "Capricorn", "Aquarius", "Pisces"
  ];
  return signs[Math.floor(absoluteDegree / 30)];
}

module.exports = { getPlanetaryPositions,  getHouseCusps  };
