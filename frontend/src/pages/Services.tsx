import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import {
  FaHome,
  FaUserCog,
  FaClipboardList,
  FaComments,
  FaBell,
  FaSignOutAlt,
  FaSearch,
  FaUserCircle,
  FaCrown,
  FaShieldAlt,
  FaStar,
  FaMapMarkerAlt,
  FaFilter,
} from "react-icons/fa";

type ServiceProvider = {
  id: string;
  name: string;
  category: string;
  rating: number;
  reviews: number;
  location: string;
  price: string;
  verified: boolean;
  image?: string;
};

export default function Services() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [providers, setProviders] = useState<ServiceProvider[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const navItems = [
    { label: "Dashboard", icon: FaHome, path: "/dashboard" },
    { label: "Find Services", icon: FaSearch, path: "/services", active: true },
    { label: "My Bookings", icon: FaClipboardList, path: "/bookings" },
    { label: "Messages", icon: FaComments, path: "/messages" },
    { label: "Notifications", icon: FaBell, path: "/notifications" },
    { label: "Profile", icon: FaUserCircle, path: "/profile" },
  ];

  const categories = [
    "All",
    "Home Cleaning",
    "Plumbing",
    "Electrician",
    "Tutoring",
    "Salon & Grooming",
    "Painting",
    "Appliance Repair",
  ];

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await api.get("/provider/list", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProviders(response.data || []);
      } catch {
        // Fallback so the page still shows something useful if the endpoint
        // isn't wired up yet. Replace/remove once /provider/list is live.
        setProviders([
          {
            id: "1",
            name: "Bilal Ahmed",
            category: "Plumbing",
            rating: 4.8,
            reviews: 132,
            location: "DHA Phase 6, Karachi",
            price: "Rs. 800 / visit",
            verified: true,
          },
          {
            id: "2",
            name: "Sana Malik",
            category: "Home Cleaning",
            rating: 4.9,
            reviews: 210,
            location: "Clifton, Karachi",
            price: "Rs. 1,500 / visit",
            verified: true,
          },
          {
            id: "3",
            name: "Usman Tariq",
            category: "Electrician",
            rating: 4.6,
            reviews: 87,
            location: "Gulshan-e-Iqbal, Karachi",
            price: "Rs. 600 / visit",
            verified: true,
          },
          {
            id: "4",
            name: "Ayesha Khan",
            category: "Tutoring",
            rating: 5.0,
            reviews: 64,
            location: "Bahadurabad, Karachi",
            price: "Rs. 2,000 / month",
            verified: false,
          },
          {
            id: "5",
            name: "Fahad Sheikh",
            category: "Painting",
            rating: 4.7,
            reviews: 45,
            location: "North Nazimabad, Karachi",
            price: "Rs. 25 / sq. ft",
            verified: true,
          },
          {
            id: "6",
            name: "Hina Riaz",
            category: "Salon & Grooming",
            rating: 4.9,
            reviews: 178,
            location: "PECHS, Karachi",
            price: "Rs. 1,200 / session",
            verified: true,
          },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchProviders();
  }, []);

  const filtered = useMemo(() => {
    return providers.filter((p) => {
      const matchesCategory = activeCategory === "All" || p.category === activeCategory;
      const matchesQuery =
        query.trim() === "" ||
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [providers, activeCategory, query]);

  return (
    <div className="min-h-screen flex bg-[#F3F4F7]">
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

      {/* ================= MAIN ================= */}
      <main className="flex-1 ml-[272px] px-10 py-9 max-w-[1440px] w-full">
        {/* ================= TOP BAR ================= */}
        <div className="flex items-start justify-between gap-6 flex-wrap">
          <div>
            <p className="text-xs font-semibold text-[#2E6F5E] uppercase tracking-widest">
              Find Services
            </p>
            <h1 className="text-4xl font-extrabold text-[#111C34] mt-2 leading-tight">
              Trusted providers near you
            </h1>
            <p className="mt-3 text-slate-500 text-base max-w-xl">
              Browse verified professionals in your neighbourhood and book with confidence.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button className="w-11 h-11 rounded-xl bg-white shadow-sm border border-slate-200 flex items-center justify-center text-slate-500 hover:text-[#2E6F5E] hover:border-[#2E6F5E]/40 transition-colors">
              <FaBell />
            </button>

            <div className="flex items-center gap-3 rounded-xl bg-white px-3 py-2 shadow-sm border border-slate-200">
              <img
                src={`https://ui-avatars.com/api/?name=${user.fullName}&background=111C34&color=8FE3C7`}
                className="w-10 h-10 rounded-full"
                alt="avatar"
              />
              <div className="pr-1">
                <h4 className="font-semibold text-slate-800 text-sm leading-tight">
                  {user.fullName}
                </h4>
                <p className="text-xs text-slate-500">Resident</p>
              </div>
            </div>
          </div>
        </div>

        {/* ================= SEARCH BAR ================= */}
        <div className="mt-8 rounded-2xl bg-[#111C34] p-6 relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[#2E6F5E]/25 blur-3xl" />
          <div className="relative flex flex-col md:flex-row gap-4 md:items-center">
            <div className="relative flex-1">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by provider name or service, e.g. 'Plumber'..."
                className="w-full rounded-xl border border-white/10 bg-white/10 py-3.5 pl-11 pr-4 text-white placeholder:text-slate-400 outline-none focus:border-[#8FE3C7]/50 focus:ring-2 focus:ring-[#8FE3C7]/20 transition-all text-sm"
              />
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
            </div>
            <button className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#2E6F5E] text-white font-semibold text-sm hover:bg-[#357d6a] transition-colors shrink-0">
              <FaFilter className="text-xs" />
              Filters
            </button>
          </div>
        </div>

        {/* ================= CATEGORY CHIPS ================= */}
        <div className="mt-6 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                activeCategory === cat
                  ? "bg-[#111C34] text-white border-[#111C34]"
                  : "bg-white text-slate-600 border-slate-200 hover:border-[#2E6F5E]/40 hover:text-[#2E6F5E]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ================= RESULTS HEADER ================= */}
        <div className="flex items-center justify-between mt-8 mb-5">
          <h2 className="text-lg font-bold text-[#111C34]">
            {loading ? "Loading providers..." : `${filtered.length} providers found`}
          </h2>
          {!loading && activeCategory !== "All" && (
            <span className="text-sm text-slate-500">
              Showing results in <span className="font-semibold text-[#2E6F5E]">{activeCategory}</span>
            </span>
          )}
        </div>

        {/* ================= PROVIDER GRID ================= */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="rounded-2xl border border-slate-200 bg-white p-6 h-[220px] animate-pulse"
              />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center text-center py-16 px-6 rounded-2xl bg-white border border-slate-200">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="font-semibold text-[#111C34] text-lg">No providers match your search</h3>
            <p className="text-slate-500 text-sm mt-2 max-w-sm">
              Try a different keyword or choose another category to see more results.
            </p>
            <button
              onClick={() => {
                setQuery("");
                setActiveCategory("All");
              }}
              className="mt-6 px-6 py-3 rounded-xl bg-[#111C34] text-white text-sm font-semibold hover:bg-[#1a2b52] transition-colors"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 pb-4">
            {filtered.map((provider) => (
              <div
                key={provider.id}
                className="group rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={`https://ui-avatars.com/api/?name=${provider.name}&background=111C34&color=8FE3C7`}
                      className="w-12 h-12 rounded-full"
                      alt={provider.name}
                    />
                    <div>
                      <h3 className="font-semibold text-[#111C34] text-[15px]">
                        {provider.name}
                      </h3>
                      <p className="text-xs text-slate-500">{provider.category}</p>
                    </div>
                  </div>

                  {provider.verified && (
                    <span className="flex items-center gap-1 text-[10px] font-semibold text-[#2E6F5E] bg-[#2E6F5E]/10 px-2 py-1 rounded-full uppercase tracking-wide">
                      <FaShieldAlt className="text-[9px]" /> Verified
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1 mt-4 text-sm">
                  <FaStar className="text-amber-400" />
                  <span className="font-semibold text-[#111C34]">{provider.rating}</span>
                  <span className="text-slate-400">({provider.reviews} reviews)</span>
                </div>

                <div className="flex items-center gap-1.5 mt-2 text-sm text-slate-500">
                  <FaMapMarkerAlt className="text-slate-400 text-xs" />
                  {provider.location}
                </div>

                <div className="h-px bg-slate-100 my-4" />

                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-[#111C34]">
                    {provider.price}
                  </span>
                  <button
                    onClick={() => navigate(`/bookings/new?provider=${provider.id}`)}
                    className="px-4 py-2 rounded-xl bg-[#2E6F5E] text-white text-sm font-semibold hover:bg-[#357d6a] transition-colors"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}