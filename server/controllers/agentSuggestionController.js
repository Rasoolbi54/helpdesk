const AgentSuggestion = require('../models/agentSuggessionModel');
const Ticket = require("../models/ticketModel");

// Generate a dummy suggestion for a ticket
exports.createSuggestion = async (ticketId) => {
  // 🔹 Pick a dummy suggestion (you can rotate/randomize)
  const suggestions = [
    "Have you tried restarting your device?",
    "Please clear cache and cookies and try again.",
    "Check your internet connection and retry.",
    "Update to the latest version of the software.",
  ];

  const randomSuggestion =
    suggestions[Math.floor(Math.random() * suggestions.length)];

  await AgentSuggestion.create({
    ticketId,
    suggestion: randomSuggestion,
    confidence: Math.random().toFixed(2), // fake confidence score
  });
};

// Get suggestions for a ticket
exports.getSuggestions = async (req, res) => {
  try {
    const { ticketId } = req.params;
    const suggestions = await AgentSuggestion.find({ ticketId });

    if (!suggestions.length) {
      return res
        .status(404)
        .json({ message: "No suggestions found for this ticket" });
    }

    res.status(200).json({ suggestions });
  } catch (error) {
    console.error("Get Suggestions Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
