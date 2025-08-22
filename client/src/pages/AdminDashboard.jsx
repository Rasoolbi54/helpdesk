import React, { useContext, useState } from "react";
import {
  UserPlus,
  User,
  Shield,
  Plus,
  Filter,
  Settings,
} from "lucide-react";
import { helpDeskContext } from "../context/HelpDeskContext";

const AGENT_DEFAULT = [
  { id: 1, name: "Sarah Johnson", initials: "SJ", email: "sarah.johnson@helpdesk.com", tickets: 45, status: "Online" },
  { id: 2, name: "Mike Chen", initials: "MC", email: "mike.chen@helpdesk.com", tickets: 38, status: "Online" },
  { id: 3, name: "Emily Davis", initials: "ED", email: "emily.davis@helpdesk.com", tickets: 42, status: "Busy" },
  { id: 4, name: "Alex Wilson", initials: "AW", email: "alex.wilson@helpdesk.com", tickets: 31, status: "Offline" },
  { id: 5, name: "Lisa Brown", initials: "LB", email: "lisa.brown@helpdesk.com", tickets: 35, status: "Online" },
];

const TICKETS_DEFAULT = [
  { id: 1247, subject: "Email server not responding", priority: "urgent", assigned: "Sarah Johnson", time: "2m ago" },
  { id: 1246, subject: "Password reset issue", priority: "high", assigned: "Mike Chen", time: "15m ago" },
  { id: 1245, subject: "Feature request: Dark mode", priority: "low", assigned: "Emily Davis", time: "1h ago" },
  { id: 1244, subject: "Billing inquiry", priority: "medium", assigned: "Alex Wilson", time: "2h ago" },
];

const STATUS_COLORS = {
  Online: "text-green-600",
  Busy: "text-yellow-500",
  Offline: "text-gray-400",
};

const PRIORITY_COLORS = {
  urgent: "bg-red-100 text-red-600",
  high: "bg-amber-100 text-amber-700",
  medium: "bg-yellow-100 text-yellow-600",
  low: "bg-blue-100 text-blue-600",
};

export default function AdminDashboard() {
  const [showAgentModal, setShowAgentModal] = useState(false);
  const [agents, setAgents] = useState(AGENT_DEFAULT);
  const [recentTickets] = useState(TICKETS_DEFAULT);
  const [systemHealth] = useState({
    "Email System": 99.9,
    "Chat Widget": 98.5,
    "API Response": 94.2,
  });
  const [newAgent, setNewAgent] = useState({ name: "", email: "", status: "Online" });
  const {user , logout} = useContext(helpDeskContext);

  const handleAddAgent = (e) => {
    e.preventDefault();
    if (!newAgent.name || !newAgent.email) return;
    setAgents([
      ...agents,
      {
        id: Date.now(),
        name: newAgent.name,
        initials: newAgent.name.split(" ").map((w) => w[0]).join("").toUpperCase(),
        email: newAgent.email,
        tickets: 0,
        status: newAgent.status,
      },
    ]);
    setNewAgent({ name: "", email: "", status: "Online" });
    setShowAgentModal(false);
  };

  return (
    <div className="bg-gray-50 min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col justify-between">
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
  {/* Profile Section */}
  <div className="flex items-center gap-2">
    <div className="bg-green-600 rounded-full w-10 h-10 flex items-center justify-center text-white font-bold text-lg">
      AD
    </div>
    <div>
      <div className="font-semibold text-gray-900 text-sm">Admin User</div>
      <div className="text-xs text-gray-500">System Administrator</div>
    </div>
  </div>

  {/* Logout Button */}
  <button
    onClick={() => alert("Logging out...")} // Replace with actual logout function
    className="ml-3 px-3 py-1 text-sm bg-red-500 hover:bg-red-600 text-white rounded"
  >
    Logout
  </button>
</div>

      </aside>
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
        AD
      </div>
      <div>
        <div className="font-semibold text-gray-900 text-sm">{user?.name}</div>
        <div className="text-xs text-gray-500">System Administrator</div>
      </div>
    </div>

   
    <button
     onClick={() => {
        logout();
        navigate('/login');
      }} 
      className="ml-3 px-3 py-1 text-sm bg-red-500 hover:bg-red-600 text-white rounded"
    >
      Logout
    </button>
  </div>
</aside>

      {/* Main Content */}
      <div className="flex-1  px-8 py-6">
        {/* Top Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl text-black font-bold">Support Dashboard</h1>
            <p className="text-gray-500">Comprehensive helpdesk management system</p>
          </div>
       
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8 text-black ">
          <QuickStat icon={User} label="Total Tickets" value="1,247" change="+12%" />
          <QuickStat icon={UserPlus} label="Active Agents" value="24" change="+2" />
          <QuickStat icon={Shield} label="Resolution Rate" value="94.2%" change="+1.8%" />
          <QuickStat icon={Settings} label="Avg Response Time" value="2.4h" change="-0.3h" />
        </div>

        {/* Lower Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          {/* Agent Performance */}
          <div className="col-span-2 bg-white shadow rounded p-6">
            <AgentPerformanceTable agents={agents} onAddAgent={() => setShowAgentModal(true)} />
          </div>

          {/* Recent Tickets */}
          <RecentTickets tickets={recentTickets} />
        </div>

        {/* System Health */}
        <SystemHealth healthData={systemHealth} />
      </div>

      {/* Add Agent Modal */}
      {showAgentModal && (
        <AddAgentModal
          onClose={() => setShowAgentModal(false)}
          onAddAgent={handleAddAgent}
          agentData={newAgent}
          setAgentData={setNewAgent}
        />
      )}
    </div>
  );
}

// Components

const QuickStat = ({ icon: Icon, label, value, change }) => (
  <div className="bg-white shadow rounded px-6 py-6 flex flex-col items-center">
    <div className="bg-purple-100 text-purple-700 w-14 h-14 flex items-center justify-center rounded-full mb-4">
      <Icon size={28} />
    </div>
    <div className="text-gray-500 font-semibold mb-1">{label}</div>
    <div className="text-2xl font-bold">{value}</div>
    <span className="text-green-500 text-xs mt-1">{change} from last month</span>
  </div>
);

const AgentPerformanceTable = ({ agents, onAddAgent }) => (
  <>
    <div className="flex items-center justify-between mb-4">
      <div className="text-lg font-bold text-black">Agent Performance</div>
      <div className="flex gap-2">
        <button
          className="bg-purple-600 text-white font-semibold px-3 py-1 rounded flex items-center gap-1"
          onClick={onAddAgent}
          title="Add Agent"
        >
          <Plus size={18} /> Add Agent
        </button>
        <button className="text-gray-600 px-3 py-1 rounded flex items-center gap-1 border hover:bg-gray-100">
          <Filter size={16} /> Filter
        </button>
      </div>
    </div>
    <table className="w-full text-left">
      <thead>
        <tr className="text-xs text-gray-400 uppercase">
          <th className="py-2">Agent</th>
          <th className="py-2">Tickets Handled</th>
          <th className="py-2">Status</th>
        </tr>
      </thead>
      <tbody>
        {agents.map((a, i) => (
          <tr key={i} className="border-b last:border-none">
            <td className="py-3 flex text-black items-center gap-2 font-medium">
              <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-purple-200 font-bold text-purple-900">
                {a.initials}
              </span>
              {a.name}
            </td>
            <td className="py-3">
              <div className="flex items-center gap-2">
                {a.tickets}
                <div className="w-24 h-2 rounded bg-gray-100 t">
                  <div
                    className="h-2 rounded bg-purple-600"
                    style={{ width: `${Math.min(100, (a.tickets / 50) * 100)}%` }}
                  />
                </div>
              </div>
            </td>
            <td className="py-3 font-medium">
              <span className={STATUS_COLORS[a.status] || ""}>{a.status}</span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </>
);

const RecentTickets = ({ tickets }) => (
  <div className="bg-white text-black shadow rounded p-6">
    <div className="text-lg font-bold mb-4">Recent Tickets</div>
    <ul className="divide-y divide-gray-100">
      {tickets.map((t) => (
        <li key={t.id} className="py-3 flex justify-between items-center">
          <div>
            <div className="font-semibold text-sm">#{t.id}</div>
            <div className="text-gray-800">{t.subject}</div>
            <div className="text-gray-400 text-xs">Assigned: {t.assigned}</div>
          </div>
          <div className="flex flex-col items-end">
            <span
              className={`text-xs px-2 py-1 rounded font-bold ${PRIORITY_COLORS[t.priority]}`}
            >
              {t.priority}
            </span>
            <span className="text-xs text-gray-400 mt-1">{t.time}</span>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

const SystemHealth = ({ healthData }) => (
  <div className="bg-white text-black shadow rounded mt-8 p-6 flex flex-col gap-3">
    <div className="flex items-center justify-between">
      <span className="text-lg font-bold">System Health</span>
      <button className="flex items-center gap-2 text-gray-600 px-2 rounded hover:bg-gray-100">
        <Settings size={16} /> Configure
      </button>
    </div>
    <div className="space-y-2 mt-3">
      {Object.entries(healthData).map(([system, value]) => (
        <div key={system}>
          <div className="flex justify-between text-sm font-semibold mb-1">
            <span>{system}</span>
            <span
              className={
                value < 96
                  ? "text-red-600"
                  : value < 99
                  ? "text-yellow-600"
                  : "text-green-600"
              }
            >
              {value}%
            </span>
          </div>
          <div className="w-full h-2 bg-gray-100 rounded">
            <div
              className={`h-2 rounded ${
                value < 96
                  ? "bg-red-500"
                  : value < 99
                  ? "bg-yellow-400"
                  : "bg-green-500"
              }`}
              style={{ width: `${value}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  </div>
);

const AddAgentModal = ({ onClose, onAddAgent, agentData, setAgentData }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
    <form
      onSubmit={onAddAgent}
      onClick={(e) => e.stopPropagation()}
      className="bg-white text-black rounded-xl shadow-lg p-8 w-full max-w-sm space-y-6"
    >
      <h3 className="text-xl font-bold mb-2 flex gap-2 items-center">
        <UserPlus /> Add New Agent
      </h3>
      <div>
        <label htmlFor="agent-name" className="block mb-1 font-semibold text-gray-700">
          Name
        </label>
        <input
          id="agent-name"
          type="text"
          required
          value={agentData.name}
          onChange={(e) => setAgentData((a) => ({ ...a, name: e.target.value }))}
          className="w-full border rounded p-2"
        />
      </div>
      <div>
        <label htmlFor="agent-email" className="block mb-1 font-semibold text-gray-700">
          Email
        </label>
        <input
          id="agent-email"
          type="email"
          required
          value={agentData.email}
          onChange={(e) => setAgentData((a) => ({ ...a, email: e.target.value }))}
          className="w-full border rounded p-2"
        />
      </div>
      <div>
        <label htmlFor="agent-status" className="block mb-1 font-semibold text-gray-700">
          Status
        </label>
        <select
          id="agent-status"
          value={agentData.status}
          onChange={(e) => setAgentData((a) => ({ ...a, status: e.target.value }))}
          className="w-full border rounded p-2"
        >
          <option value="Online">Online</option>
          <option value="Busy">Busy</option>
          <option value="Offline">Offline</option>
        </select>
      </div>
      <div className="flex gap-2 justify-end mt-4">
        <button
          type="button"
          className="px-4 py-2 rounded text-gray-700 hover:bg-gray-100 border"
          onClick={onClose}
        >
          Cancel
        </button>
        <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white font-bold">
          Add Agent
        </button>
      </div>
    </form>
  </div>
);
