const mongoose = require("mongoose");

const auditLogSchema = new mongoose.Schema(
  {
    ticketId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ticket",
      required: true
    },
    action: { type: String, required: true }, // e.g. "ticket created", "assigned", "status updated"
    changedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    oldValue: { type: String },
    newValue: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model("AuditLog", auditLogSchema);
