const mongoose = require("mongoose");

const startupSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  name: { type: String, required: true },
  vertical: { type: String, default: "" },
  sub_vertical: { type: String, default: "" },
  city_location: { type: String, default: "" },
  investors_name: { type: [String], default: [] },
  investment_type: { type: String, default: "" },
  amount: { type: Number, default: 0 },
});

const Startup = mongoose.model("Startup", startupSchema);

module.exports = Startup;
