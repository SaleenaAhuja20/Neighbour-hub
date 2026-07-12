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
} from "react-icons/fa";

export default function ModeratorConversations() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const navItems = [
    { label: "Dashboard", icon: FaHome, path: "/moderator-dashboard" },
    { label: "Disputes", icon: FaExclamationTriangle, path: "/moderator/disputes" },
    { label: "Flagged Content", icon: FaFlag, path: "/moderator/flagged-content" },
    { label: "Conversations", icon: FaComments, path: "/moderator/conversations", active: true },
    { label: "Profile", icon: FaUserCircle, path: "/moderator/profile" },
    { label: "Settings", icon: FaCog, path: "/moderator/settings" },
  ];

  const conversations = [
    { id: 1, dispute: "#D001", participants: "Ali Khan & Ahmed Services" },
    { id: 2, dispute: "#D003", participants: "Usman Ali & Green Care" },
  ];

  const [selected, setSelected] = useState(conversations[0]);

  const messages = [
    { sender: "Ali Khan", text: "The wiring was left incomplete.", time: "10:02 AM" },
    { sender: "Ahmed Services", text: "I paused work due to unpaid materials cost.", time: "10:15 AM" },
    { sender: "Ali Khan", text: "That was never agreed upon beforehand.", time: "10:20 AM" },
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
          Trust & Safety
        </p>
        <h1 className="text-4xl font-black text-[#111C34] mt-2">Dispute Conversations</h1>
        <p className="text-slate-500 mt-2">
          View chat history linked to active disputes (read-only monitoring).
        </p>

        <div className="grid grid-cols-3 gap-6 mt-8">
          {/* CONVERSATION LIST */}
          <div className="bg-white rounded-3xl shadow p-4 col-span-1">
            {conversations.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelected(c)}
                className={`w-full text-left p-4 rounded-2xl mb-2 transition ${
                  selected.id === c.id ? "bg-[#111C34] text-white" : "hover:bg-slate-50"
                }`}
              >
                <p className="font-bold">{c.dispute}</p>
                <p className={`text-sm ${selected.id === c.id ? "text-slate-300" : "text-slate-500"}`}>
                  {c.participants}
                </p>
              </button>
            ))}
          </div>

          {/* MESSAGE THREAD */}
          <div className="bg-white rounded-3xl shadow p-8 col-span-2">
            <h2 className="font-bold text-xl text-[#111C34] mb-6">
              {selected.dispute} — {selected.participants}
            </h2>

            <div className="space-y-4">
              {messages.map((m, i) => (
                <div key={i} className="bg-slate-50 rounded-2xl p-4">
                  <div className="flex justify-between">
                    <span className="font-bold text-[#111C34]">{m.sender}</span>
                    <span className="text-xs text-slate-400">{m.time}</span>
                  </div>
                  <p className="text-slate-600 mt-2">{m.text}</p>
                </div>
              ))}
            </div>

            <p className="text-xs text-slate-400 mt-6">
              Read-only view — moderators cannot send messages in this thread.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}