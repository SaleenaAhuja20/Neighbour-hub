import { useState } from "react";
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
} from "react-icons/fa";

export default function ProviderSettings() {
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

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
                <p className="text-xs text-[#8FE3C7] font-bold">PROVIDER</p>
                <h1 className="text-xl font-black">NeighbourHub</h1>
              </div>
            </div>
            <p className="text-xs text-slate-400 mt-3">Service Provider</p>
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

          <button onClick={logout} className="w-full py-3 rounded-xl bg-[#1B2948]">
            <FaSignOutAlt className="inline mr-2" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 ml-[270px] p-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <p className="uppercase tracking-widest text-xs text-[#2E6F5E] font-bold">
              Provider
            </p>
            <h1 className="text-4xl font-black text-[#111C34] mt-2">Settings</h1>
            <p className="text-slate-500 mt-2">
              Manage your account preferences and security.
            </p>
          </div>
        </div>

        {/* Settings Card */}
        <div className="bg-white rounded-3xl shadow p-8 mt-8 max-w-3xl">
          <div className="mb-8">
            <label className="font-bold">Change Password</label>
            <input
              type="password"
              placeholder="New Password"
              className="w-full border rounded-xl p-3 mt-3 outline-none focus:border-[#2E6F5E]"
            />
          </div>

          <div className="flex justify-between items-center py-5 border-t">
            <h2 className="font-medium">Notifications</h2>
            <input
              type="checkbox"
              checked={notifications}
              onChange={() => setNotifications(!notifications)}
              className="w-5 h-5"
            />
          </div>

          <div className="flex justify-between items-center py-5 border-t">
            <h2 className="font-medium">Dark Mode</h2>
            <input
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
              className="w-5 h-5"
            />
          </div>

          <div className="py-5 border-t">
            <label className="font-bold">Language</label>
            <select className="w-full border rounded-xl p-3 mt-3 outline-none focus:border-[#2E6F5E]">
              <option>English</option>
              <option>Urdu</option>
            </select>
          </div>

          <div className="flex gap-4 mt-8">
            <button className="bg-[#111C34] hover:bg-[#1A2B52] text-white px-8 py-3 rounded-xl transition">
              Save Settings
            </button>
            <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl transition">
              Delete Account
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}