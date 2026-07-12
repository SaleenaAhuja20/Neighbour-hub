import { useNavigate } from "react-router-dom";
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
  FaEdit,
  FaTrash,
  FaEye,
} from "react-icons/fa";

export default function MyServices() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const navItems = [
    { label: "Dashboard", icon: FaHome, path: "/provider-dashboard" },
    {
      label: "My Services",
      icon: FaTools,
      path: "/provider/services",
      active: true,
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
      label: "Messages",
      icon: FaComments,
      path: "/provider/messages",
    },
    {
      label: "Reviews",
      icon: FaStar,
      path: "/provider/reviews",
    },
    {
      label: "Earnings",
      icon: FaWallet,
      path: "/provider/earnings",
    },
    {
      label: "Profile",
      icon: FaUserCircle,
      path: "/provider/profile",
    },
    {
      label: "Settings",
      icon: FaCog,
      path: "/provider/settings",
    },
  ];

  const services = [
    {
      id: 1,
      title: "Electrician",
      price: "Rs.2500",
      status: "Active",
      bookings: 18,
      rating: 4.9,
    },
    {
      id: 2,
      title: "Plumber",
      price: "Rs.1800",
      status: "Active",
      bookings: 11,
      rating: 4.8,
    },
    {
      id: 3,
      title: "AC Repair",
      price: "Rs.3500",
      status: "Inactive",
      bookings: 5,
      rating: 4.7,
    },
    {
      id: 4,
      title: "Home Cleaning",
      price: "Rs.4000",
      status: "Active",
      bookings: 23,
      rating: 5.0,
    },
  ];

  return (
    <div className="min-h-screen flex bg-[#F3F4F7]">

      {/* SIDEBAR */}

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
                    : "hover:bg-white/5 text-slate-300"
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

            <p className="uppercase tracking-widest text-xs text-[#2E6F5E] font-bold">
              Provider Services
            </p>

            <h1 className="text-4xl font-black text-[#111C34] mt-2">
              My Services
            </h1>

            <p className="text-slate-500 mt-3">
              Manage all your listed services.
            </p>

          </div>

          <button
            onClick={() => navigate("/provider/add-service")}
            className="bg-[#111C34] text-white px-6 py-3 rounded-xl"
          >

            <FaPlus className="inline mr-2" />

            Add Service

          </button>

        </div>

        {/* SERVICES */}

        <div className="grid grid-cols-2 gap-6 mt-10">

          {services.map((service) => (

            <div
              key={service.id}
              className="bg-white rounded-3xl border shadow-sm p-7"
            >

              <div className="flex justify-between">

                <h2 className="text-2xl font-black text-[#111C34]">
                  {service.title}
                </h2>

                <span
                  className={`px-4 py-2 rounded-full text-sm ${
                    service.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {service.status}
                </span>

              </div>

              <p className="text-3xl font-black text-[#2E6F5E] mt-6">
                {service.price}
              </p>

              <div className="flex justify-between mt-8">

                <div>

                  <p className="text-slate-400 text-sm">
                    Bookings
                  </p>

                  <h3 className="text-xl font-bold">
                    {service.bookings}
                  </h3>

                </div>

                <div>

                  <p className="text-slate-400 text-sm">
                    Rating
                  </p>

                  <h3 className="text-xl font-bold">
                    ⭐ {service.rating}
                  </h3>

                </div>

              </div>

              <div className="flex gap-3 mt-8">

                <button className="flex-1 bg-[#111C34] text-white py-3 rounded-xl">

                  <FaEye className="inline mr-2" />

                  View

                </button>

                <button className="flex-1 bg-[#2E6F5E] text-white py-3 rounded-xl">

                  <FaEdit className="inline mr-2" />

                  Edit

                </button>

                <button className="w-14 bg-red-500 text-white rounded-xl">

                  <FaTrash className="mx-auto" />

                </button>

              </div>

            </div>

          ))}

        </div>

      </main>

    </div>
  );
}