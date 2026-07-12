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
  FaMoneyBillWave,
  FaClock,
} from "react-icons/fa";

export default function ProviderEarnings() {
  const navigate = useNavigate();

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

  const transactions = [
    { customer: "Ali Khan", amount: "Rs. 2,500", date: "12 Jul 2026" },
    { customer: "Ahmed", amount: "Rs. 4,000", date: "10 Jul 2026" },
    { customer: "Sara", amount: "Rs. 3,200", date: "08 Jul 2026" },
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
            <h1 className="text-4xl font-black text-[#111C34] mt-2">Earnings</h1>
            <p className="text-slate-500 mt-2">
              View your earnings and payment history.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white rounded-3xl shadow p-6">
            <div className="flex items-center justify-between">
              <FaWallet className="text-3xl text-[#2E6F5E]" />
              <span className="text-sm text-slate-400">Lifetime</span>
            </div>
            <p className="mt-5 text-slate-500">Total Earnings</p>
            <h2 className="text-4xl font-black mt-2 text-[#111C34]">Rs. 185,000</h2>
          </div>

          <div className="bg-white rounded-3xl shadow p-6">
            <div className="flex items-center justify-between">
              <FaMoneyBillWave className="text-3xl text-blue-600" />
              <span className="text-sm text-slate-400">Current</span>
            </div>
            <p className="mt-5 text-slate-500">This Month</p>
            <h2 className="text-4xl font-black mt-2 text-[#111C34]">Rs. 32,000</h2>
          </div>

          <div className="bg-white rounded-3xl shadow p-6">
            <div className="flex items-center justify-between">
              <FaClock className="text-3xl text-orange-500" />
              <span className="text-sm text-slate-400">Awaiting</span>
            </div>
            <p className="mt-5 text-slate-500">Pending Payments</p>
            <h2 className="text-4xl font-black mt-2 text-[#111C34]">Rs. 8,500</h2>
          </div>
        </div>

        {/* Transactions */}
        <div className="bg-white rounded-3xl shadow mt-8 p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-bold text-2xl text-[#111C34]">Recent Transactions</h2>
            <span className="text-sm text-slate-500">
              {transactions.length} Transactions
            </span>
          </div>

          <table className="w-full">
            <thead>
              <tr className="text-slate-500 text-left border-b">
                <th className="py-4">Customer</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t, index) => (
                <tr key={index} className="border-b last:border-none hover:bg-slate-50 transition">
                  <td className="py-5 font-semibold">{t.customer}</td>
                  <td className="text-[#2E6F5E] font-bold">{t.amount}</td>
                  <td className="text-slate-500">{t.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}