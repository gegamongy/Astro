const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require('mongoose');
const swissEphRoutes = require("./routes/swissEphRoutes");
const horoscopeRoutes = require('./routes/horoscopeRoutes')

const app = express();
const PORT = 6000;

app.use(cors());
app.use(express.json());

// Load Swiss Ephemeris routes
app.use("/api/swiss", swissEphRoutes);
app.use("/api/horoscope", horoscopeRoutes);

dotenv.config();
// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
