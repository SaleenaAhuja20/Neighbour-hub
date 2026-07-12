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
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";

export default function ModeratorDashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const navItems = [
    { label: "Dashboard", icon: FaHome, path: "/moderator-dashboard", active: true },
    { label: "Disputes", icon: FaExclamationTriangle, path: "/moderator/disputes" },
    { label: "Flagged Content", icon: FaFlag, path: "/moderator/flagged-content" },
    { label: "Conversations", icon: FaComments, path: "/moderator/conversations" },
    { label: "Profile", icon: FaUserCircle, path: "/moderator/profile" },
    { label: "Settings", icon: FaCog, path: "/moderator/settings" },
  ];

  const stats = [
    { title: "Open Disputes", value: "07", icon: FaExclamationTriangle, color: "bg-red-100 text-red-600" },
    { title: "Flagged Providers", value: "03", icon: FaFlag, color: "bg-yellow-100 text-yellow-600" },
    { title: "Resolved This Month", value: "24", icon: FaCheckCircle, color: "bg-green-100 text-green-600" },
    { title: "Avg. Resolution Time", value: "1.8d", icon: FaClock, color: "bg-blue-100 text-blue-600" },
  ];

  const recentDisputes = [
    { id: "#D001", customer: "Ali Khan", provider: "Ahmed Services", issue: "Service not completed", priority: "High", status: "Raised" },
    { id: "#D002", customer: "Sara Ahmed", provider: "Clean Pro", issue: "Payment issue", priority: "Medium", status: "Evidence Submitted" },
    { id: "#D003", customer: "Usman Ali", provider: "Green Care", issue: "Wrong service provided", priority: "High", status: "Moderator Assigned" },
  ];

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
            <p className="text-slate-400 text-xs mt-1">
              Dispute & content moderation enabled.
            </p>
          </div>

          <button onClick={logout} className="w-full py-3 rounded-xl bg-[#1B2948]">
            <FaSignOutAlt className="inline mr-2" />
            Logout
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 ml-[270px] p-8">
        <div>
          <p className="text-xs uppercase tracking-widest font-bold text-[#2E6F5E]">
            Moderator Dashboard
          </p>
          <h1 className="text-4xl font-black text-[#111C34] mt-2">
            Welcome Back,
            <span className="text-[#2E6F5E]"> {user.fullName || "Moderator"}</span>
          </h1>
          <p className="text-slate-500 mt-3">
            Review disputes, moderate flagged content, and keep the community safe.
          </p>
        </div>

        {/* HERO */}
        <div className="mt-8 bg-[#111C34] rounded-3xl p-10 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-72 h-72 bg-[#2E6F5E]/20 rounded-full blur-3xl"></div>
          <div className="relative">
            <p className="text-[#8FE3C7] uppercase tracking-widest text-xs font-bold">
              Trust & Safety
            </p>
            <h2 className="text-4xl font-black text-white mt-4">
              7 disputes need your attention
            </h2>
            <p className="text-slate-300 mt-5 max-w-2xl leading-7">
              Review evidence, use the AI Mediator Assistant for a starting
              recommendation, and make the final call on each case.
            </p>
            <div className="flex gap-4 mt-8">
              <button
                onClick={() => navigate("/moderator/disputes")}
                className="bg-[#2E6F5E] px-6 py-3 rounded-xl text-white"
              >
                View Disputes
              </button>
              <button
                onClick={() => navigate("/moderator/flagged-content")}
                className="border border-white/20 px-6 py-3 rounded-xl text-white"
              >
                Flagged Content
              </button>
            </div>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-4 gap-6 mt-8">
          {stats.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="bg-white rounded-3xl border shadow-sm p-6">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${item.color}`}>
                  <Icon className="text-2xl" />
                </div>
                <p className="text-slate-400 mt-5 text-sm">{item.title}</p>
                <h2 className="text-3xl font-black text-[#111C34] mt-2">{item.value}</h2>
              </div>
            );
          })}
        </div>

        {/* RECENT DISPUTES */}
        <div className="bg-white rounded-3xl border shadow-sm p-8 mt-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-black text-[#111C34]">Recent Disputes</h2>
            <button
              onClick={() => navigate("/moderator/disputes")}
              className="text-[#2E6F5E] font-semibold hover:underline"
            >
              View All
            </button>
          </div>

          <div className="space-y-4">
            {recentDisputes.map((d) => (
              <div
                key={d.id}
                onClick={() => navigate(`/moderator/disputes/${d.id.replace("#", "")}`)}
                className="flex justify-between items-center border rounded-2xl p-5 hover:bg-slate-50 transition cursor-pointer"
              >
                <div>
                  <h3 className="font-bold text-[#111C34]">{d.id} — {d.customer} vs {d.provider}</h3>
                  <p className="text-sm text-slate-500">{d.issue}</p>
                </div>
                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold ${
                    d.priority === "High" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {d.priority}
                </span>
                <span className="px-4 py-2 rounded-full text-sm font-semibold bg-blue-100 text-blue-700">
                  {d.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}