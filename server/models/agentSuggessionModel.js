const mongoose = require("mongoose");

const agentSuggestionSchema = new mongoose.Schema(
  {
    ticketId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ticket",
      required: true,
    },
    suggestion: {
      type: String,
      required: true,
    },
    confidence: {
      type: Number,
      default: 0.8, // fake confidence score
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AgentSuggestion", agentSuggestionSchema);
