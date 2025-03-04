const mongoose = require("mongoose");

const planetSchema = new mongoose.Schema({
  absolute_degree: Number,
  relative_degree: Number,
  sign: String,
  house: Number,
});

const displayOptionsSchema = new mongoose.Schema({
  planets: Boolean,
  aspects: Boolean,
});

const chartDataSchema = new mongoose.Schema({
  chart_data_id: Number,
  chart_data_description: String,
  type: String,
  latitude: String,
  longitude: String,
  datetime: Date,
  display_options: displayOptionsSchema,
});

const chartSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Chart name
  description: { type: String }, // Chart description
  planet_positions: {
    Sun: planetSchema,
    Moon: planetSchema,
    Mercury: planetSchema,
    Venus: planetSchema,
    Mars: planetSchema,
    Jupiter: planetSchema,
    Saturn: planetSchema,
    Uranus: planetSchema,
    Neptune: planetSchema,
    Pluto: planetSchema,
  },
  houses: {
    1: Number,
    2: Number,
    3: Number,
    4: Number,
    5: Number,
    6: Number,
    7: Number,
    8: Number,
    9: Number,
    10: Number,
    11: Number,
    12: Number,
  },
  chart_data: [chartDataSchema], // Array of chart data objects
  show_shared_aspects: { type: Boolean, default: false }, // Show shared aspects
  selected_houses_chart: { type: Number, default: null }, // Selected houses chart ID or null
});

const Chart = mongoose.model("Chart", chartSchema);
module.exports = Chart;
