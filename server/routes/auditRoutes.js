const express = require("express");
const { verifyToken } = require("../middleware/auth");
const { getLogsByTicket } = require("../controllers/auditController");

const router = express.Router();

// Fetch logs for a ticket (Admin sees all, Agent sees their tickets, User sees their tickets)
router.get("/:ticketId", verifyToken, getLogsByTicket);

module.exports = router;
