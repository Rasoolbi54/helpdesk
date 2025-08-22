const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },

    status: { type: String, enum: ["open", "in-progress", "closed"], default: "open" },
    priority: { type: String, enum: ["low", "medium", "high"], default: "medium" },

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    assignee: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },

    comments: [
      {
        text: String,
        author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        createdAt: { type: Date, default: Date.now },
      },
    ],

    lastUpdate: { type: String, default: "Ticket submitted" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Ticket", ticketSchema);
