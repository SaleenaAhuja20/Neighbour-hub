import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services/api";

import {
  FaHome,
  FaUsers,
  FaUserTie,
  FaClipboardList,
  FaChartLine,
  FaBell,
  FaCog,
  FaSignOutAlt,
  FaCrown,
  FaShieldAlt,
  FaCheckCircle,
} from "react-icons/fa";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [dashboard, setDashboard] = useState<any>({
    totalUsers: 0,
    totalProviders: 0,
    pendingRequests: 0,
    latestUsers: [],
    pendingApplications: [],
  });

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
  };
  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await api.get("/admin/dashboard");

      setDashboard(res.data);

    } catch (err) {
      console.log(err);
    }
  };
  const navItems = [
    {
      label: "Dashboard",
      icon: FaHome,
      path: "/admin/dashboard",
      active: true,
    },
    {
      label: "Users",
      icon: FaUsers,
      path: "/admin/users",
    },
    {
      label: "Providers",
      icon: FaUserTie,
      path: "/admin/providers",
    },
    {
      label: "Provider Requests",
      icon: FaCheckCircle,
      path: "/admin/provider-requests",
    },
    {
      label: "Bookings",
      icon: FaClipboardList,
      path: "/admin/bookings",
    },
    {
      label: "Analytics",
      icon: FaChartLine,
      path: "/admin/analytics",
    },
  ];

const stats = [
  {
    title: "Total Users",
    value: dashboard.totalUsers,
    icon: FaUsers,
  },
  {
    title: "Providers",
    value: dashboard.totalProviders,
    icon: FaUserTie,
  },
  {
    title: "Pending Requests",
    value: dashboard.pendingRequests,
    icon: FaCheckCircle,
  },
  {
    title: "Bookings",
    value: 0,
    icon: FaClipboardList,
  },
];

  const activities = [
    "New provider registration request received",

    "Booking #2451 completed successfully",

    "New user joined Greenway Zone",

    "Dispute resolved by moderator",
  ];

  return (
    <div className="min-h-screen flex bg-[#F3F4F7]">
      {/* SIDEBAR */}

      <aside
        className="
fixed
left-0
top-0
h-screen
w-[272px]
bg-[#111C34]
text-white
flex
flex-col
justify-between
z-50
overflow-y-auto
"
      >
        <div>
          <div className="px-7 py-8 border-b border-white/10">
            <div className="flex items-center gap-3">
              <span
                className="
w-10
h-10
rounded-xl
bg-[#2E6F5E]
flex
items-center
justify-center
"
              >
                <FaCrown className="text-[#8FE3C7]" />
              </span>

              <div>
                <p
                  className="
text-xs
uppercase
tracking-widest
text-[#8FE3C7]
font-bold
"
                >
                  Premium
                </p>

                <h1
                  className="
text-2xl
font-black
"
                >
                  NeighbourHub
                </h1>
              </div>
            </div>

            <p className="text-slate-400 text-sm mt-2">Admin Portal</p>
          </div>

          <nav className="mt-6 px-3 space-y-1">
            {navItems.map(({ label, icon: Icon, path, active }) => (
              <button
                key={label}
                onClick={() => navigate(path)}
                className={`
w-full
flex
items-center
gap-3
px-4
py-3
rounded-xl
text-sm
font-medium
transition

${active ? "bg-white/10 text-white" : "text-slate-300 hover:bg-white/5"}

`}
              >
                <Icon
                  className={active ? "text-[#8FE3C7]" : "text-slate-400"}
                />

                {label}
              </button>
            ))}
          </nav>
        </div>

        {/* BOTTOM AREA */}

        <div className="p-4 mt-auto">
          <div
            className="
bg-white/5
border
border-white/10
rounded-xl
p-4
mb-3
"
          >
            <div
              className="
flex
items-center
gap-2
text-[#8FE3C7]
text-xs
font-bold
"
            >
              <FaShieldAlt />
              ADMIN ACCESS
            </div>

            <p
              className="
text-slate-400
text-xs
mt-2
"
            >
              Full platform control enabled.
            </p>
          </div>

          <button
            onClick={logout}
            className="
w-full
py-3
rounded-xl
bg-white/5
hover:bg-red-500/20
flex
items-center
justify-center
gap-2
text-sm
transition
"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </aside>

      {/* MAIN */}

      <main
        className="
flex-1
ml-[272px]
px-10
py-9
"
      >
        {/* HEADER */}

        <div>
          <p
            className="
text-xs
uppercase
tracking-widest
font-bold
text-[#2E6F5E]
"
          >
            Admin Dashboard
          </p>

          <h1
            className="
text-4xl
font-black
text-[#111C34]
mt-2
"
          >
            Welcome back, Admin 👋
          </h1>

          <p
            className="
text-slate-500
mt-3
"
          >
            Monitor users, providers, bookings and platform activity.
          </p>
        </div>

        {/* STATS */}

        <div
          className="
grid
grid-cols-1
md:grid-cols-2
xl:grid-cols-4
gap-5
mt-8
"
        >
          {stats.map(({ title, value, icon: Icon }) => (
            <div
              key={title}
              className="
bg-white
border
border-slate-200
rounded-2xl
p-6
shadow-sm
"
            >
              <div
                className="
w-12
h-12
rounded-xl
bg-[#2E6F5E]/10
flex
items-center
justify-center
text-[#2E6F5E]
text-xl
"
              >
                <Icon />
              </div>

              <h3
                className="
text-slate-500
text-sm
mt-5
"
              >
                {title}
              </h3>

              <p
                className="
text-3xl
font-black
text-[#111C34]
mt-1
"
              >
                {value}
              </p>
            </div>
          ))}
        </div>

        {/* LOWER GRID */}

        <div
          className="
grid
grid-cols-1
lg:grid-cols-3
gap-6
mt-8
"
        >
          {/* CHART AREA */}

          <div
            className="
lg:col-span-2
bg-white
rounded-2xl
border
border-slate-200
p-8
"
          >
            <h2
              className="
text-xl
font-bold
text-[#111C34]
"
            >
              Platform Analytics
            </h2>

            <div
              className="
mt-6
h-56
rounded-xl
bg-[#F3F4F7]
flex
items-center
justify-center
text-slate-400
"
            >
              Chart Area
            </div>
          </div>

          {/* REQUESTS */}

          <div
            className="
bg-[#111C34]
rounded-2xl
p-8
text-white
"
          >
            <div
              className="
flex
items-center
gap-2
text-[#8FE3C7]
"
            >
              <FaShieldAlt />
              Pending Requests
            </div>

            <h2
              className="
text-5xl
font-black
mt-5
"
            >
             {dashboard.pendingRequests}
            </h2>

            <p
              className="
text-slate-400
mt-2
"
            >
              Provider approvals waiting
            </p>

            <button
              onClick={() => navigate("/admin/provider-requests")}
              className="
mt-6
bg-[#2E6F5E]
px-5
py-3
rounded-xl
text-sm
font-semibold
"
            >
              Review Requests
            </button>
          </div>
        </div>

{/* LATEST USERS */}

<div className="mt-8 bg-white rounded-2xl border border-slate-200 p-8">

  <h2 className="text-xl font-bold text-[#111C34]">
    Latest Users
  </h2>

  <div className="mt-5 space-y-4">

    {dashboard.latestUsers.map((user: any) => (

      <div
        key={user.id}
        className="flex justify-between items-center p-4 rounded-xl bg-[#F3F4F7]"
      >

        <div>

          <h3 className="font-semibold">
            {user.fullName}
          </h3>

          <p className="text-sm text-slate-500">
            {user.email}
          </p>

        </div>

        <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-semibold">
          {user.role}
        </span>

      </div>

    ))}

  </div>

</div>
      </main>
    </div>
  );
}
