import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaHome,
  FaExclamationTriangle,
  FaFlag,
  FaComments,
  FaUserCircle,
  FaCog,
  FaSignOutAlt,
  FaShieldAlt,
  FaCrown,
  FaArrowLeft,
  FaSave,
} from "react-icons/fa";

export default function ModeratorEditProfile() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [fullName, setFullName] = useState(user.fullName || "");
  const [email, setEmail] = useState(user.email || "");
  const [phone, setPhone] = useState(user.phone || "+92 300 1234567");
  const [address, setAddress] = useState(user.address || "Karachi, Pakistan");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const navItems = [
    { label: "Dashboard", icon: FaHome, path: "/moderator-dashboard" },
    { label: "Disputes", icon: FaExclamationTriangle, path: "/moderator/disputes" },
    { label: "Flagged Content", icon: FaFlag, path: "/moderator/flagged-content" },
    { label: "Conversations", icon: FaComments, path: "/moderator/conversations" },
    { label: "Profile", icon: FaUserCircle, path: "/moderator/profile", active: true },
    { label: "Settings", icon: FaCog, path: "/moderator/settings" },
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    const updatedUser = { ...user, fullName, email, phone, address };
    localStorage.setItem("user", JSON.stringify(updatedUser));

    navigate("/moderator/profile");
  };

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
                <p className="text-[#8FE3C7] text-xs font-bold">MODERATOR</p>
                <h1 className="text-xl font-black">NeighbourHub</h1>
              </div>
            </div>
            <p className="text-xs text-slate-400 mt-3">Trust & Safety Panel</p>
          </div>

          <nav className="mt-5 px-3 space-y-1">
            {navItems.map(({ label, icon: Icon, path, active }) => (
              <button
                key={label}
                onClick={() => navigate(path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition ${
                  active ? "bg-white/10 text-white" : "text-slate-300 hover:bg-white/5"
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
            <div className="flex gap-2 text-[#8FE3C7] text-xs font-bold">
              <FaShieldAlt />
              MODERATOR ACCESS
            </div>
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
            <p className="uppercase tracking-widest text-xs text-[#2E6F5E] font-bold">
              Moderator
            </p>
            <h1 className="text-4xl font-black text-[#111C34] mt-2">Edit Profile</h1>
            <p className="text-slate-500 mt-2">
              Update your personal information.
            </p>
          </div>

          <button
            onClick={() => navigate("/moderator/profile")}
            className="bg-[#111C34] hover:bg-[#1A2B52] text-white px-5 py-3 rounded-xl flex items-center gap-2"
          >
            <FaArrowLeft />
            Back to Profile
          </button>
        </div>

        <form
          onSubmit={handleSave}
          className="bg-white rounded-3xl shadow p-8 mt-8 max-w-3xl"
        >
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="font-bold text-sm text-slate-600">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full border rounded-xl p-3 mt-2 outline-none focus:border-[#2E6F5E]"
              />
            </div>

            <div>
              <label className="font-bold text-sm text-slate-600">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded-xl p-3 mt-2 outline-none focus:border-[#2E6F5E]"
              />
            </div>

            <div>
              <label className="font-bold text-sm text-slate-600">Phone</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border rounded-xl p-3 mt-2 outline-none focus:border-[#2E6F5E]"
              />
            </div>

            <div>
              <label className="font-bold text-sm text-slate-600">Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full border rounded-xl p-3 mt-2 outline-none focus:border-[#2E6F5E]"
              />
            </div>
          </div>

          <div className="flex gap-4 mt-8">
            <button
              type="submit"
              className="bg-[#111C34] hover:bg-[#1A2B52] text-white px-8 py-3 rounded-xl transition flex items-center gap-2"
            >
              <FaSave />
              Save Changes
            </button>

            <button
              type="button"
              onClick={() => navigate("/moderator/profile")}
              className="border px-8 py-3 rounded-xl transition hover:bg-slate-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}