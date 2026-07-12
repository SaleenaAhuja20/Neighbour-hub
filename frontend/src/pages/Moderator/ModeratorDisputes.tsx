import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaHome,
  FaExclamationTriangle,
  FaFlag,
  FaComments,
  FaUserCircle,
  FaCog,
  FaSignOutAlt,
  FaShieldAlt,
  FaCrown,
  FaEye,
} from "react-icons/fa";

interface Dispute {
  id: string;
  customer: string;
  provider: string;
  issue: string;
  priority: "High" | "Medium" | "Low";
  status: "Raised" | "Moderator Assigned" | "Evidence Submitted" | "Resolved";
}

export default function ModeratorDisputes() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<string>("All");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const navItems = [
    { label: "Dashboard", icon: FaHome, path: "/moderator-dashboard" },
    { label: "Disputes", icon: FaExclamationTriangle, path: "/moderator/disputes", active: true },
    { label: "Flagged Content", icon: FaFlag, path: "/moderator/flagged-content" },
    { label: "Conversations", icon: FaComments, path: "/moderator/conversations" },
    { label: "Profile", icon: FaUserCircle, path: "/moderator/profile" },
    { label: "Settings", icon: FaCog, path: "/moderator/settings" },
  ];

  const disputes: Dispute[] = [
    { id: "D001", customer: "Ali Khan", provider: "Ahmed Services", issue: "Service not completed", priority: "High", status: "Raised" },
    { id: "D002", customer: "Sara Ahmed", provider: "Clean Pro", issue: "Payment issue", priority: "Medium", status: "Evidence Submitted" },
    { id: "D003", customer: "Usman Ali", provider: "Green Care", issue: "Wrong service provided", priority: "High", status: "Moderator Assigned" },
    { id: "D004", customer: "Fatima", provider: "QuickFix", issue: "Provider no-show", priority: "Low", status: "Resolved" },
  ];

  const statuses = ["All", "Raised", "Moderator Assigned", "Evidence Submitted", "Resolved"];

  const filteredDisputes =
    filter === "All" ? disputes : disputes.filter((d) => d.status === filter);

  const statusColor = (status: string) => {
    switch (status) {
      case "Resolved":
        return "bg-green-100 text-green-700";
      case "Evidence Submitted":
        return "bg-blue-100 text-blue-700";
      case "Moderator Assigned":
        return "bg-purple-100 text-purple-700";
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  return (
    <div className="min-h-screen flex bg-[#F3F4F7]">
      {/* SIDEBAR */}
      <aside className="fixed left-0 top-0 h-screen w-[270px] bg-[#111C34] text-white flex flex-col justify-between z-50">
        <div>
          <div className="px-6 py-7 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#2E6F5E] flex items-center justify-center">
                <FaCrown className="text-[#8FE3C7]" />
              </div>
              <div>
                <p className="text-[#8FE3C7] text-xs font-bold">MODERATOR</p>
                <h1 className="text-xl font-black">NeighbourHub</h1>
              </div>
            </div>
            <p className="text-xs text-slate-400 mt-3">Trust & Safety Panel</p>
          </div>

          <nav className="mt-5 px-3 space-y-1">
            {navItems.map(({ label, icon: Icon, path, active }) => (
              <button
                key={label}
                onClick={() => navigate(path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition ${
                  active ? "bg-white/10 text-white" : "text-slate-300 hover:bg-white/5"
                }`}
              >
                <Icon />
                {label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-4">
          <div className="bg-[#1B2948] rounded-xl p-4 mb-3">
            <div className="flex gap-2 text-[#8FE3C7] text-xs font-bold">
              <FaShieldAlt />
              MODERATOR ACCESS
            </div>
          </div>

          <button onClick={logout} className="w-full py-3 rounded-xl bg-[#1B2948]">
            <FaSignOutAlt className="inline mr-2" />
            Logout
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 ml-[270px] p-8">
        <p className="uppercase tracking-widest text-xs text-[#2E6F5E] font-bold">
          Dispute Management
        </p>
        <h1 className="text-4xl font-black text-[#111C34] mt-2">Manage Disputes</h1>
        <p className="text-slate-500 mt-2">
          Review and resolve customer and provider complaints.
        </p>

        {/* STATS */}
        <div className="grid grid-cols-3 gap-6 mt-8">
          <div className="bg-white rounded-3xl shadow p-6">
            <p className="text-slate-500">Total Disputes</p>
            <h2 className="text-4xl font-black mt-2 text-[#111C34]">{disputes.length}</h2>
          </div>
          <div className="bg-white rounded-3xl shadow p-6">
            <p className="text-slate-500">Pending</p>
            <h2 className="text-4xl font-black mt-2 text-red-600">
              {disputes.filter((d) => d.status !== "Resolved").length}
            </h2>
          </div>
          <div className="bg-white rounded-3xl shadow p-6">
            <p className="text-slate-500">Resolved</p>
            <h2 className="text-4xl font-black mt-2 text-[#2E6F5E]">
              {disputes.filter((d) => d.status === "Resolved").length}
            </h2>
          </div>
        </div>

        {/* FILTER */}
        <div className="flex gap-3 mt-8">
          {statuses.map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-5 py-2 rounded-xl text-sm font-semibold transition ${
                filter === s
                  ? "bg-[#111C34] text-white"
                  : "bg-white border text-slate-600 hover:bg-slate-50"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-3xl shadow mt-6 p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-bold text-2xl text-[#111C34]">Dispute Requests</h2>
            <span className="text-sm text-slate-500">{filteredDisputes.length} Results</span>
          </div>

          <table className="w-full">
            <thead>
              <tr className="text-slate-500 text-left border-b">
                <th className="py-4">ID</th>
                <th>Customer</th>
                <th>Provider</th>
                <th>Issue</th>
                <th>Priority</th>
                <th>Status</th>
                <th className="text-right">Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredDisputes.map((d) => (
                <tr key={d.id} className="border-b last:border-none hover:bg-slate-50 transition">
                  <td className="py-5 font-semibold">#{d.id}</td>
                  <td>{d.customer}</td>
                  <td>{d.provider}</td>
                  <td className="text-slate-600">{d.issue}</td>
                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        d.priority === "High"
                          ? "bg-red-100 text-red-700"
                          : d.priority === "Medium"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {d.priority}
                    </span>
                  </td>
                  <td>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor(d.status)}`}>
                      {d.status}
                    </span>
                  </td>
                  <td className="text-right">
                    <button
                      onClick={() => navigate(`/moderator/disputes/${d.id}`)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FaEye className="inline mr-1" />
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}