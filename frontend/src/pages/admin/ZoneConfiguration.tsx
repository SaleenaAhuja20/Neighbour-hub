import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaHome,
  FaUsers,
  FaUserTie,
  FaCheckCircle,
  FaClipboardList,
  FaChartLine,
  FaCog,
  FaShieldAlt,
  FaCrown,
  FaSignOutAlt,
  FaMapMarkedAlt,
  FaPlus,
  FaEdit,
  FaTrash,
  FaUsers as FaHouseholds,
} from "react-icons/fa";

export default function ZoneConfiguration() {
  const navigate = useNavigate();

  const [showAddZone, setShowAddZone] = useState(false);
  const [zoneName, setZoneName] = useState("");
  const [zoneHouseholds, setZoneHouseholds] = useState("");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const navItems = [
    { label: "Dashboard", icon: FaHome, path: "/admin/dashboard" },
    { label: "Users", icon: FaUsers, path: "/admin/users" },
    { label: "Providers", icon: FaUserTie, path: "/admin/providers" },
    { label: "Provider Requests", icon: FaCheckCircle, path: "/admin/provider-requests" },
    { label: "Bookings", icon: FaClipboardList, path: "/admin/bookings" },
    { label: "Zone Configuration", icon: FaMapMarkedAlt, path: "/admin/zone-configuration" },
    { label: "Analytics", icon: FaChartLine, path: "/admin/analytics" },
    { label: "Settings", icon: FaCog, path: "/admin/settings" },
  ];

  const zones = [
    { id: 1, name: "Zone A - Greenway North", households: 420, providers: 38, activeDisputes: 2 },
    { id: 2, name: "Zone B - Greenway East", households: 385, providers: 31, activeDisputes: 0 },
    { id: 3, name: "Zone C - Riverside", households: 510, providers: 45, activeDisputes: 1 },
    { id: 4, name: "Zone D - Hillview", households: 290, providers: 22, activeDisputes: 3 },
    { id: 5, name: "Zone E - Lakeside", households: 460, providers: 40, activeDisputes: 0 },
    { id: 6, name: "Zone F - Central Park", households: 375, providers: 29, activeDisputes: 1 },
    { id: 7, name: "Zone G - Meadowbrook", households: 340, providers: 25, activeDisputes: 0 },
    { id: 8, name: "Zone H - Sunset District", households: 400, providers: 33, activeDisputes: 2 },
    { id: 9, name: "Zone I - Old Town", households: 310, providers: 20, activeDisputes: 0 },
    { id: 10, name: "Zone J - Westbrook", households: 445, providers: 36, activeDisputes: 1 },
    { id: 11, name: "Zone K - Highland", households: 280, providers: 18, activeDisputes: 0 },
    { id: 12, name: "Zone L - Pinecrest", households: 395, providers: 27, activeDisputes: 1 },
  ];

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
                <p className="text-[#8FE3C7] text-xs font-bold">ADMIN</p>
                <h1 className="text-xl font-black">NeighbourHub</h1>
              </div>
            </div>
            <p className="text-xs text-slate-400 mt-3">Platform Control Panel</p>
          </div>

          <nav className="mt-5 px-3 space-y-1">
            {navItems.map(({ label, icon: Icon, path }) => {
              const active = path === "/admin/zone-configuration";
              return (
                <button
                  key={label}
                  onClick={() => navigate(path)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition ${
                    active
                      ? "bg-white/10 text-white"
                      : "text-slate-300 hover:bg-white/5"
                  }`}
                >
                  <Icon />
                  {label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-4">
          <div className="bg-[#1B2948] rounded-xl p-4 mb-3">
            <div className="flex gap-2 text-[#8FE3C7] text-xs font-bold">
              <FaShieldAlt />
              ADMIN ACCESS
            </div>
            <p className="text-slate-400 text-xs mt-1">
              Full platform control enabled.
            </p>
          </div>

          <button onClick={logout} className="w-full py-3 rounded-xl bg-[#1B2948]">
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
              Zone Management
            </p>
            <h1 className="text-4xl font-black text-[#111C34] mt-2">
              Zone Configuration
            </h1>
            <p className="text-slate-500 mt-3">
              Manage the 12 residential zones covered by Greenway Community.
            </p>
          </div>

          <button
            onClick={() => setShowAddZone(!showAddZone)}
            className="bg-[#111C34] hover:bg-[#1d2b4f] text-white px-6 py-3 rounded-xl"
          >
            <FaPlus className="inline mr-2" />
            Add Zone
          </button>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-4 gap-6 mt-8">
          <div className="bg-white rounded-3xl border shadow-sm p-6">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-blue-100 text-blue-600">
              <FaMapMarkedAlt className="text-2xl" />
            </div>
            <p className="text-slate-400 mt-5 text-sm">Total Zones</p>
            <h2 className="text-3xl font-black text-[#111C34] mt-2">12</h2>
          </div>

          <div className="bg-white rounded-3xl border shadow-sm p-6">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-green-100 text-green-600">
              <FaHouseholds className="text-2xl" />
            </div>
            <p className="text-slate-400 mt-5 text-sm">Total Households</p>
            <h2 className="text-3xl font-black text-[#111C34] mt-2">
              {zones.reduce((sum, z) => sum + z.households, 0).toLocaleString()}
            </h2>
          </div>

          <div className="bg-white rounded-3xl border shadow-sm p-6">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-yellow-100 text-yellow-600">
              <FaUserTie className="text-2xl" />
            </div>
            <p className="text-slate-400 mt-5 text-sm">Registered Providers</p>
            <h2 className="text-3xl font-black text-[#111C34] mt-2">
              {zones.reduce((sum, z) => sum + z.providers, 0)}
            </h2>
          </div>

          <div className="bg-white rounded-3xl border shadow-sm p-6">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-pink-100 text-pink-600">
              <FaChartLine className="text-2xl" />
            </div>
            <p className="text-slate-400 mt-5 text-sm">Zones with Active Disputes</p>
            <h2 className="text-3xl font-black text-[#111C34] mt-2">
              {zones.filter((z) => z.activeDisputes > 0).length}
            </h2>
          </div>
        </div>

        {/* ADD ZONE FORM */}
        {showAddZone && (
          <div className="bg-white rounded-3xl border shadow-sm p-8 mt-8">
            <h2 className="text-2xl font-black text-[#111C34] mb-6">
              Add New Zone
            </h2>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="font-bold text-sm text-slate-600">Zone Name</label>
                <input
                  type="text"
                  value={zoneName}
                  onChange={(e) => setZoneName(e.target.value)}
                  placeholder="e.g. Zone M - Northgate"
                  className="w-full border rounded-xl p-3 mt-2 outline-none focus:border-[#2E6F5E]"
                />
              </div>

              <div>
                <label className="font-bold text-sm text-slate-600">Estimated Households</label>
                <input
                  type="number"
                  value={zoneHouseholds}
                  onChange={(e) => setZoneHouseholds(e.target.value)}
                  placeholder="e.g. 350"
                  className="w-full border rounded-xl p-3 mt-2 outline-none focus:border-[#2E6F5E]"
                />
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <button className="bg-[#111C34] hover:bg-[#1d2b4f] text-white px-8 py-3 rounded-xl transition">
                Save Zone
              </button>
              <button
                onClick={() => setShowAddZone(false)}
                className="border px-8 py-3 rounded-xl transition hover:bg-slate-50"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* ZONES TABLE */}
        <div className="bg-white rounded-3xl border shadow-sm mt-8 p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-black text-[#111C34]">
              All Zones
            </h2>
            <span className="text-sm text-slate-500">
              {zones.length} Zones Configured
            </span>
          </div>

          <table className="w-full">
            <thead>
              <tr className="text-slate-500 text-left border-b">
                <th className="py-4">Zone</th>
                <th>Households</th>
                <th>Providers</th>
                <th>Active Disputes</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {zones.map((zone) => (
                <tr
                  key={zone.id}
                  className="border-b last:border-none hover:bg-slate-50 transition"
                >
                  <td className="py-5 font-semibold text-[#111C34]">{zone.name}</td>
                  <td className="text-slate-600">{zone.households}</td>
                  <td className="text-slate-600">{zone.providers}</td>
                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        zone.activeDisputes > 0
                          ? "bg-red-100 text-red-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {zone.activeDisputes}
                    </span>
                  </td>
                  <td className="text-right">
                    <button className="text-blue-600 hover:text-blue-800 mr-4">
                      <FaEdit className="inline" />
                    </button>
                    <button className="text-red-600 hover:text-red-800">
                      <FaTrash className="inline" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}