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
  FaEye,
  FaCheck,
  FaBan,
} from "react-icons/fa";

export default function FlaggedContent() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const navItems = [
    { label: "Dashboard", icon: FaHome, path: "/moderator-dashboard" },
    { label: "Disputes", icon: FaExclamationTriangle, path: "/moderator/disputes" },
    { label: "Flagged Content", icon: FaFlag, path: "/moderator/flagged-content", active: true },
    { label: "Conversations", icon: FaComments, path: "/moderator/conversations" },
    { label: "Profile", icon: FaUserCircle, path: "/moderator/profile" },
    { label: "Settings", icon: FaCog, path: "/moderator/settings" },
  ];

  const flaggedProviders = [
    { name: "QuickFix Services", reason: "3 disputed bookings in 30 days", severity: "High" },
    { name: "Metro Cleaners", reason: "Pattern of cancelled jobs", severity: "Medium" },
  ];

  const flaggedReviews = [
    { author: "Anonymous", target: "Ahmed Services", text: "This provider is a scammer, avoid at all costs!!!", reason: "Prohibited content pattern" },
    { author: "Sara", target: "Green Care", text: "Contact me directly on WhatsApp for cheaper rate 03xx...", reason: "Off-platform contact attempt" },
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
        <p className="uppercase tracking-widest text-xs text-[#2E6F5E] font-bold">
          Trust & Safety
        </p>
        <h1 className="text-4xl font-black text-[#111C34] mt-2">Flagged Content</h1>
        <p className="text-slate-500 mt-2">
          Providers auto-flagged for disputed bookings, and messages/reviews flagged for
          prohibited content.
        </p>

        {/* FLAGGED PROVIDERS */}
        <div className="bg-white rounded-3xl shadow p-8 mt-8">
          <h2 className="font-bold text-2xl text-[#111C34] mb-6">Flagged Providers</h2>

          <div className="space-y-4">
            {flaggedProviders.map((p) => (
              <div
                key={p.name}
                className="flex justify-between items-center border rounded-2xl p-5 hover:bg-slate-50 transition"
              >
                <div>
                  <h3 className="font-bold text-[#111C34]">{p.name}</h3>
                  <p className="text-sm text-slate-500">{p.reason}</p>
                </div>

                <div className="flex items-center gap-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      p.severity === "High" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {p.severity}
                  </span>
                  <button className="text-blue-600 hover:text-blue-800">
                    <FaEye className="inline mr-1" />
                    Review
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FLAGGED REVIEWS / MESSAGES */}
        <div className="bg-white rounded-3xl shadow p-8 mt-8">
          <h2 className="font-bold text-2xl text-[#111C34] mb-6">Flagged Reviews & Messages</h2>

          <div className="space-y-4">
            {flaggedReviews.map((r, i) => (
              <div key={i} className="border rounded-2xl p-5">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-[#111C34]">
                      {r.author} → {r.target}
                    </h3>
                    <p className="text-slate-600 mt-2 bg-slate-50 rounded-xl p-3">
                      "{r.text}"
                    </p>
                    <p className="text-xs text-red-600 font-semibold mt-2">
                      Flag reason: {r.reason}
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <button className="bg-green-100 text-green-700 px-4 py-2 rounded-xl hover:bg-green-200 transition">
                      <FaCheck className="inline mr-1" />
                      Approve
                    </button>
                    <button className="bg-red-100 text-red-700 px-4 py-2 rounded-xl hover:bg-red-200 transition">
                      <FaBan className="inline mr-1" />
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}