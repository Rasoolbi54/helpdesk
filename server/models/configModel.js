const mongoose = require("mongoose");

const configSchema = new mongoose.Schema(
  {
    autoCloseTickets: {
      type: Boolean,
      default: false
    },
    confidenceThreshold: {
      type: Number,
      default: 0.7 // used if AI suggestion is implemented
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Config", configSchema);
