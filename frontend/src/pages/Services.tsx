import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

import {
  FaHome,
  FaUserCircle,
  FaClipboardList,
  FaComments,
  FaBell,
  FaSearch,
  FaSignOutAlt,
  FaShieldAlt,
  FaFilter,
  FaMapMarkerAlt,
  FaCrown,
} from "react-icons/fa";

type Provider = {
  id: string;
  serviceTitle: string;
  category: string;
  experience: string;
  phone: string;
  address: string;
  description: string;
  status: string;

  user: {
    fullName: string;
    email: string;
  };
};

export default function Services() {

  const navigate = useNavigate();

  const user =
    JSON.parse(localStorage.getItem("user") || "{}");

  const [providers, setProviders] =
    useState<Provider[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [query, setQuery] =
    useState("");

  const [activeCategory, setActiveCategory] =
    useState("All");

  const navItems = [
    {
      label: "Dashboard",
      icon: FaHome,
      path: "/dashboard",
    },
    {
      label: "Find Services",
      icon: FaSearch,
      path: "/services",
      active: true,
    },
    {
      label: "My Bookings",
      icon: FaClipboardList,
      path: "/bookings",
    },
    {
      label: "Messages",
      icon: FaComments,
      path: "/messages",
    },
    {
      label: "Notifications",
      icon: FaBell,
      path: "/notifications",
    },
    {
      label: "Profile",
      icon: FaUserCircle,
      path: "/profile",
    },
  ];

  const categories = useMemo(() => {

    return [
      "All",
      ...new Set(
        providers.map((provider) => provider.category)
      ),
    ];

  }, [providers]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  useEffect(() => {

    const fetchProviders = async () => {

      try {

        const res = await api.get("/provider/approved");

        console.log("Providers:", res.data);

        setProviders(res.data);

      } catch (err) {

        console.log(err);

      } finally {

        setLoading(false);

      }

    };

    fetchProviders();

  }, []);

  const filteredProviders = useMemo(() => {

    return providers.filter((provider) => {

      const matchesCategory =
        activeCategory === "All" ||
        provider.category === activeCategory;

      const matchesSearch =
        provider.user.fullName
          .toLowerCase()
          .includes(query.toLowerCase()) ||

        provider.serviceTitle
          .toLowerCase()
          .includes(query.toLowerCase()) ||

        provider.category
          .toLowerCase()
          .includes(query.toLowerCase());

      return matchesCategory && matchesSearch;

    });

  }, [providers, query, activeCategory]);
  return (
    <div className="min-h-screen flex bg-[#F3F4F7]">
      {/* ================= SIDEBAR ================= */}
      <aside className="fixed left-0 top-0 h-screen w-[272px] bg-[#111C34] text-white flex flex-col justify-between z-50">

        <div>

          <div className="px-7 py-8 border-b border-white/10">

            <div className="flex items-center gap-3">

              <span className="w-10 h-10 rounded-xl bg-[#2E6F5E] flex items-center justify-center">
                <FaCrown className="text-[#8FE3C7]" />
              </span>

              <div>
                <p className="text-xs uppercase tracking-widest text-[#8FE3C7] font-bold">
                  Premium
                </p>

                <h1 className="text-2xl font-black">
                  NeighbourHub
                </h1>
              </div>

            </div>

            <p className="text-slate-400 text-sm mt-2">
              Resident Portal
            </p>

          </div>

          <nav className="mt-6 px-3 space-y-1">

            {navItems.map(({ label, icon: Icon, path, active }) => (

              <button
                key={label}
                onClick={() => navigate(path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition
                ${active
                    ? "bg-white/10 text-white"
                    : "text-slate-300 hover:bg-white/5"
                  }`}
              >

                <Icon
                  className={
                    active
                      ? "text-[#8FE3C7]"
                      : "text-slate-400"
                  }
                />

                {label}

              </button>

            ))}

          </nav>

        </div>

        <div className="p-4 mt-auto">

          <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-3">

            <div className="flex items-center gap-2 text-[#8FE3C7] text-xs font-bold">
              <FaShieldAlt />
              VERIFIED RESIDENT
            </div>

            <p className="text-slate-400 text-xs mt-2">
              Browse trusted service providers in your community.
            </p>

          </div>

          <button
            onClick={logout}
            className="w-full py-3 rounded-xl bg-white/5 hover:bg-red-500/20 flex items-center justify-center gap-2 text-sm transition"
          >
            <FaSignOutAlt />
            Logout
          </button>

        </div>

      </aside>

      {/* ================= MAIN ================= */}

      <main className="flex-1 ml-[272px] px-10 py-9">

        <p className="text-xs uppercase tracking-widest font-bold text-[#2E6F5E]">
          Find Services
        </p>

        <h1 className="text-4xl font-black text-[#111C34] mt-2">
          Trusted Service Providers
        </h1>

        <p className="text-slate-500 mt-3">
          Browse approved service providers from the NeighbourHub community.
        </p>

        {/* SEARCH */}

        <div className="mt-8 bg-[#111C34] rounded-2xl p-6">

          <div className="flex gap-4">

            <div className="relative flex-1">

              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

              <input
                type="text"
                placeholder="Search by provider name or service..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder:text-slate-400 outline-none"
              />

            </div>

            <button className="px-6 rounded-xl bg-[#2E6F5E] text-white font-semibold flex items-center gap-2">
              <FaFilter />
              Filters
            </button>

          </div>

        </div>

        {/* CATEGORY BUTTONS */}

        <div className="flex flex-wrap gap-3 mt-6">

          {categories.map((category) => (

            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-full transition
              ${activeCategory === category
                  ? "bg-[#111C34] text-white"
                  : "bg-white border"
                }`}
            >
              {category}
            </button>

          ))}

        </div>
        {loading ? (

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

            {[1, 2, 3, 4, 5, 6].map((item) => (

              <div
                key={item}
                className="bg-white rounded-2xl h-[250px] animate-pulse"
              />

            ))}

          </div>

        ) : filteredProviders.length === 0 ? (

          <div className="bg-white rounded-2xl border p-10 text-center">

            <h2 className="text-2xl font-bold text-[#111C34]">

              No Providers Found

            </h2>

            <p className="text-slate-500 mt-2">

              Try another category or search keyword.

            </p>

          </div>

        ) : (

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

            {filteredProviders.map((provider) => (

              <div
                key={provider.id}
                className="bg-white rounded-2xl border p-6 hover:shadow-lg transition"
              >

                <div className="flex justify-between">

                  <div>

                    <h2 className="text-xl font-bold text-[#111C34]">

                      {provider.user.fullName}

                    </h2>

                    <p className="text-[#2E6F5E] font-medium">

                      {provider.serviceTitle}

                    </p>

                  </div>

                  <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-bold">

                    VERIFIED

                  </span>

                </div>

                <div className="mt-5">

                  <p className="text-xs uppercase text-slate-400">

                    Category

                  </p>

                  <p className="font-semibold">

                    {provider.category}

                  </p>

                </div>

                <div className="mt-4">

                  <p className="text-xs uppercase text-slate-400">

                    Experience

                  </p>

                  <p>{provider.experience}</p>

                </div>

                <div className="mt-4 flex items-center gap-2 text-slate-500">

                  <FaMapMarkerAlt />

                  {provider.address}

                </div>

                <div className="mt-4">

                  <p className="text-xs uppercase text-slate-400">

                    Phone

                  </p>

                  <p>{provider.phone}</p>

                </div>

                <div className="mt-4">

                  <p className="text-xs uppercase text-slate-400">

                    Description

                  </p>

                  <p className="text-sm text-slate-600">

                    {provider.description}

                  </p>

                </div>

                <button
                  onClick={() => navigate(`/Bookings/${provider.id}`)}
                  className="w-full mt-6 py-3 rounded-xl bg-[#2E6F5E] text-white font-semibold hover:bg-[#25594c] transition"
                >
                  Book Service
                </button>

              </div>

            ))}

          </div>

        )}

      </main>

    </div>

  );

}
