const express = require("express");
const { verifyToken } = require("../middleware/auth");
const { getSuggestions } = require("../controllers/agentSuggestionController");

const router = express.Router();

// Agents & Admin can view suggestions for a ticket
router.get("/:ticketId", verifyToken, getSuggestions);

module.exports = router;
