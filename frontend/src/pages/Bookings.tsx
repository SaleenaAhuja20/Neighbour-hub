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

  bookingDate: string;

  address: string;

  notes?: string;

  status: string;

  provider: {
    id: string;

    serviceTitle: string;

    category: string;

    phone: string;

    address: string;

    user: {
      fullName: string;
    };
  };
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
      }
      catch (err) {
        console.log(err);
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
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors duration-150 ${active
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

          {bookings.length === 0 ? (

            <div className="col-span-3 bg-white rounded-2xl border p-12 text-center">

              <h2 className="text-2xl font-bold text-[#111C34]">
                No bookings yet
              </h2>

              <p className="text-slate-500 mt-2">
                Book a service to see it here.
              </p>

              <button
                onClick={() => navigate("/services")}
                className="mt-6 px-6 py-3 rounded-xl bg-[#2E6F5E] text-white"
              >
                Find Services
              </button>

            </div>

          ) : (

            bookings.map((booking) => (

              <div
                key={booking.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm"
              >

                <div className="flex justify-between">

                  <h2 className="font-bold text-lg text-[#111C34]">
                    {booking.provider.user.fullName}
                  </h2>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold
            ${booking.status === "PENDING"
                        ? "bg-yellow-100 text-yellow-700"
                        : booking.status === "ACCEPTED"
                          ? "bg-green-100 text-green-700"
                          : booking.status === "COMPLETED"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-red-100 text-red-700"
                      }`}
                  >
                    {booking.status}
                  </span>

                </div>

                <p className="mt-2 text-[#2E6F5E] font-semibold">
                  {booking.provider.serviceTitle}
                </p>

                <div className="mt-5 space-y-2 text-sm text-slate-500">

                  <p>
                    <FaCalendarAlt className="inline mr-2" />
                    {new Date(booking.bookingDate).toLocaleDateString()}
                  </p>

                  <p>
                    <FaClock className="inline mr-2" />
                    {new Date(booking.bookingDate).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>

                  <p>
                    <FaMapMarkerAlt className="inline mr-2" />
                    {booking.address}
                  </p>

                </div>

                {booking.notes && (
                  <div className="mt-4 text-sm text-slate-600">
                    <strong>Notes:</strong> {booking.notes}
                  </div>
                )}

                <div className="mt-5 border-t pt-4">

                  <button
                    onClick={() => navigate(`/bookings/${booking.id}`)}
                    className="w-full py-2 rounded-xl bg-[#2E6F5E] text-white font-semibold"
                  >
                    View Details
                  </button>

                </div>

              </div>

            ))

          )}

        </div>
      </main>
    </div>
  );
}
