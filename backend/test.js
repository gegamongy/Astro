const { getPlanetaryPositions } = require("./services/swissEphemeris");
const { getHouseCusps } = require("./services/swissEphemeris");

const datetime = new Date("2025-02-22T14:30:00Z");
const latitude = 40.7128;  //New York
const longitude = -74.0060; //New York

getPlanetaryPositions(datetime, latitude, longitude)
  .then((positions) => {
    console.log("Planetary Positions:", positions);
  })
  .catch((error) => {
    console.error("Error:", error);
  });

getHouseCusps(datetime, latitude, longitude, "P")
  .then((houseCusps) => {
    console.log("House Cusps (Placidus):", houseCusps);
  })
  .catch((error) => {
    console.error("Error:", error);
  });