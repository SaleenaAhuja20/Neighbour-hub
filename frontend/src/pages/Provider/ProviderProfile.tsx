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
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function ProviderProfile() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const navItems = [
    { label: "Dashboard", icon: FaHome, path: "/provider-dashboard" },
    { label: "My Services", icon: FaTools, path: "/provider/services" },
    { label: "Add Service", icon: FaPlus, path: "/provider/add-service" },
    { label: "Bookings", icon: FaClipboardList, path: "/provider/bookings" },
    { label: "Messages", icon: FaComments, path: "/provider/messages" },
    { label: "Reviews", icon: FaStar, path: "/provider/reviews" },
    { label: "Earnings", icon: FaWallet, path: "/provider/earnings" },
    { label: "Profile", icon: FaUserCircle, path: "/provider/profile" },
    { label: "Settings", icon: FaCog, path: "/provider/settings" },
  ];

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

            {navItems.map(({ label, icon: Icon, path }) => (

              <button
                key={label}
                onClick={() => navigate(path)}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-white/10 hover:text-white"
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
          My Profile
        </h1>

        <p className="text-slate-500 mt-2">
          Manage your personal information and provider profile.
        </p>

        {/* Profile Card */}

        <div className="bg-[#111C34] rounded-3xl p-8 mt-8 text-white">

          <div className="flex items-center gap-6">

            <div className="w-28 h-28 rounded-full bg-[#2E6F5E] flex items-center justify-center text-5xl font-bold">

              {(user.fullName || "P").charAt(0)}

            </div>

            <div>

              <h2 className="text-3xl font-black">
                {user.fullName || "Provider Name"}
              </h2>

              <p className="text-slate-300 mt-2">
                Verified Service Provider
              </p>

            </div>

          </div>

        </div>

        {/* Details */}

        <div className="grid grid-cols-2 gap-6 mt-8">

          <div className="bg-white rounded-3xl shadow p-6">

            <h2 className="text-xl font-bold mb-6">
              Personal Information
            </h2>

            <div className="space-y-5">

              <div className="flex gap-3">

                <FaEnvelope className="text-[#2E6F5E] mt-1" />

                <div>

                  <p className="text-slate-400">
                    Email
                  </p>

                  <h3 className="font-semibold">
                    {user.email || "provider@gmail.com"}
                  </h3>

                </div>

              </div>

              <div className="flex gap-3">

                <FaPhone className="text-[#2E6F5E] mt-1" />

                <div>

                  <p className="text-slate-400">
                    Phone
                  </p>

                  <h3 className="font-semibold">
                    +92 300 1234567
                  </h3>

                </div>

              </div>

              <div className="flex gap-3">

                <FaMapMarkerAlt className="text-[#2E6F5E] mt-1" />

                <div>

                  <p className="text-slate-400">
                    Address
                  </p>

                  <h3 className="font-semibold">
                    Karachi, Pakistan
                  </h3>

                </div>

              </div>

            </div>

          </div>

          <div className="bg-white rounded-3xl shadow p-6">

            <h2 className="text-xl font-bold">
              Experience
            </h2>

            <p className="mt-4 text-slate-600">
              5+ Years Professional Experience
            </p>

            <h2 className="text-xl font-bold mt-8">
              Skills
            </h2>

            <div className="flex flex-wrap gap-3 mt-4">

              <span className="bg-[#2E6F5E]/10 text-[#2E6F5E] px-4 py-2 rounded-full">
                Electrical
              </span>

              <span className="bg-[#2E6F5E]/10 text-[#2E6F5E] px-4 py-2 rounded-full">
                Plumbing
              </span>

              <span className="bg-[#2E6F5E]/10 text-[#2E6F5E] px-4 py-2 rounded-full">
                Installation
              </span>

            </div>

            <button
              onClick={() => navigate("/provider/edit-profile")}
              className="mt-10 bg-[#111C34] hover:bg-[#1A2B52] text-white px-6 py-3 rounded-xl"
            >

              <FaEdit className="inline mr-2" />

              Edit Profile

            </button>

          </div>

        </div>

      </main>

    </div>
  );
}