import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import {
  FaHome,
  FaUserCog,
  FaClipboardList,
  FaComments,
  FaBell,
  FaSignOutAlt,
  FaSearch,
  FaUserCircle,
  FaCrown,
  FaShieldAlt,
  FaChevronRight,
} from "react-icons/fa";

import CommunityFeed from "../components/CommunityFeed";
import Notifications from "../components/Notifications";

export default function Dashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [application, setApplication] = useState<any>(null);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await api.get("/provider/my-application", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setApplication(response.data);
      } catch {
        setApplication(null);
      }
    };
    fetchApplication();
  }, []);

  const navItems = [
    { label: "Dashboard", icon: FaHome, path: "/dashboard", active: true },
    { label: "Find Services", icon: FaSearch, path: "/services" },
    { label: "My Bookings", icon: FaClipboardList, path: "/bookings" },
    { label: "Messages", icon: FaComments, path: "/messages" },
    { label: "Notifications", icon: FaBell, path: "/notifications" },
    { label: "Profile", icon: FaUserCircle, path: "/profile" },
  ];

  const quickActions = [
    {
      title: "Find Services",
      desc: "Browse trusted service providers in your neighbourhood.",
      icon: FaSearch,
      path: "/services",
      accent: "bg-teal-50 text-teal-700",
    },
    {
      title: "My Bookings",
      desc: "Track all your current and previous bookings.",
      icon: FaClipboardList,
      path: "/bookings",
      accent: "bg-blue-50 text-blue-700",
    },
    {
      title: "Become Provider",
      desc: "Offer your own services and start earning.",
      icon: FaUserCog,
      path: "/become-provider",
      accent: "bg-white/15 text-white",
      dark: true,
    },
    {
      title: "Community",
      desc: "Connect with your neighbours and stay updated.",
      icon: FaComments,
      path: "/community",
      accent: "bg-rose-50 text-rose-700",
    },
  ];

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

      {/* ================= MAIN ================= */}
      <main className="flex-1 ml-[272px] px-10 py-9 max-w-[1440px] w-full">
        {/* ================= TOP BAR ================= */}
        <div className="flex items-start justify-between gap-6 flex-wrap">
          <div>
            <p className="text-xs font-semibold text-[#2E6F5E] uppercase tracking-widest">
              Resident Dashboard
            </p>
            <h1 className="text-4xl font-extrabold text-[#111C34] mt-2 leading-tight">
              Welcome back, <span className="text-[#2E6F5E]">{user.fullName || "Resident"}</span>{" "}
              <span>👋</span>
            </h1>
            <p className="mt-3 text-slate-500 text-base max-w-xl">
              Manage your bookings, discover trusted providers and stay connected with your community.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <input
                placeholder="Search services..."
                className="w-[270px] rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 shadow-sm outline-none focus:border-[#2E6F5E] focus:ring-2 focus:ring-[#2E6F5E]/15 transition-all text-sm"
              />
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
            </div>

            <button className="w-11 h-11 rounded-xl bg-white shadow-sm border border-slate-200 flex items-center justify-center text-slate-500 hover:text-[#2E6F5E] hover:border-[#2E6F5E]/40 transition-colors">
              <FaBell />
            </button>

            <div className="flex items-center gap-3 rounded-xl bg-white px-3 py-2 shadow-sm border border-slate-200">
              <img
                src={`https://ui-avatars.com/api/?name=${user.fullName}&background=111C34&color=8FE3C7`}
                className="w-10 h-10 rounded-full"
                alt="avatar"
              />
              <div className="pr-1">
                <h4 className="font-semibold text-slate-800 text-sm leading-tight">
                  {user.fullName}
                </h4>
                <p className="text-xs text-slate-500">Resident</p>
              </div>
            </div>
          </div>
        </div>

        {/* ================= HERO ================= */}
        <div className="mt-8 rounded-2xl bg-[#111C34] relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#2E6F5E]/25 blur-3xl" />
          <div className="relative grid md:grid-cols-[1.6fr_1fr] gap-8 p-10">
            <div>
              <p className="text-xs font-semibold text-[#8FE3C7] uppercase tracking-widest">
                Good to see you again
              </p>
              <h2 className="mt-3 text-4xl font-extrabold text-white leading-tight">
                Hello, {user.fullName} 👋
              </h2>
              <p className="mt-5 max-w-xl text-[15px] leading-7 text-slate-300">
                Find trusted service providers, book services, communicate with your
                neighbours and become a verified provider — all from one platform.
              </p>

              <div className="flex flex-wrap gap-3 mt-8">
                <button
                  onClick={() => navigate("/services")}
                  className="px-6 py-3 rounded-xl bg-[#2E6F5E] text-white font-semibold text-sm hover:bg-[#357d6a] transition-colors shadow-md shadow-[#2E6F5E]/25"
                >
                  Find Services
                </button>

                {!application && (
                  <button
                    onClick={() => navigate("/become-provider")}
                    className="px-6 py-3 rounded-xl border border-white/25 text-white font-semibold text-sm hover:bg-white/10 transition-colors"
                  >
                    Become Provider
                  </button>
                )}

                {application?.status === "PENDING" && (
                  <button
                    disabled
                    className="px-6 py-3 rounded-xl border border-white/15 text-slate-400 font-semibold text-sm cursor-not-allowed"
                  >
                    Application Pending
                  </button>
                )}

                {application?.status === "APPROVED" && (
                  <button
                    onClick={() => navigate("/provider-dashboard")}
                    className="px-6 py-3 rounded-xl border border-white/25 text-white font-semibold text-sm hover:bg-white/10 transition-colors"
                  >
                    Provider Dashboard
                  </button>
                )}

                {application?.status === "REJECTED" && (
                  <button
                    onClick={() => navigate("/become-provider")}
                    className="px-6 py-3 rounded-xl border border-white/25 text-white font-semibold text-sm hover:bg-white/10 transition-colors"
                  >
                    Apply Again
                  </button>
                )}
              </div>
            </div>

            <div className="hidden md:flex items-center justify-center">
              <div className="w-36 h-36 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                <FaHome className="text-5xl text-[#8FE3C7]" />
              </div>
            </div>
          </div>
        </div>

        {/* ================= QUICK ACTIONS ================= */}
        <div className="mt-10">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-[#111C34]">Quick Actions</h2>
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-widest">
              Everything in one place
            </p>
          </div>

          <div className="grid grid-cols-2 xl:grid-cols-4 gap-5">
            {quickActions.map(({ title, desc, icon: Icon, path, accent, dark }) => (
              <div
                key={title}
                onClick={() => navigate(path)}
                className={`group cursor-pointer flex flex-col rounded-2xl p-6 border transition-all duration-200 hover:-translate-y-1 hover:shadow-lg h-full ${
                  dark
                    ? "bg-[#111C34] border-[#111C34] text-white"
                    : "bg-white border-slate-200 text-[#111C34]"
                }`}
              >
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-lg ${accent}`}>
                  <Icon />
                </div>
                <h3 className="mt-4 font-semibold text-[15px] flex items-center justify-between">
                  {title}
                  <FaChevronRight className="text-xs opacity-0 group-hover:opacity-60 transition-opacity" />
                </h3>
                <p className={`mt-2 text-[13px] leading-5 ${dark ? "text-slate-300" : "text-slate-500"}`}>
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ================= MAIN GRID ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10">
          {/* BOOKINGS */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-[#111C34]">Recent Bookings</h2>
              <button className="text-[#2E6F5E] font-semibold text-sm hover:underline">
                View All
              </button>
            </div>

            <div className="flex flex-col items-center text-center py-14 px-6 rounded-xl bg-[#F3F4F7]">
              <div className="text-5xl mb-4">📅</div>
              <h3 className="font-semibold text-[#111C34] text-base">No bookings yet</h3>
              <p className="text-slate-500 text-sm mt-2 max-w-sm">
                Book a trusted local provider and your bookings will appear here.
              </p>
              <button
                onClick={() => navigate("/services")}
                className="mt-6 px-6 py-3 rounded-xl bg-[#111C34] text-white text-sm font-semibold hover:bg-[#1a2b52] transition-colors"
              >
                Explore Services
              </button>
            </div>
          </div>

          {/* PROFILE */}
          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
            <div className="flex flex-col items-center text-center">
              <img
                src={`https://ui-avatars.com/api/?name=${user.fullName}&background=111C34&color=8FE3C7`}
                className="w-24 h-24 rounded-full"
                alt="profile"
              />
              <h2 className="mt-4 text-lg font-bold text-[#111C34]">{user.fullName}</h2>
              <p className="text-slate-500 text-sm">{user.email}</p>
              <div className="mt-3 px-3 py-1 rounded-full bg-[#2E6F5E]/10 text-[#2E6F5E] text-xs font-semibold uppercase tracking-wide">
                Resident
              </div>
            </div>

            <div className="h-px bg-slate-100 my-6" />

            <div className="space-y-4 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Account Status</span>
                <span className="text-emerald-600 font-semibold">Verified</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Role</span>
                <span className="text-[#111C34] font-medium">Resident</span>
              </div>
              <div className="flex justify-between items-center gap-4">
                <span className="text-slate-500 shrink-0">Email</span>
                <span className="text-[#111C34] font-medium truncate">{user.email}</span>
              </div>
            </div>

            <button
              onClick={() => navigate("/profile")}
              className="w-full mt-7 py-3 rounded-xl border border-slate-200 text-[#111C34] text-sm font-semibold hover:bg-slate-50 transition-colors"
            >
              Edit Profile
            </button>
          </div>
        </div>

        {/* ================= COMMUNITY ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8 pb-4">
          <CommunityFeed />
          <Notifications />
        </div>
      </main>
    </div>
  );
}