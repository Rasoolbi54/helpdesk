const Ticket = require("../models/ticketModel");
const AuditLog = require('../models/auditLogModel'); 
const { createSuggestion } = require("./agentSuggestionController");
const AgentSuggestion = require('../models/agentSuggessionModel');

exports.createTicket = async (req, res) => {
  const { title, description, category, priority, assignee } = req.body;

  try {
    if (!title || !description || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create new ticket with defaults and refs
    const newTicket = await Ticket.create({
      title,
      description,
      category,
      priority: priority || "medium",
      status: "open",
      createdBy: req.user.id,
      assignee: assignee || null,
      comments: [],
      lastUpdate: "Ticket submitted",
    });

    // Log ticket creation
    await AuditLog.create({
      ticketId: newTicket._id,
      action: "ticket created",
      changedBy: req.user.id,
      newValue: "open",
    });

    // Generate suggestion (mock AI)
    await createSuggestion(newTicket._id);

    // Fetch latest suggestion
    const suggestion = await AgentSuggestion.findOne({
      ticketId: newTicket._id,
    })
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      message: "Ticket created successfully",
      ticket: newTicket,
      suggestion: suggestion ? suggestion.suggestion : null,
    });
  } catch (error) {
    console.error("Create Ticket Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getTickets = async (req, res) => {
  try {
    let tickets;

    if (req.user.role === "admin") {
      tickets = await Ticket.find().populate("createdBy", "name email").populate("assignee", "name email");
    } else if (req.user.role === "agent") {
      tickets = await Ticket.find({ assignee: req.user.id }).populate("createdBy", "name email").populate("assignee", "name email");
    } else {
      tickets = await Ticket.find({ createdBy: req.user.id }).populate("createdBy", "name email").populate("assignee", "name email");
    }

    return res.status(200).json({ tickets });
  } catch (error) {
    console.error("Get Tickets Error", error);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.updateTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    let ticket = await Ticket.findById(id);
    if (!ticket) return res.status(404).json({ message: "Ticket not found" });

    // Restrict user role from updating tickets
    if (req.user.role === "user") {
      return res.status(403).json({ message: "Users cannot update tickets" });
    }

    // Save old values to compare and log changes
    const oldTicket = ticket.toObject();

    // Update allowed fields only
    const allowedFields = ["title", "description", "category", "status", "priority", "assignee", "lastUpdate"];
    Object.keys(updates).forEach((key) => {
      if (allowedFields.includes(key)) {
        ticket[key] = updates[key];
      }
    });

    await ticket.save();

    // Log changes for audit
    for (let key of Object.keys(updates)) {
      if (allowedFields.includes(key) && oldTicket[key] !== updates[key]) {
        await AuditLog.create({
          ticketId: ticket._id,
          action: `${key} updated`,
          changedBy: req.user.id,
          oldValue: oldTicket[key],
          newValue: updates[key],
        });
      }
    }

    res.status(200).json({ message: "Ticket updated", ticket });
  } catch (error) {
    console.error("Update Ticket Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getTicketById = async (req, res) => {
  try {
    const { id } = req.params;

    const ticket = await Ticket.findById(id)
      .populate("createdBy", "name email")
      .populate("assignee", "name email")
      .populate("comments.author", "name email");

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    const auditLogs = await AuditLog.find({ ticketId: id }).sort({ createdAt: -1 });

    const suggestion = await AgentSuggestion.findOne({ ticketId: id })
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json({
      ticket,
      auditLogs,
      suggestion: suggestion ? suggestion.suggestion : null,
    });
  } catch (error) {
    console.error("Get Ticket By ID Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
