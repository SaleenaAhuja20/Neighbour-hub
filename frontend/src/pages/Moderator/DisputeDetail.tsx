import { useParams, useNavigate } from "react-router-dom";
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
  FaRobot,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

export default function DisputeDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const navItems = [
    { label: "Dashboard", icon: FaHome, path: "/moderator-dashboard" },
    { label: "Disputes", icon: FaExclamationTriangle, path: "/moderator/disputes", active: true },
    { label: "Flagged Content", icon: FaFlag, path: "/moderator/flagged-content" },
    { label: "Conversations", icon: FaComments, path: "/moderator/conversations" },
    { label: "Profile", icon: FaUserCircle, path: "/moderator/profile" },
    { label: "Settings", icon: FaCog, path: "/moderator/settings" },
  ];

  // Placeholder data — replace with API call using `id`
  const dispute = {
    id: id || "D001",
    service: "Electrical Repair",
    price: "Rs. 3,500",
    date: "10 Jul 2026",
    customer: "Ali Khan",
    provider: "Ahmed Services",
    status: "Evidence Submitted",
    residentComplaint:
      "The provider did not complete the wiring work and left the job midway. I was charged the full amount.",
    providerResponse:
      "I completed 80% of the work but the customer refused to pay the remaining balance for materials, so I paused the job.",
  };

  const aiSummary = {
    residentClaim: "Work was left incomplete despite full payment.",
    providerClaim: "Work was paused due to a disagreement over material costs.",
    contradiction: "Both parties agree the job was not finished, but disagree on who caused the stoppage.",
    suggestion: "Partial Refund",
    rationale:
      "Based on platform policy, incomplete work warrants a partial refund proportional to the uncompleted portion (~20%), unless the provider can submit evidence of prior customer agreement on the additional cost.",
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
              Dispute #{dispute.id}
            </p>
            <h1 className="text-4xl font-black text-[#111C34] mt-2">
              {dispute.customer} vs {dispute.provider}
            </h1>
            <p className="text-slate-500 mt-2">{dispute.service} — {dispute.date}</p>
          </div>

          <button
            onClick={() => navigate("/moderator/disputes")}
            className="bg-[#111C34] hover:bg-[#1A2B52] text-white px-5 py-3 rounded-xl flex items-center gap-2"
          >
            <FaArrowLeft />
            Back to Disputes
          </button>
        </div>

        <div className="grid grid-cols-3 gap-6 mt-8">
          {/* BOOKING INFO */}
          <div className="bg-white rounded-3xl shadow p-6 col-span-1">
            <h2 className="font-bold text-lg text-[#111C34] mb-4">Booking Details</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Service</span>
                <span className="font-semibold">{dispute.service}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Price</span>
                <span className="font-semibold">{dispute.price}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Date</span>
                <span className="font-semibold">{dispute.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Status</span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                  {dispute.status}
                </span>
              </div>
            </div>
          </div>

          {/* STATEMENTS */}
          <div className="bg-white rounded-3xl shadow p-6 col-span-2">
            <h2 className="font-bold text-lg text-[#111C34] mb-4">Statements</h2>

            <div className="mb-5">
              <p className="text-sm font-bold text-slate-500">Resident Complaint — {dispute.customer}</p>
              <p className="mt-2 text-slate-700 bg-slate-50 rounded-xl p-4">
                {dispute.residentComplaint}
              </p>
            </div>

            <div>
              <p className="text-sm font-bold text-slate-500">Provider Response — {dispute.provider}</p>
              <p className="mt-2 text-slate-700 bg-slate-50 rounded-xl p-4">
                {dispute.providerResponse}
              </p>
            </div>
          </div>
        </div>

        {/* AI MEDIATOR ASSISTANT */}
        <div className="bg-[#111C34] rounded-3xl p-8 mt-8 text-white relative overflow-hidden">
          <div className="absolute right-0 top-0 w-72 h-72 bg-[#2E6F5E]/20 rounded-full blur-3xl"></div>
          <div className="relative">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#2E6F5E] flex items-center justify-center">
                <FaRobot className="text-[#8FE3C7]" />
              </div>
              <div>
                <p className="text-[#8FE3C7] text-xs font-bold uppercase tracking-widest">
                  AI Dispute Mediator Assistant
                </p>
                <h2 className="text-2xl font-black">Suggested Resolution</h2>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white/5 rounded-2xl p-5">
                <p className="text-slate-300 text-sm font-bold">Resident's Claim</p>
                <p className="mt-2 text-slate-100">{aiSummary.residentClaim}</p>
              </div>
              <div className="bg-white/5 rounded-2xl p-5">
                <p className="text-slate-300 text-sm font-bold">Provider's Claim</p>
                <p className="mt-2 text-slate-100">{aiSummary.providerClaim}</p>
              </div>
            </div>

            <div className="bg-white/5 rounded-2xl p-5 mt-4">
              <p className="text-slate-300 text-sm font-bold">Contradiction Identified</p>
              <p className="mt-2 text-slate-100">{aiSummary.contradiction}</p>
            </div>

            <div className="bg-[#2E6F5E]/20 border border-[#2E6F5E] rounded-2xl p-5 mt-4">
              <p className="text-[#8FE3C7] text-sm font-bold">Suggested Resolution</p>
              <h3 className="text-2xl font-black mt-1">{aiSummary.suggestion}</h3>
              <p className="mt-2 text-slate-200 text-sm leading-6">{aiSummary.rationale}</p>
            </div>

            <p className="text-xs text-slate-400 mt-4">
              This is a starting recommendation only. The final decision is yours.
            </p>
          </div>
        </div>

        {/* FINAL DECISION */}
        <div className="bg-white rounded-3xl shadow p-8 mt-8">
          <h2 className="font-bold text-2xl text-[#111C34] mb-6">Moderator Decision</h2>

          <textarea
            placeholder="Add your resolution notes..."
            className="w-full border rounded-xl p-4 outline-none focus:border-[#2E6F5E] min-h-[120px]"
          />

          <div className="flex gap-4 mt-6">
            <button className="bg-[#2E6F5E] hover:bg-[#25594B] text-white px-8 py-3 rounded-xl transition flex items-center gap-2">
              <FaCheckCircle />
              Full Refund
            </button>
            <button className="bg-[#111C34] hover:bg-[#1A2B52] text-white px-8 py-3 rounded-xl transition">
              Partial Refund
            </button>
            <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl transition flex items-center gap-2">
              <FaTimesCircle />
              No Action
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}