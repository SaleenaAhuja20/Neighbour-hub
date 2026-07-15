import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services/api";

import {
  FaHome,
  FaClipboardList,
  FaComments,
  FaUserCircle,
  FaCog,
  FaWallet,
  FaStar,
  FaCalendarCheck,
  FaTools,
  FaPlus,
  FaSignOutAlt,
  FaShieldAlt,
  FaCrown,
  FaCheckCircle,
} from "react-icons/fa";

export default function ProviderDashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [dashboard, setDashboard] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const { data } = await api.get("/provider/dashboard");

        setDashboard(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  const navItems = [
    {
      label: "Dashboard",
      icon: FaHome,
      path: "/provider-dashboard",
      active: true,
    },
    {
      label: "My Services",
      icon: FaTools,
      path: "/provider/services",
    },
    {
      label: "Add Service",
      icon: FaPlus,
      path: "/provider/add-service",
    },
    {
      label: "Bookings",
      icon: FaClipboardList,
      path: "/provider/bookings",
    },
    {
      label: "Profile",
      icon: FaUserCircle,
      path: "/provider/profile",
    },
  ];

  const stats = dashboard
    ? [
      {
        title: "Total Bookings",
        value: dashboard.totalBookings,
        icon: FaCalendarCheck,
        color: "bg-blue-100 text-blue-600",
      },
      {
        title: "Active Services",
        value: dashboard.activeServices,
        icon: FaTools,
        color: "bg-green-100 text-green-600",
      },
      {
        title: "Completed",
        value: dashboard.completedBookings,
        icon: FaCheckCircle,
        color: "bg-yellow-100 text-yellow-600",
      },
      {
        title: "Pending",
        value: dashboard.pendingBookings,
        icon: FaClipboardList,
        color: "bg-pink-100 text-pink-600",
      },
    ]
    : [];

  const quickActions = [
    {
      title: "Add Service",
      icon: FaPlus,
      path: "/provider/add-service",
    },
    {
      title: "Manage Services",
      icon: FaTools,
      path: "/provider/services",
    },
    {
      title: "Bookings",
      icon: FaClipboardList,
      path: "/provider/bookings",
    },
    {
      title: "Messages",
      icon: FaComments,
      path: "/provider/messages",
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-2xl font-bold">
          Loading Dashboard...
        </h2>
      </div>
    );
  }
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

                <p className="text-[#8FE3C7] text-xs font-bold">
                  PROVIDER
                </p>

                <h1 className="text-xl font-black">
                  NeighbourHub
                </h1>

              </div>

            </div>

            <p className="text-xs text-slate-400 mt-3">
              Service Provider Portal
            </p>

          </div>

          <nav className="mt-5 px-3 space-y-1">

            {navItems.map(({ label, icon: Icon, path, active }) => (

              <button
                key={label}
                onClick={() => navigate(path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition ${active
                    ? "bg-white/10 text-white"
                    : "text-slate-300 hover:bg-white/5"
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

            <div className="flex gap-2 text-[#8FE3C7] text-xs">

              <FaShieldAlt />

              Verified Provider

            </div>

          </div>

          <button
            onClick={logout}
            className="w-full py-3 rounded-xl bg-[#1B2948]"
          >

            <FaSignOutAlt className="inline mr-2" />

            Logout

          </button>

        </div>

      </aside>

      {/* MAIN */}

      <main className="flex-1 ml-[270px] p-8">

        <div className="flex justify-between items-center">

          <div>

            <p className="text-xs uppercase tracking-widest font-bold text-[#2E6F5E]">
              Provider Dashboard
            </p>

            <h1 className="text-4xl font-black text-[#111C34] mt-2">

              Welcome Back,
              <span className="text-[#2E6F5E]">
                {" "}
                {user.fullName || "Provider"}
              </span>

            </h1>

            <p className="text-slate-500 mt-3">
              Manage your services, bookings and earnings.
            </p>

          </div>

          <button
            onClick={() => navigate("/provider/add-service")}
            className="bg-[#111C34] hover:bg-[#1d2b4f] text-white px-6 py-3 rounded-xl"
          >

            <FaPlus className="inline mr-2" />

            Add Service

          </button>

        </div>

        {/* HERO */}

        <div className="mt-8 bg-[#111C34] rounded-3xl p-10 relative overflow-hidden">

          <div className="absolute right-0 top-0 w-72 h-72 bg-[#2E6F5E]/20 rounded-full blur-3xl"></div>

          <div className="relative">

            <p className="text-[#8FE3C7] uppercase tracking-widest text-xs font-bold">

              Professional Dashboard

            </p>

            <h2 className="text-4xl font-black text-white mt-4">

              Ready to grow your business?

            </h2>

            <p className="text-slate-300 mt-5 max-w-2xl leading-7">

              Accept bookings, manage services, receive reviews and
              increase your monthly earnings using NeighbourHub.

            </p>

            <div className="flex gap-4 mt-8">

              <button
                onClick={() => navigate("/provider/bookings")}
                className="bg-[#2E6F5E] px-6 py-3 rounded-xl text-white"
              >
                View Bookings
              </button>

              <button
                onClick={() => navigate("/provider/services")}
                className="border border-white/20 px-6 py-3 rounded-xl text-white"
              >
                My Services
              </button>

            </div>

          </div>

        </div>

        {/* STATS */}

        <div className="grid grid-cols-4 gap-6 mt-8">

          {stats.map((item) => {

            const Icon = item.icon;

            return (

              <div
                key={item.title}
                className="bg-white rounded-3xl border shadow-sm p-6"
              >

                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center ${item.color}`}
                >

                  <Icon className="text-2xl" />

                </div>

                <p className="text-slate-400 mt-5 text-sm">

                  {item.title}

                </p>

                <h2 className="text-3xl font-black text-[#111C34] mt-2">

                  {item.value}

                </h2>

              </div>

            );

          })}

        </div>

        {/* QUICK ACTIONS */}

        <div className="mt-10">

          <h2 className="text-2xl font-black text-[#111C34] mb-6">

            Quick Actions

          </h2>

          <div className="grid grid-cols-4 gap-6">

            {quickActions.map((action) => {

              const Icon = action.icon;

              return (

                <button
                  key={action.title}
                  onClick={() => navigate(action.path)}
                  className="bg-white rounded-3xl border p-6 hover:shadow-lg transition text-left"
                >

                  <div className="w-14 h-14 rounded-2xl bg-[#2E6F5E]/10 flex items-center justify-center">

                    <Icon className="text-2xl text-[#2E6F5E]" />

                  </div>

                  <h3 className="mt-5 text-lg font-bold">

                    {action.title}

                  </h3>

                </button>

              );

            })}

          </div>

        </div>
        {/* BOOKINGS + EARNINGS */}

        <div className="grid grid-cols-3 gap-6 mt-10">

          {/* RECENT BOOKINGS */}

          <div className="col-span-2 bg-white rounded-3xl border shadow-sm p-8">

            <div className="flex justify-between items-center mb-6">

              <h2 className="text-2xl font-black text-[#111C34]">
                Recent Bookings
              </h2>

              <button
                onClick={() => navigate("/provider/bookings")}
                className="text-[#2E6F5E] font-semibold hover:underline"
              >
                View All
              </button>

            </div>

            <div className="space-y-4">

              {dashboard?.recentBookings?.length > 0 ? (

                dashboard.recentBookings.map((booking: any) => (

                  <div
                    key={booking.id}
                    className="flex justify-between items-center border rounded-2xl p-5 hover:bg-slate-50 transition"
                  >

                    <div>

                      <h3 className="font-bold text-[#111C34]">
                        {booking.resident.fullName}
                      </h3>

                      <p className="text-sm text-slate-500">
                        {booking.provider?.serviceTitle || "Service"}
                      </p>

                    </div>

                    <div>

                      <p className="font-semibold text-slate-600">
                        {new Date(booking.bookingDate).toLocaleDateString()}
                      </p>

                      <p className="text-xs text-slate-400">
                        {booking.bookingTime}
                      </p>

                    </div>

                    <span
                      className={`px-4 py-2 rounded-full text-sm font-semibold

          ${booking.status === "COMPLETED"
                          ? "bg-green-100 text-green-700"
                          : booking.status === "ACCEPTED"
                            ? "bg-blue-100 text-blue-700"
                            : booking.status === "PENDING"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                        }

          `}
                    >
                      {booking.status}
                    </span>

                  </div>

                ))

              ) : (

                <div className="text-center py-8 text-slate-500">
                  No bookings yet.
                </div>

              )}

            </div>

            {/* EARNINGS */}

            <div className="bg-white rounded-3xl border shadow-sm p-8">

              <h2 className="text-2xl font-black text-[#111C34]">

                Earnings

              </h2>

              <h1 className="text-5xl font-black text-[#2E6F5E] mt-8">

                Rs. {dashboard?.earnings ?? 0}

              </h1>

              <p className="text-slate-500 mt-2">

                This Month

              </p>

              <div className="mt-10 space-y-5">

                <div className="flex justify-between">

                  <span>Total Jobs</span>

                  <strong>{dashboard?.totalBookings}</strong>

                </div>

                <div className="flex justify-between">

                  <span>Completed</span>

                  <strong>{dashboard?.completedBookings}</strong>

                </div>

                <div className="flex justify-between">

                  <span>Pending</span>

                  <strong>{dashboard?.pendingBookings}</strong>

                </div>

                <div className="flex justify-between">

                  <span>Cancelled</span>

                  <strong>{dashboard?.cancelledBookings}</strong>

                </div>

              </div>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}