const express = require("express");
const cors = require("cors");
const swissEphRoutes = require("./routes/swissEphRoutes");

const app = express();
const PORT = 6000;

app.use(cors());
app.use(express.json());

// Load Swiss Ephemeris routes
app.use("/api", swissEphRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
