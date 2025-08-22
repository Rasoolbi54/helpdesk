import React, { useContext, useState } from "react";
import {
  User,
  Shield,
  Filter,
  Reply,
  CheckCircle,
  MessageCircle,
  Search,
  Check,
  Star,
  LogOut,
} from "lucide-react";
import { helpDeskContext } from "../context/HelpDeskContext";

// --- MOCK DATA ---

const AGENT_NAME = "Mike Chen";
const AGENT_INITIALS = "MC";

const METRICS = [
  {
    name: "My Tickets",
    value: 23,
    caption: "+3 today",
    color: "bg-blue-100 text-blue-700",
    icon: User,
  },
  {
    name: "Resolved Today",
    value: 8,
    caption: "67% completion",
    color: "bg-green-100 text-green-700",
    icon: CheckCircle,
  },
  {
    name: "Avg Response",
    value: "12m",
    caption: "2m faster",
    color: "bg-orange-100 text-orange-700",
    icon: MessageCircle,
  },
  {
    name: "Customer Rating",
    value: "4.8",
    caption: "+0.2 this week",
    color: "bg-yellow-100 text-yellow-700",
    icon: Star,
  },
];

const MOCK_TICKETS = [
  {
    id: 1247,
    userInitials: "JS",
    username: "John Smith",
    subject: "Email server connection issues",
    status: "in progress",
    priority: "urgent",
    time: "2m ago",
  },
  {
    id: 1243,
    userInitials: "SW",
    username: "Sarah Wilson",
    subject: "Unable to access dashboard",
    status: "open",
    priority: "high",
    time: "15m ago",
  },
  {
    id: 1238,
    userInitials: "MJ",
    username: "Mike Johnson",
    subject: "Feature request for mobile app",
    status: "open",
    priority: "medium",
    time: "1h ago",
  },
  {
    id: 1235,
    userInitials: "LC",
    username: "Lisa Chen",
    subject: "Billing discrepancy question",
    status: "waiting",
    priority: "low",
    time: "3h ago",
  },
];

const STATUS_COLORS = {
  "open": "bg-blue-100 text-blue-800",
  "in progress": "bg-yellow-100 text-yellow-800",
  "waiting": "bg-purple-100 text-purple-800",
  "resolved": "bg-green-100 text-green-800",
};

const PRIORITY_COLORS = {
  urgent: "bg-red-100 text-red-600",
  high: "bg-amber-100 text-amber-700",
  medium: "bg-yellow-100 text-yellow-600",
  low: "bg-blue-100 text-blue-600",
};

const MOCK_RECENT_ACTIVITY = [
  { icon: CheckCircle, text: "Resolved ticket #1234", time: "10m ago" },
  { icon: Reply, text: "Replied to John Smith", time: "25m ago" },
  { icon: Shield, text: "Updated ticket priority", time: "45m ago" },
  { icon: User, text: "Assigned new ticket #1247", time: "2h ago" },
  { icon: Star, text: "Customer rated 5 stars", time: "2h ago" },
];

// Goals
const DAILY_GOALS = [
  { label: "Tickets Resolved", value: 8, goal: 10 },
  { label: "Response Time", value: "12m avg", goal: "N/A" },
  { label: "Customer Satisfaction", value: "4.8/5.0", goal: 5.0 },
];

// --- DASHBOARD COMPONENT ---

export default function AgentDashboard() {
  const [query, setQuery] = useState("");
  const [tickets, setTickets] = useState(MOCK_TICKETS);

  const {user , logout} = useContext(helpDeskContext)

  // Ticket reply/resolve state
  const [replyModal, setReplyModal] = useState({ open: false, ticket: null, text: "" });

  // Handlers
  const handleFilterTickets = () => {
    // Demo: just filters by username or subject for simplicity
    if (!query) setTickets(MOCK_TICKETS);
    else
      setTickets(
        MOCK_TICKETS.filter(
          (t) =>
            t.username.toLowerCase().includes(query.toLowerCase()) ||
            t.subject.toLowerCase().includes(query.toLowerCase())
        )
      );
  };

  const handleReply = (ticket) => {
    setReplyModal({ open: true, ticket, text: "" });
  };

  const handleResolve = (ticketId) => {
    setTickets((prev) =>
      prev.map((t) =>
        t.id === ticketId ? { ...t, status: "resolved" } : t
      )
    );
  };

  const submitReply = () => {
    // In real app you'd send to backend here
    setReplyModal({ open: false, ticket: null, text: "" });
    // Optionally, you could also update ticket status locally
  };

  return (
    <div className="bg-gray-50 min-h-screen flex">
      {/* Sidebar */}
     <aside className="fixed top-0 left-0 bottom-0 w-64 bg-white border-r border-gray-200 flex flex-col justify-between">
       <div>
         <div className="p-6 flex items-center gap-3">
           <div className="bg-blue-600 rounded-full p-2">
             <Shield className="text-white" />
           </div>
           <div>
             <div className="font-bold text-lg text-black">Wexa.ai HelpDesk</div>
             <div className="text-xs text-gray-500">Support Dashboard</div>
           </div>
         </div>
         <nav className="space-y-1 px-6 mt-6">
           <div className="font-semibold text-xs text-gray-500 mb-1">NAVIGATION</div>
           <a href="#" className="flex items-center gap-2 px-3 py-2 text-purple-700 bg-purple-100 rounded font-semibold">
             <User size={18} /> Dashboard
           </a>
         </nav>
       </div>
       <div className="flex items-center justify-between p-6 border-t border-gray-100">
        
         <div className="flex items-center gap-2">
           <div className="bg-green-600 rounded-full w-10 h-10 flex items-center justify-center text-white font-bold text-lg">
             AG
           </div>
           <div>
             <div className="font-semibold text-gray-900 text-sm">{user?.name}</div>
             <div className="text-xs text-gray-500">{user?.email}</div>
           </div>
         </div>
     
        
         <button
          onClick={() => {
             logout();
             navigate('/login');
           }} 
           className="ml-3 px-1 py-1 text-sm  cursor-pointer text-black rounded"
         >
           <LogOut  size={20}/>
         </button>
       </div>
     </aside>

      {/* Main Content */}
      <div className="flex-1 ml-64 px-8 py-6 text-black">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Support Dashboard</h1>
            <p className="text-gray-500">Comprehensive helpdesk management system</p>
          </div>
         
        </div>

        {/* Top Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          {METRICS.map((m, i) => (
            <div key={i} className={`bg-purple-500 text-white shadow-md rounded-lg px-6 py-6 flex flex-col items-center`}>
              <div className={`${m.color} w-14 h-14 flex items-center justify-center rounded-full mb-4`}>
                <m.icon size={28} />
              </div>
              <div className="text-white font-semibold mb-1">{m.name}</div>
              <div className="text-2xl font-bold">{m.value}</div>
              <span className="text-white text-xs mt-1">{m.caption}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          {/* Ticket Queue */}
          <div className="col-span-2 bg-white shadow rounded p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-lg font-bold">My Ticket Queue</div>
              <div className="flex gap-2">
                <div className="flex items-center rounded border px-2">
                  <Search className="w-4 h-4 text-gray-400" />
                  <input
                    className="bg-transparent px-2 py-1 text-sm outline-none"
                    placeholder="Search tickets..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onBlur={handleFilterTickets}
                    onKeyDown={(e) => { if (e.key === "Enter") handleFilterTickets(); }}
                  />
                  <button onClick={handleFilterTickets} className="ml-1">
                    <Filter className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              </div>
            </div>
            <ul>
              {tickets.map((t) => (
                <li key={t.id} className="flex items-center justify-between py-5 border-b last:border-none">
                  <div className="flex items-center gap-5">
                    <div className="rounded-full w-10 h-10 bg-purple-100 flex items-center justify-center font-bold text-purple-900">{t.userInitials}</div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">#{t.id}</span>
                        <span className={`px-2 py-1 rounded text-xs font-bold ${STATUS_COLORS[t.status]}`}>{t.status}</span>
                        <span className={`px-2 py-1 rounded text-xs font-bold ${PRIORITY_COLORS[t.priority]}`}>{t.priority}</span>
                        <span className="text-xs text-slate-400">{t.time}</span>
                      </div>
                      <div className="font-medium">{t.username}</div>
                      <div className="text-gray-700 text-sm">{t.subject}</div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="px-3 py-2 rounded text-purple-600 border hover:bg-blue-100 text-xs flex items-center gap-1"
                      onClick={() => handleReply(t)}
                    >
                      <Reply size={14} className="mr-1" /> Reply
                    </button>
                    {t.status !== "resolved" && (
                      <button
                        className="px-3 py-2 rounded text-green-700 border hover:bg-green-100 text-xs flex items-center gap-1"
                        onClick={() => handleResolve(t.id)}
                      >
                        <Check size={16} className="mr-1" /> Resolve
                      </button>
                    )}
                  </div>
                </li>
              ))}
              {tickets.length === 0 && (
                <li className="py-12 text-center text-gray-400 text-sm">No tickets found</li>
              )}
            </ul>
          </div>

          {/* RHS: Goals and Activity */}
          <div className="space-y-6">
            {/* Today's Goals */}
            <div className="bg-white rounded shadow p-6">
              <div className="font-bold mb-4 text-gray-900">Today's Goals</div>
              <ul className="space-y-3">
                {DAILY_GOALS.map((goal, idx) => (
                  <li key={idx}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{goal.label}</span>
                      <span className={`${goal.label === "Response Time" ? "text-green-600 font-semibold" : ""}`}>
                        {goal.value}{goal.goal !== "N/A" && `/${goal.goal}`}
                      </span>
                    </div>
                    {typeof goal.goal === "number" && (
                      <div className="h-1 rounded bg-gray-100">
                        <div
                          className="h-1 rounded bg-purple-600"
                          style={{
                            width: `${Math.min(100, (goal.value / goal.goal) * 100)}%`,
                          }}
                        />
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            {/* Recent Activity */}
            <div className="bg-slate-100 rounded shadow p-6">
              <div className="font-bold mb-4 text-gray-900">Recent Activity</div>
              <ul className="space-y-4">
                {MOCK_RECENT_ACTIVITY.map((a, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-gray-700">
                    <a.icon className="text-purple-400 w-5 h-5" /> <span>{a.text}</span>
                    <span className="ml-auto text-xs text-gray-400">{a.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Reply Modal */}
        {replyModal.open && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                submitReply();
              }}
              className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="font-bold text-lg mb-2">Reply to #{replyModal.ticket.id}</h3>
              <div className="mb-4">
                <textarea
                  required
                  className="w-full border border-slate-200 rounded p-2 min-h-[60px]"
                  placeholder="Type your reply..."
                  value={replyModal.text}
                  onChange={(e) =>
                    setReplyModal((r) => ({ ...r, text: e.target.value }))
                  }
                />
              </div>
              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  className="px-3 py-2 rounded bg-gray-100"
                  onClick={() => setReplyModal({ open: false, ticket: null, text: "" })}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-2 rounded bg-purple-600 text-white font-semibold"
                >
                  Send Reply
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
