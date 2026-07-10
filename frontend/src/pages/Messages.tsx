import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaHome,
  FaSearch,
  FaClipboardList,
  FaComments,
  FaBell,
  FaUserCircle,
  FaSignOutAlt,
  FaCrown,
  FaShieldAlt,
  FaPaperPlane,
} from "react-icons/fa";

type Message = {
  id: number;
  name: string;
  last: string;
  time: string;
  online: boolean;
};

export default function Messages() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [activeChat, setActiveChat] = useState(0);
  const [message, setMessage] = useState("");

  const navItems = [
    { label: "Dashboard", icon: FaHome, path: "/dashboard" },
    { label: "Find Services", icon: FaSearch, path: "/services" },
    { label: "My Bookings", icon: FaClipboardList, path: "/bookings" },
    { label: "Messages", icon: FaComments, path: "/messages", active: true },
    { label: "Notifications", icon: FaBell, path: "/notifications" },
    { label: "Profile", icon: FaUserCircle, path: "/profile" },
  ];

  const chats: Message[] = [
    {
      id: 1,
      name: "Bilal Ahmed",
      last: "Your plumber booking is confirmed",
      time: "10:32 AM",
      online: true,
    },

    {
      id: 2,
      name: "Sana Malik",
      last: "Cleaning service completed",
      time: "Yesterday",
      online: false,
    },

    {
      id: 3,
      name: "Usman Tariq",
      last: "I will reach at 4 PM",
      time: "Monday",
      online: true,
    },
  ];

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
  };

  return (
    <div className="min-h-screen flex bg-[#F3F4F7]">
     {/* ================= SIDEBAR ================= */}
      <aside className="fixed left-0 top-0 h-screen w-[272px] bg-[#111C34] text-white flex flex-col justify-between z-50">
        <div>
          <div className="px-7 py-8 border-b border-white/10">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-8 h-8 rounded-lg bg-[#2E6F5E] flex items-center justify-center">
                <FaCrown className="text-[#8FE3C7] text-sm" />
              </span>
              <span className="text-[11px] font-semibold text-[#8FE3C7] uppercase tracking-widest">
                Premium
              </span>
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight">NeighbourHub</h1>
            <p className="text-slate-400 text-sm mt-1">Resident Portal</p>
          </div>

          <nav className="mt-6 space-y-1 px-3">
            {navItems.map(({ label, icon: Icon, path, active }) => (
              <button
                key={label}
                onClick={() => navigate(path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors duration-150 ${
                  active
                    ? "bg-white/10 text-white"
                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon className={`text-[15px] ${active ? "text-[#8FE3C7]" : "text-slate-400"}`} />
                {label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-4">
          <div className="mb-3 rounded-xl bg-white/5 border border-white/10 p-4">
            <div className="flex items-center gap-2 text-[#8FE3C7] text-xs font-semibold uppercase tracking-wide">
              <FaShieldAlt /> Verified Resident
            </div>
            <p className="text-slate-400 text-xs mt-2 leading-5">
              Your identity is confirmed. Enjoy priority booking across the neighbourhood.
            </p>
          </div>
          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 text-sm font-medium transition-colors"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </aside>

      {/* MAIN */}

      <main className="flex-1 ml-[272px] px-10 py-9 max-w-[1440px] w-full">
        <div>
          <h1 className="text-3xl font-black text-[#111C34]">Messages</h1>

          <p className="text-sm text-slate-500 mt-1">
            Chat with your trusted service providers
          </p>
        </div>

        <div className="mt-6 bg-white rounded-3xl shadow-xl border border-slate-200 flex h-[580px] overflow-hidden">
          {/* LEFT CHAT LIST */}

          <div className="w-[320px] border-r bg-white">
            <div className="p-5 border-b">
              <h2 className="font-bold text-lg text-[#111C34]">Chats</h2>

              <p className="text-xs text-slate-400 mt-1">
                Recent conversations
              </p>
            </div>

            <div className="p-3 space-y-2">
              {chats.map((chat, index) => (
                <div
                  key={chat.id}
                  onClick={() => setActiveChat(index)}
                  className={`p-4 rounded-2xl cursor-pointer transition ${
                    activeChat === index
                      ? "bg-[#111C34] text-white shadow-lg"
                      : "hover:bg-slate-100"
                  }`}
                >
                  <div className="flex gap-3 items-center">
                    <div
                      className={`w-11 h-11 rounded-full flex items-center justify-center font-bold ${
                        activeChat === index
                          ? "bg-[#2E6F5E]"
                          : "bg-[#111C34] text-white"
                      }`}
                    >
                      {chat.name.charAt(0)}
                    </div>

                    <div className="flex-1">
                      <h3 className="font-semibold text-sm">{chat.name}</h3>

                      <p
                        className={`text-xs ${
                          activeChat === index
                            ? "text-slate-300"
                            : "text-slate-500"
                        }`}
                      >
                        {chat.last}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CHAT AREA */}

          <div className="flex-1 flex flex-col bg-[#F8FAFC]">
            <div className="p-5 bg-white border-b flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#2E6F5E] text-white flex items-center justify-center font-bold">
                  {chats[activeChat].name.charAt(0)}
                </div>

                <div>
                  <h2 className="font-bold text-[#111C34]">
                    {chats[activeChat].name}
                  </h2>

                  <div className="flex items-center gap-2 text-xs text-green-600">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Online
                  </div>
                </div>
              </div>

              <button className="text-slate-400">
                <FaBell />
              </button>
            </div>

            <div className="flex-1 p-6 space-y-4">
              <div className="bg-white rounded-2xl px-5 py-3 shadow-sm max-w-sm text-sm">
                Hello, I need information about my booking.
              </div>

              <div className="bg-[#111C34] text-white rounded-2xl px-5 py-3 shadow-md max-w-sm ml-auto text-sm">
                Sure, your service provider will contact you shortly.
              </div>
            </div>

            <div className="p-4 bg-white border-t">
              <div className="flex gap-3">
                <input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write a message..."
                  className="flex-1 bg-slate-100 rounded-xl px-5 py-3 outline-none text-sm"
                />

                <button className="w-12 h-12 rounded-xl bg-[#2E6F5E] text-white flex items-center justify-center shadow-lg">
                  <FaPaperPlane />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
