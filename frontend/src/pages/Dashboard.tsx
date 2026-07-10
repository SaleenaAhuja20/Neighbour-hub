import { useEffect, useState } from "react";
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
} from "react-icons/fa";

import CommunityFeed from "../components/CommunityFeed";
import Notifications from "../components/Notifications";

export default function Dashboard() {

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [application, setApplication] = useState<any>(null);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };
  useEffect(() => {

  const fetchApplication = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await api.get(
        "/provider/my-application",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setApplication(response.data);

    } catch {

      setApplication(null);

    }

  };

  fetchApplication();

}, []);

  return (

    <div className="min-h-screen flex bg-[#f5f7fb]">

      {/* ================= SIDEBAR ================= */}

      <aside className="w-[270px] bg-[#0f1f45] text-white flex flex-col justify-between">

        <div>

          <div className="px-8 py-8 border-b border-white/10">

            <h1 className="text-3xl font-black">
              NeighbourHub
            </h1>

            <p className="text-slate-400 mt-2">
              Resident Portal
            </p>

          </div>

          <div className="mt-8 space-y-2 px-4">

            <button
              onClick={() => navigate("/dashboard")}
              className="sidebar-btn active"
            >
              <FaHome />
              Dashboard
            </button>

            <button
              onClick={() => navigate("/services")}
              className="sidebar-btn"
            >
              <FaSearch />
              Find Services
            </button>

            <button
              onClick={() => navigate("/bookings")}
              className="sidebar-btn"
            >
              <FaClipboardList />
              My Bookings
            </button>

            <button
              onClick={() => navigate("/messages")}
              className="sidebar-btn"
            >
              <FaComments />
              Messages
            </button>

            <button
              onClick={() => navigate("/notifications")}
              className="sidebar-btn"
            >
              <FaBell />
              Notifications
            </button>

            <button
              onClick={() => navigate("/profile")}
              className="sidebar-btn"
            >
              <FaUserCircle />
              Profile
            </button>

          </div>

        </div>

        <div className="p-5">

          <button
            onClick={logout}
            className="logout-btn"
          >
            <FaSignOutAlt />
            Logout
          </button>

        </div>
        

      </aside>
      

      {/* ================= MAIN ================= */}

      <main className="flex-1 p-10">

        {/* ================= TOP BAR ================= */}

        <div className="flex items-center justify-between">

          <div>

            <p className="uppercase tracking-[5px] text-indigo-500 text-xs font-bold">
              Resident Dashboard
            </p>

            <h1 className="text-5xl font-black text-slate-800 mt-2">

              Welcome back,

              <span className="text-indigo-600">

                {" "}

                {user.fullName || "Resident"}

              </span>

              👋

            </h1>

            <p className="mt-3 text-slate-500 text-lg">

              Manage your bookings, discover trusted providers and stay connected with your community.

            </p>

          </div>

          <div className="flex items-center gap-5">

            <div className="relative">

              <input
                placeholder="Search services..."
                className="w-[300px] rounded-2xl border border-slate-200 bg-white py-4 pl-12 pr-4 shadow-sm outline-none focus:border-indigo-500"
              />

              <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />

            </div>

            <button className="top-icon">

              <FaBell />

            </button>

            <div className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-md">

              <img
                src={`https://ui-avatars.com/api/?name=${user.fullName}&background=4f46e5&color=fff`}
                className="w-12 h-12 rounded-full"
              />

              <div>

                <h4 className="font-semibold text-slate-800">

                  {user.fullName}

                </h4>

                <p className="text-sm text-slate-500">

                  Resident

                </p>

              </div>

            </div>

          </div>

        </div>

        {/* ================= HERO ================= */}

        <div className="hero-dashboard mt-10">

          <div>

            <p className="uppercase tracking-[5px] text-cyan-200 text-xs font-bold">

              GOOD TO SEE YOU AGAIN

            </p>

            <h2 className="mt-4 text-5xl font-black">

              Hello, {user.fullName} 👋

            </h2>

            <p className="mt-6 max-w-xl text-lg leading-8 text-indigo-100">

              Find trusted service providers, book services,
              communicate with your neighbours and become
              a verified provider—all from one platform.

            </p>

            <div className="flex gap-4 mt-10">

              <button
                onClick={() => navigate("/services")}
                className="hero-btn"
              >
                Find Services
              </button>

             {!application && (
  <button
    onClick={() => navigate("/become-provider")}
    className="hero-btn-outline"
  >
    Become Provider
  </button>
)}

{application?.status === "PENDING" && (
  <button
    disabled
    className="hero-btn-outline opacity-60 cursor-not-allowed"
  >
    Application Pending
  </button>
)}

{application?.status === "APPROVED" && (
  <button
    onClick={() => navigate("/provider-dashboard")}
    className="hero-btn-outline"
  >
    Provider Dashboard
  </button>
)}

{application?.status === "REJECTED" && (
  <button
    onClick={() => navigate("/become-provider")}
    className="hero-btn-outline"
  >
    Apply Again
  </button>
)}

            </div>

          </div>

          <div className="hero-image">

            <FaHome className="text-7xl text-white" />

          </div>

        </div>

        {/* ================= QUICK ACTIONS ================= */}

        <div className="mt-10">

          <div className="flex items-center justify-between mb-6">

            <h2 className="text-3xl font-bold text-slate-800">

              Quick Actions

            </h2>

            <p className="text-slate-500">

              Everything you need in one place

            </p>

          </div>

          <div className="grid grid-cols-2 xl:grid-cols-4 gap-6">
                      {/* FIND SERVICES */}

          <div
            onClick={() => navigate("/services")}
            className="action-card"
          >
            <div className="action-icon bg-blue-100 text-blue-600">
              <FaSearch />
            </div>

            <h3>Find Services</h3>

            <p>
              Browse trusted service providers in your neighbourhood.
            </p>

          </div>

          {/* BOOKINGS */}

          <div
            onClick={() => navigate("/bookings")}
            className="action-card"
          >
            <div className="action-icon bg-green-100 text-green-600">
              <FaClipboardList />
            </div>

            <h3>My Bookings</h3>

            <p>
              Track all your current and previous bookings.
            </p>

          </div>

          {/* PROVIDER */}

          <div
            onClick={() => navigate("/become-provider")}
            className="action-card provider-action"
          >
            <div className="action-icon bg-white text-indigo-600">
              <FaUserCog />
            </div>

            <h3>Become Provider</h3>

            <p>
              Offer your own services and start earning.
            </p>

          </div>

          {/* COMMUNITY */}

          <div
            onClick={() => navigate("/community")}
            className="action-card"
          >
            <div className="action-icon bg-orange-100 text-orange-600">
              <FaComments />
            </div>

            <h3>Community</h3>

            <p>
              Connect with your neighbours and stay updated.
            </p>

          </div>

        </div>

      </div>

      {/* ================= MAIN GRID ================= */}

      <div className="grid grid-cols-3 gap-8 mt-10">

        {/* BOOKINGS */}

        <div className="col-span-2 white-card">

          <div className="flex justify-between items-center mb-6">

            <h2 className="section-title">

              Recent Bookings

            </h2>

            <button className="text-indigo-600 font-semibold">

              View All

            </button>

          </div>

          <div className="empty-state">

            <div className="empty-icon">

              📅

            </div>

            <h3>

              No bookings yet

            </h3>

            <p>

              Book a trusted local provider and your bookings will appear here.

            </p>

            <button
              onClick={() => navigate("/services")}
              className="primary-btn mt-6"
            >
              Explore Services
            </button>

          </div>

        </div>

        {/* PROFILE */}

        <div className="white-card">

          <div className="flex flex-col items-center">

            <img
              src={`https://ui-avatars.com/api/?name=${user.fullName}&background=4f46e5&color=fff`}
              className="w-28 h-28 rounded-full border-4 border-indigo-100"
            />

            <h2 className="mt-5 text-2xl font-bold">

              {user.fullName}

            </h2>

            <p className="text-slate-500">

              {user.email}

            </p>

            <div className="role-badge">

              Resident

            </div>

          </div>

          <div className="profile-divider"></div>

          <div className="space-y-5">

            <div className="profile-row">

              <span>Account Status</span>

              <span className="text-green-600 font-bold">

                Verified

              </span>

            </div>

            <div className="profile-row">

              <span>Role</span>

              <span>

                Resident

              </span>

            </div>

            <div className="profile-row">

              <span>Email</span>

              <span className="truncate">

                {user.email}

              </span>

            </div>

          </div>

          <button
            onClick={() => navigate("/profile")}
            className="secondary-btn mt-8"
          >
            Edit Profile
          </button>

        </div>

      </div>

      {/* ================= COMMUNITY ================= */}

      <div className="grid grid-cols-2 gap-8 mt-8">

        <CommunityFeed />

        <Notifications />

      </div>

      </main>

    </div>

  );

}