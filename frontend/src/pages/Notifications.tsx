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
  FaCalendarCheck,
  FaStar,
  FaUserCheck,
  FaTools,
} from "react-icons/fa";

export default function Notifications() {
  const navigate = useNavigate();

  const navItems = [
    { label: "Dashboard", icon: FaHome, path: "/dashboard" },
    { label: "Find Services", icon: FaSearch, path: "/services" },
    { label: "My Bookings", icon: FaClipboardList, path: "/bookings" },
    { label: "Messages", icon: FaComments, path: "/messages" },
    {
      label: "Notifications",
      icon: FaBell,
      path: "/notifications",
      active: true,
    },
    { label: "Profile", icon: FaUserCircle, path: "/profile" },
  ];

  const notifications = [
    {
      icon: FaCalendarCheck,
      title: "Booking Confirmed",
      desc: "Your AC Repair booking has been accepted by Ahmed Services.",
      time: "Today • 10:30 AM",
      type: "Booking",
    },

    {
      icon: FaUserCheck,
      title: "Provider Verified",
      desc: "A new verified electrician is available in your area.",
      time: "Today • 09:15 AM",
      type: "Community",
    },

    {
      icon: FaComments,
      title: "New Message",
      desc: "Bilal Ahmed replied to your service request.",
      time: "Yesterday • 06:45 PM",
      type: "Message",
    },

    {
      icon: FaStar,
      title: "Rate Your Experience",
      desc: "Share your feedback for your completed service.",
      time: "Yesterday • 02:20 PM",
      type: "Review",
    },

    {
      icon: FaTools,
      title: "Service Reminder",
      desc: "Your scheduled cleaning service is tomorrow.",
      time: "2 days ago",
      type: "Reminder",
    },
  ];

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
  };

  return (
    <div className="min-h-screen flex bg-[#F4F6FA]">
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
        <div className="flex justify-between items-center">
          <div>
            <p className="text-xs uppercase tracking-widest text-[#2E6F5E] font-bold">
              Activity Center
            </p>

            <h1 className="text-4xl font-black text-[#111C34] mt-2">
              Notifications
            </h1>

            <p className="text-slate-500 mt-2">
              Manage your updates and community alerts.
            </p>
          </div>

          <button className="px-5 py-3 bg-[#111C34] text-white rounded-xl text-sm">
            Mark all as read
          </button>
        </div>

        {/* STATS */}

        <div className="grid grid-cols-3 gap-5 mt-8">
          <div className="bg-white rounded-2xl p-5 shadow-sm border">
            <p className="text-slate-400 text-sm">Unread</p>

            <h2 className="text-3xl font-black text-[#111C34]">4</h2>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border">
            <p className="text-slate-400 text-sm">Bookings</p>

            <h2 className="text-3xl font-black text-[#111C34]">12</h2>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border">
            <p className="text-slate-400 text-sm">Messages</p>

            <h2 className="text-3xl font-black text-[#111C34]">8</h2>
          </div>
        </div>

        {/* NOTIFICATIONS */}

        <div className="mt-8 bg-white rounded-3xl shadow-xl border p-6">
          <h2 className="text-xl font-bold text-[#111C34] mb-5">
            Recent Activity
          </h2>

          <div className="space-y-5">
            {notifications.map((n, index) => (
              <div key={index} className="flex gap-5 items-start group">
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-[#2E6F5E]/10 text-[#2E6F5E] flex items-center justify-center text-xl">
                    <n.icon />
                  </div>

                  {index !== notifications.length - 1 && (
                    <div className="absolute left-7 top-14 h-10 border-l border-dashed border-slate-300"></div>
                  )}
                </div>

                <div className="flex-1 bg-slate-50 hover:bg-white hover:shadow-md transition rounded-2xl p-5 border">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-bold text-[#111C34]">{n.title}</h3>

                      <p className="text-sm text-slate-500 mt-1">{n.desc}</p>
                    </div>

                    <span className="text-xs bg-[#111C34] text-white px-3 py-1 rounded-full h-fit">
                      {n.type}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 mt-3">{n.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
