import { useNavigate } from "react-router-dom";

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
  FaEdit,
  FaCheckCircle,
} from "react-icons/fa";

export default function Profile() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const navItems = [
    { label: "Dashboard", icon: FaHome, path: "/dashboard" },
    { label: "Find Services", icon: FaSearch, path: "/services" },
    { label: "My Bookings", icon: FaClipboardList, path: "/bookings" },
    { label: "Messages", icon: FaComments, path: "/messages" },
    { label: "Notifications", icon: FaBell, path: "/notifications" },
    { label: "Profile", icon: FaUserCircle, path: "/profile", active: true },
  ];

  return (
    <div className="min-h-screen flex bg-[#F4F6FA]">
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
        <div className="flex justify-between items-center">
          <div>
            <p className="text-xs tracking-widest uppercase text-[#2E6F5E] font-bold">
              Account Settings
            </p>

            <h1 className="text-4xl font-black text-[#111C34] mt-2">
              My Profile
            </h1>

            <p className="text-slate-500 mt-2">
              Manage your personal information.
            </p>
          </div>

          {/* EDIT BUTTON */}

          <button
            type="button"
            onClick={() => navigate("/edit-profile")}
            className="
              relative
              z-[999]
              flex
              items-center
              gap-2
              bg-[#111C34]
              hover:bg-[#1c2d55]
              text-white
              px-5
              py-3
              rounded-xl
              text-sm
              cursor-pointer
            "
          >
            <FaEdit />
            Edit Profile
          </button>
        </div>

        {/* PROFILE CARD */}

        <div className="mt-8 bg-[#111C34] rounded-3xl p-8 text-white relative overflow-hidden">
          <div
            className="
            absolute
            right-0
            top-0
            w-72
            h-72
            bg-[#2E6F5E]/30
            rounded-full
            blur-3xl
            pointer-events-none
          "
          ></div>

          <div className="relative z-10 flex items-center gap-6">
            <div className="w-28 h-28 rounded-full bg-[#2E6F5E] flex items-center justify-center text-5xl font-bold">
              {(user.fullName || "U").charAt(0)}
            </div>

            <div>
              <h2 className="text-3xl font-black">
                {user.fullName || "John Resident"}
              </h2>

              <div className="flex gap-2 text-[#8FE3C7] mt-2">
                <FaCheckCircle />
                Verified Member
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
