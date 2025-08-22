const AuditLog = require('../models/auditLogModel');
const Ticket = require("../models/ticketModel");

// Get all logs for a ticket
exports.getLogsByTicket = async (req, res) => {
  try {
    const { ticketId } = req.params;
    const ticket = await Ticket.findById(ticketId);

    if (!ticket) return res.status(404).json({ message: "Ticket not found" });

    // role restrictions
    if (req.user.role === "user" && ticket.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }
    if (req.user.role === "agent" && ticket.assignee?.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const logs = await AuditLog.find({ ticketId })
      .populate("changedBy", "name role email")
      .sort({ createdAt: 1 }); // timeline order

    res.status(200).json({ logs });
  } catch (error) {
    console.error("Get Logs Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
