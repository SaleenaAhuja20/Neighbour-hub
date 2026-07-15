import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services/api";
import {
  FaHome,
  FaTools,
  FaPlus,
  FaClipboardList,
  FaComments,
  FaStar,
  FaWallet,
  FaUserCircle,
  FaCog,
  FaSignOutAlt,
  FaShieldAlt,
  FaCrown,
  FaCheck,
  FaTimes,
} from "react-icons/fa";

export default function ProviderBookings() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  useEffect(() => {
  const fetchBookings = async () => {
    try {
      const { data } = await api.get("/provider/bookings");
      setBookings(data);
    } catch (err) {
      console.log(err);
    }
  };

  fetchBookings();
}, []);

  const navItems = [
    { label: "Dashboard", icon: FaHome, path: "/provider-dashboard" },
    { label: "My Services", icon: FaTools, path: "/provider/services" },
    { label: "Add Service", icon: FaPlus, path: "/provider/add-service" },
    {
      label: "Bookings",
      icon: FaClipboardList,
      path: "/provider/bookings",
      active: true,
    },
    { label: "Profile", icon: FaUserCircle, path: "/provider/profile" },
  ];

  const [bookings, setBookings] = useState<any[]>([]);

  const acceptBooking = async (id: string) => {
  try {
    await api.patch(`/provider/booking/${id}/accept`);

    setBookings((prev) =>
      prev.map((booking) =>
        booking.id === id
          ? { ...booking, status: "ACCEPTED" }
          : booking
      )
    );
  } catch (err) {
    console.log(err);
  }
};

const rejectBooking = async (id: string) => {
  try {
    await api.patch(`/provider/booking/${id}/reject`);

    setBookings((prev) =>
      prev.map((booking) =>
        booking.id === id
          ? { ...booking, status: "CANCELLED" }
          : booking
      )
    );
  } catch (err) {
    console.log(err);
  }
};

  return (
    <div className="min-h-screen flex bg-[#F3F4F7]">

      {/* Sidebar */}

      <aside className="fixed left-0 top-0 h-screen w-[270px] bg-[#111C34] text-white flex flex-col justify-between">

        <div>

          <div className="px-6 py-7 border-b border-white/10">

            <div className="flex items-center gap-3">

              <div className="w-10 h-10 rounded-xl bg-[#2E6F5E] flex items-center justify-center">
                <FaCrown className="text-[#8FE3C7]" />
              </div>

              <div>
                <p className="text-xs text-[#8FE3C7] font-bold">
                  PROVIDER
                </p>

                <h1 className="text-xl font-black">
                  NeighbourHub
                </h1>
              </div>

            </div>

            <p className="text-xs text-slate-400 mt-3">
              Service Provider
            </p>

          </div>

          <nav className="mt-5 px-3 space-y-1">

            {navItems.map(({ label, icon: Icon, path, active }) => (

              <button
                key={label}
                onClick={() => navigate(path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl ${
                  active
                    ? "bg-white/10"
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

      {/* Main */}

      <main className="flex-1 ml-[270px] p-8">

        <p className="uppercase tracking-widest text-xs text-[#2E6F5E] font-bold">
          Provider
        </p>

        <h1 className="text-4xl font-black text-[#111C34] mt-2">
          My Bookings
        </h1>

        <p className="text-slate-500 mt-3">
          Manage incoming booking requests.
        </p>

        <div className="bg-white rounded-3xl p-8 shadow-sm mt-8">

          <table className="w-full">

            <thead>

              <tr className="text-left border-b">

                <th className="pb-4">Customer</th>
                <th className="pb-4">Service</th>
                <th className="pb-4">Date</th>
                <th className="pb-4">Status</th>
                <th className="pb-4">Action</th>

              </tr>

            </thead>

          <tbody>
  {bookings.length > 0 ? (
    bookings.map((booking) => (
      <tr key={booking.id} className="border-b">

        <td className="py-5">
          {booking.resident.fullName}
        </td>

        <td>
          {booking.provider?.serviceTitle || "Service"}
        </td>

        <td>
          {new Date(booking.bookingDate).toLocaleDateString()}
        </td>

        <td>
          <span
            className={`px-4 py-2 rounded-full text-sm ${
              booking.status === "PENDING"
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
        </td>

        <td>
          {booking.status === "PENDING" ? (
            <div className="flex gap-2">
              <button
                onClick={() => acceptBooking(booking.id)}
                className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700"
              >
                <FaCheck />
              </button>

              <button
                onClick={() => rejectBooking(booking.id)}
                className="bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-700"
              >
                <FaTimes />
              </button>
            </div>
          ) : (
            <span
              className={`px-4 py-2 rounded-full text-sm font-semibold ${
                booking.status === "ACCEPTED"
                  ? "bg-green-100 text-green-700"
                  : booking.status === "COMPLETED"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {booking.status}
            </span>
          )}
        </td>

      </tr>
    ))
  ) : (
    <tr>
      <td colSpan={5} className="text-center py-8 text-slate-500">
        No bookings found.
      </td>
    </tr>
  )}
</tbody>

          </table>

        </div>

      </main>

    </div>
  );

}