"use client";

import React, { useContext, useState } from "react";
import {
  Headset,
  User,
  Plus,
  MessageCircle,
  Phone,
  Book,
  Home,
  Ticket,
  Shield,
  FileText,
  LogOut,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { helpDeskContext } from "../context/HelpDeskContext";
import axios from "axios";

// Helpers for status & priorities
const statusColors = {
  open: "bg-blue-100 text-blue-800 border-blue-200",
  in_progress: "bg-yellow-100 text-yellow-800 border-yellow-200",
  waiting: "bg-purple-100 text-purple-800 border-purple-200",
  resolved: "bg-green-100 text-green-800 border-green-200",
};

const priorityColors = {
  urgent: "bg-red-100 text-red-800 border-red-200",
  high: "bg-orange-100 text-orange-800 border-orange-200",
  medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
  low: "bg-blue-100 text-blue-800 border-blue-200",
};

const quickActions = [
  {
    title: "Submit New Ticket",
    icon: Plus,
    color: "from-blue-500 to-blue-600",
    action: "new_ticket",
  },
  {
    title: "Live Chat Support",
    icon: MessageCircle,
    color: "from-green-500 to-green-600",
    action: "live_chat",
  },
  {
    title: "Call Support",
    icon: Phone,
    color: "from-purple-500 to-purple-600",
    action: "call_support",
  },
  {
    title: "Browse Help Center",
    icon: Book,
    color: "from-orange-500 to-orange-600",
    action: "help_center",
  },
];

export default function UserDashboard() {
  const { user, logout, token } = useContext(helpDeskContext);
  console.log(token, "comingggggggggggggg") ;
  

  const navigate = useNavigate();
  // Mock tickets
  const [tickets, setTickets] = useState([]);
  // Modals and form states
  const [showNewTicket, setShowNewTicket] = useState(false);
  const [showDetailsId, setShowDetailsId] = useState(null);
  const [showCommentId, setShowCommentId] = useState(null);
  const initialTicket = {
    title: "",
    description: "",
    priority: "medium",
    category: "",
    comment:[],
    agent: "",
  };

  const [newTicket, setNewTicket] = useState(initialTicket);
  const [quickForm, setQuickForm] = useState({
    issueType: "",
    priority: "",
    description: "",
  });
  const [comment, setComment] = useState("");
  const [showProfile, setShowProfile] = useState(false);
  // Handlers
  function handleQuickActionClick(action) {
    switch (action) {
      case "new_ticket":
        setShowNewTicket(true);
        break;
      case "live_chat":
        window.open("https://your.livechat.url", "_blank");
        break;
      case "call_support":
        window.open("tel:1800SUPPORT");
        break;
      case "help_center":
        navigate("/help-center");
        break;
      default:
        break;
    }
  }
async function handleNewTicketSubmit(e) {
  e.preventDefault();
  try {
    const payload = {
      title: newTicket.title,
      description: newTicket.description,
      category: newTicket.category.toLowerCase(), // match allowed categories
      priority: newTicket.priority.toLowerCase(), // must be low/medium/high
      assignee: null, // initially unassigned
      createdBy: user._id, // required field
      comments: [],
      lastUpdate: "Ticket submitted",
    };

    const response = await axios.post(
      "http://localhost:2000/api/tickets",
      payload,
     token,


     
     
    );

    const createdTicket = response.data;
    setTickets([createdTicket, ...tickets]);
    setShowNewTicket(false);
    setNewTicket(initialTicket);
  } catch (error) {
    console.error("Failed to create ticket:", error.response?.data || error);
  }
}


   

  function handleQuickFormSubmit(e) {
    e.preventDefault();
    setTickets([
      {
        id: Math.floor(Math.random() * 10000),
        status: "open",
        priority: quickForm.priority,
        title: quickForm.description,
        agent: "Unassigned",
        comments: [],
        time: "now",
        lastUpdate: "Ticket submitted",
        description: quickForm.description,
      },
      ...tickets,
    ]);
    setQuickForm({ issueType: "", priority: "", description: "" });
  }
  function handleAddCommentSubmit(e) {
    e.preventDefault();
    setTickets(
      tickets.map((ticket) => {
        if (ticket.id === showCommentId) {
          return {
            ...ticket,
            comments: [
              ...ticket.comments,
              { user: "You", text: comment, time: "now" },
            ],
            lastUpdate: "Comment added",
          };
        }
        return ticket;
      })
    );
    setComment("");
    setShowCommentId(null);
  }

  // Modals
  function TicketModal() {
    if (!showNewTicket) return null;

    return (
      <div
        className={`fixed inset-0 bg-black/30 flex items-center justify-center z-50 `}
      >
        <form
          onSubmit={handleNewTicketSubmit}
          className="bg-white p-8 rounded-lg shadow-lg flex flex-col gap-4 w-96"
        >
          <h2 className="text-lg font-bold mb-2">New Ticket</h2>
          <input
            type="text"
            placeholder="Title"
            value={newTicket.title}
            onChange={(e) =>
              setNewTicket((t) => ({ ...t, title: e.target.value }))
            }
            className="border rounded p-2"
            required
          />
          <textarea
            placeholder="Describe your issue"
            value={newTicket.description}
            onChange={(e) =>
              setNewTicket((t) => ({ ...t, description: e.target.value }))
            }
            className="border rounded p-2"
            required
          />
          <select
            value={newTicket.priority}
            onChange={(e) =>
              setNewTicket((t) => ({ ...t, priority: e.target.value }))
            }
            className="border rounded p-2"
            required
          >
            <option value="urgent">Urgent</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <select
            value={newTicket.category}
            onChange={(e) =>
              setNewTicket((t) => ({ ...t, category: e.target.value }))
            }
            className="border rounded p-2"
            required
          >
            <option value="urgent">billing</option>
            <option value="high">shipping</option>
            <option value="medium">refund</option>
            <option value="low">other</option>
          </select>
          <button
            type="submit"
            className="bg-purple-600 text-white px-4 py-2 rounded-lg cursor-pointer"
          >
            Submit
          </button>
          <button
            onClick={() => setShowNewTicket(false)}
            type="button"
            className="text-gray-600 cursor-pointer border py-2 rounded-lg hover:bg-purple-100 hover:border-purple-500 "
          >
            Cancel
          </button>
        </form>
      </div>
    );
  }

  function TicketDetailsModal() {
    const ticket = tickets.find((t) => t.id === showDetailsId);
    if (!showDetailsId || !ticket) return null;
    return (
      <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-lg shadow-lg w-[28rem] max-w-full">
          <h2 className="text-xl font-bold mb-2">Ticket #{ticket.id}</h2>
          <div className="mb-2">
            Status:{" "}
            <span className={statusColors[ticket.status]}>{ticket.status}</span>
          </div>
          <div className="mb-2 font-semibold">{ticket.title}</div>
          <div className="mb-2">{ticket.description}</div>
          <div>Assigned Agent: {ticket.agent || "Unassigned"}</div>
          <div>Last update: {ticket.lastUpdate || "-"}</div>
          <div className="mt-3">
            <strong>Comments:</strong>
            <ul className="list-disc ml-4">
              {ticket.comments.length === 0 && <li>No comments yet.</li>}
              {ticket.comments.map((c, i) => (
                <li key={i} className="text-sm">
                  {c.user}: {c.text}{" "}
                  <span className="text-xs text-gray-500">({c.time})</span>
                </li>
              ))}
            </ul>
          </div>
          <button
            onClick={() => setShowDetailsId(null)}
            className="mt-4 px-3 py-2 rounded bg-gray-200"
          >
            Close
          </button>
        </div>
      </div>
    );
  }
  function AddCommentModal() {
    if (!showCommentId) return null;
    return (
      <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
        <form
          onSubmit={handleAddCommentSubmit}
          className="bg-white p-8 rounded-lg shadow-lg flex flex-col gap-4 w-96"
        >
          <h2 className="text-lg font-bold mb-2">Add Comment</h2>
          <textarea
            placeholder="Type your comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="border rounded p-2"
            required
          />
          <button
            type="submit"
            className="bg-purple-600 text-white px-4 py-2 rounded-lg"
          >
            Submit
          </button>
          <button
            onClick={() => setShowCommentId(null)}
            type="button"
            className="text-gray-600"
          >
            Cancel
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <TicketModal />
      <TicketDetailsModal />
      <AddCommentModal />
      {/* Sidebar */}
      <aside className="w-64 bg-white fixed top-0 left-0 h-screen flex flex-col justify-between border-r border-gray-200">
        <div>
          <div className="p-6 flex items-center gap-3">
            <div className="bg-blue-600 rounded-full p-2">
              <Shield className="text-white" />
            </div>
            <div>
              <div className="font-bold text-lg">Wexa.ai HelpDesk</div>
              <div className="text-xs text-gray-500">Support Dashboard</div>
            </div>
          </div>
          <nav className="space-y-1 px-6 mt-6">
            <div className="font-semibold text-xs text-gray-500 mb-1">
              NAVIGATION
            </div>
            <Link
              to="/"
              className="flex items-center gap-2 px-3 py-2 text-purple-700 font-semibold bg-purple-100 rounded"
            >
              <User size={18} /> Dashboard
            </Link>
            {/* Other nav links */}
          </nav>
        </div>

        {/* Profile & Logout at bottom */}
        <div className="p-6 border-t border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-green-600 rounded-full h-10 w-10 flex items-center justify-center text-white font-bold text-lg">
              {user?.name
                ? user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()
                : "U"}
            </div>
            <div>
              <p className="font-semibold text-gray-900">
                {user?.name || "User"}
              </p>
              <p className="text-xs text-gray-500">{user?.email || ""}</p>
            </div>
          </div>
          <button
            onClick={() => {
              logout();
              navigate("/login");
            }}
            className="flex justify-center items-center bg-red-500 w-full text-center gap-2  py-2 text-white cursor-pointer"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
      {/* Main Content */}
      <main className="ml-64 p-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Support Dashboard</h1>
            <p className="text-gray-500">
              Comprehensive helpdesk management system
            </p>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 rounded-lg bg-purple-600 text-white">
              {user?.name}
            </button>
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="px-4 py-2 relative rounded-lg border text-gray-700 flex items-center gap-1 hover:bg-purple-400 hover:text-white"
            >
              <User size={20} /> profile
            </button>

            {showProfile && (
              <div
                className="absolute top-22 right-5 w-56 bg-white shadow-lg rounded border border-gray-300 z-50"
                onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
              >
                <div className="p-4 border-b">
                  <p className="font-semibold text-gray-900">
                    {user?.name || "No Name"}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {user?.email || "No Email"}
                  </p>
                </div>
                <button
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-600 hover:text-white font-semibold rounded-b"
                  onClick={() => {
                    logout(); // your logout function from context
                    navigate("/login"); // navigate to login page
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
        {/* Welcome Section */}
        <div className="bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl p-8 text-white shadow-2xl mb-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-2">
              Welcome back! {user?.name}
            </h2>
            <p className="text-blue-100 text-lg mb-6">
              How can we help you today? Browse your tickets or get instant
              support.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <div
                    key={index}
                    className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all rounded-lg duration-300 cursor-pointer"
                    onClick={() => handleQuickActionClick(action.action)}
                  >
                    <div className="p-4 flex items-center gap-3">
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center shadow-lg`}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-white text-sm">
                          {action.title}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {/* Tickets Section */}
        <div className="grid lg:grid-cols-3 gap-8 ">
          {/* My Tickets */}
          <div className="lg:col-span-2 ">
            <div className="bg-white/80 backdrop-blur-sm border border-slate-200 shadow-lg p-5 rounded-md">
              <div className="border-b border-slate-100 pb-4 flex justify-between items-center px-6">
                <div className="text-xl font-bold text-slate-900">
                  My Support Tickets
                </div>
                <button
                  className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded-lg flex items-center gap-1"
                  onClick={() => setShowNewTicket(true)}
                >
                  <Plus className="w-4 h-4 mr-2" /> New Ticket
                </button>
              </div>
              <div className="p-0">
                <div className="space-y-1">
                  {tickets.length === 0 ? (
                    <div className="p-6">No tickets yet.</div>
                  ) : (
                    tickets.map((ticket) => (
                      <div
                        key={ticket.id}
                        className="p-6 border-b border-slate-100 last:border-b-0 hover:bg-slate-50 transition-colors cursor-pointer"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl flex items-center justify-center">
                              <FileText className="w-6 h-6 text-slate-600" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-bold text-slate-900">
                                  {ticket.id}
                                </span>
                                <div
                                  className={`${
                                    statusColors[ticket.status]
                                  } text-xs font-medium border px-1 rounded`}
                                >
                                  {ticket.status &&
                                    ticket.status.replace("_", " ")}
                                </div>
                                <p
                                  className={`${
                                    priorityColors[ticket.priority] || ""
                                  } text-xs font-medium border px-1 rounded`}
                                >
                                  {ticket.priority}
                                </p>
                              </div>
                              <h3 className="font-semibold text-slate-900 mb-1">
                                {ticket.title}
                              </h3>
                              <p className="text-sm text-slate-600">
                                Agent: {ticket.agent || "Unassigned"}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-slate-500 mb-1">
                              {ticket.time}
                            </p>
                            <p className="text-xs text-slate-600 font-medium">
                              {ticket.lastUpdate}
                            </p>
                          </div>
                        </div>
                        <div className="flex justify-end gap-2">
                          <button
                            className="px-3 py-2 text-xs border rounded-md border-gray-200 flex items-center gap-1"
                            onClick={() => setShowDetailsId(ticket.id)}
                          >
                            <MessageCircle className="w-3 h-3" /> View Details
                          </button>
                          {ticket.status !== "resolved" && (
                            <button
                              className="px-3 py-2 text-xs border border-gray-200 rounded-md"
                              onClick={() => setShowCommentId(ticket.id)}
                            >
                              Add Comment
                            </button>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* Quick Support Sidebar */}
          <div className="space-y-6">
            <form
              className="bg-white/80 backdrop-blur-sm border border-slate-200 shadow-lg p-6 rounded-md"
              onSubmit={handleQuickFormSubmit}
            >
              <div className="text-lg font-bold text-slate-900 mb-4">
                Quick Support
              </div>
              <div className="mb-4">
                <label className="text-sm font-semibold text-slate-700 mb-2 block">
                  Issue Type
                </label>
                <select
                  className="w-full border border-gray-200 rounded-lg p-2 text-sm"
                  value={quickForm.issueType}
                  onChange={(e) =>
                    setQuickForm((f) => ({ ...f, issueType: e.target.value }))
                  }
                  required
                >
                  <option value="">Select issue type</option>
                  <option value="technical">Technical Issue</option>
                  <option value="billing">Billing Question</option>
                  <option value="account">Account Help</option>
                  <option value="feature">Feature Request</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="text-sm font-semibold text-slate-700 mb-2 block">
                  Priority
                </label>
                <select
                  className="w-full border border-gray-200  rounded-lg p-2 text-sm"
                  value={quickForm.priority}
                  onChange={(e) =>
                    setQuickForm((f) => ({ ...f, priority: e.target.value }))
                  }
                  required
                >
                  <option value="">Select priority</option>
                  <option value="urgent">Urgent</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="text-sm font-semibold text-slate-700 mb-2 block">
                  Description
                </label>
                <textarea
                  placeholder="Describe your issue..."
                  className="w-full border border-gray-200  rounded-lg p-2 h-24 text-sm"
                  value={quickForm.description}
                  onChange={(e) =>
                    setQuickForm((f) => ({ ...f, description: e.target.value }))
                  }
                  required
                />
              </div>
              <button
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg"
                type="submit"
              >
                Submit Ticket
              </button>
            </form>
            <div className="bg-green-500 rounded-md shadow-lg p-6 text-white ">
              <div className="flex flex-col items-center text-center gap-4">
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-lg">Need Immediate Help?</h3>
                <p className="text-sm text-green-100">
                  Our support team is available 24/7
                </p>
                <div className="space-y-1 text-sm">
                  <p className="font-semibold flex items-center justify-center gap-1">
                    <span role="img" aria-label="phone">
                      📞
                    </span>{" "}
                    1-800-SUPPORT
                  </p>
                  <p className="font-semibold flex items-center justify-center gap-1">
                    <span role="img" aria-label="email">
                      ✉️
                    </span>{" "}
                    support@helpdesk.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
