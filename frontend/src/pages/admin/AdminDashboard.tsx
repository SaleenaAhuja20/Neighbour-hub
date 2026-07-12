import { useNavigate } from "react-router-dom";

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
  FaExclamationTriangle,
  FaCheckCircle,
} from "react-icons/fa";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
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
      label: "Disputes",
      icon: FaExclamationTriangle,
      path: "/admin/disputes",
    },
    {
      label: "Analytics",
      icon: FaChartLine,
      path: "/admin/analytics",
    },
    {
      label: "Community",
      icon: FaBell,
      path: "/admin/community",
    },
    {
      label: "Settings",
      icon: FaCog,
      path: "/admin/settings",
    },
  ];

  const stats = [
    {
      title: "Total Users",
      value: "5,000",
      icon: FaUsers,
    },

    {
      title: "Total Providers",
      value: "850",
      icon: FaUserTie,
    },

    {
      title: "Total Bookings",
      value: "12,450",
      icon: FaClipboardList,
    },

    {
      title: "Revenue",
      value: "Rs. 2.4M",
      icon: FaChartLine,
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
              <FaExclamationTriangle />
              Pending Requests
            </div>

            <h2
              className="
text-5xl
font-black
mt-5
"
            >
              24
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

        {/* ACTIVITY */}

        <div
          className="
mt-8
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
            Recent Activity
          </h2>

          <div
            className="
mt-5
space-y-4
"
          >
            {activities.map((item, index) => (
              <div
                key={index}
                className="
flex
items-center
gap-3
p-4
rounded-xl
bg-[#F3F4F7]
text-sm
text-slate-600
"
              >
                <FaCheckCircle className="text-[#2E6F5E]" />

                {item}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
