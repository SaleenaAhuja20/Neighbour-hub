import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

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
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";

type Booking = {
  id: string;
  provider: string;
  service: string;
  date: string;
  time: string;
  location: string;
  status: string;
  price: string;
};

export default function Bookings() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [bookings, setBookings] = useState<Booking[]>([]);

  const navItems = [
    { label: "Dashboard", icon: FaHome, path: "/dashboard" },
    { label: "Find Services", icon: FaSearch, path: "/services" },
    {
      label: "My Bookings",
      icon: FaClipboardList,
      path: "/bookings",
      active: true,
    },
    { label: "Messages", icon: FaComments, path: "/messages" },
    { label: "Notifications", icon: FaBell, path: "/notifications" },
    { label: "Profile", icon: FaUserCircle, path: "/profile" },
  ];

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
  };

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await api.get("/booking/my", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setBookings(response.data || []);
      } catch {
        // demo data

        setBookings([
          {
            id: "1",
            provider: "Bilal Ahmed",
            service: "Plumbing Service",
            date: "12 July 2026",
            time: "4:00 PM",
            location: "DHA Phase 6 Karachi",
            status: "Confirmed",
            price: "Rs. 800",
          },

          {
            id: "2",
            provider: "Sana Malik",
            service: "Home Cleaning",
            date: "15 July 2026",
            time: "11:00 AM",
            location: "Clifton Karachi",
            status: "Pending",
            price: "Rs. 1500",
          },
        ]);
      }
    };

    fetchBookings();
  }, []);

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
        <p className="text-xs uppercase tracking-widest text-[#2E6F5E]">
          My Bookings
        </p>

        <h1 className="text-4xl font-extrabold text-[#111C34] mt-2">
          Your Service Requests
        </h1>

        <p className="text-slate-500 mt-3">
          Manage your upcoming and previous bookings.
        </p>

        <div className="mt-8 grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm"
            >
              <div className="flex justify-between">
                <h2 className="font-bold text-lg text-[#111C34]">
                  {booking.provider}
                </h2>

                <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
                  {booking.status}
                </span>
              </div>

              <p className="mt-2 text-[#2E6F5E] font-semibold">
                {booking.service}
              </p>

              <div className="mt-5 space-y-2 text-sm text-slate-500">
                <p>
                  <FaCalendarAlt className="inline mr-2" />
                  {booking.date}
                </p>

                <p>
                  <FaClock className="inline mr-2" />
                  {booking.time}
                </p>

                <p>
                  <FaMapMarkerAlt className="inline mr-2" />
                  {booking.location}
                </p>
              </div>

              <div className="mt-5 border-t pt-4 flex justify-between">
                <span className="font-bold">{booking.price}</span>

                <button className="px-4 py-2 bg-[#2E6F5E] text-white rounded-xl text-sm">
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
