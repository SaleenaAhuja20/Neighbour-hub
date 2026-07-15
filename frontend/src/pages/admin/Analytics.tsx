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
  FaChartPie,
} from "react-icons/fa";

export default function Analytics() {
  const navigate = useNavigate();

  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await api.get("/admin/analytics");

        setAnalytics(response.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-bold">
        Loading Analytics...
      </div>
    );
  }

  const navItems = [
    {
      label: "Dashboard",
      icon: FaHome,
      path: "/admin/dashboard",
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
      icon: FaShieldAlt,
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
      active: true,
    },
  ];

  const metrics = [
    {
      title: "Total Users",
      value: analytics.totalUsers,
      icon: FaUsers,
    },
    {
      title: "Residents",
      value: analytics.totalResidents,
      icon: FaHome,
    },
    {
      title: "Providers",
      value: analytics.totalProviders,
      icon: FaUserTie,
    },
    {
      title: "Bookings",
      value: analytics.totalBookings,
      icon: FaClipboardList,
    },
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


            <p className="text-slate-400 text-sm mt-2">
              Admin Portal
            </p>


          </div>



          <nav className="mt-6 px-3 space-y-1">

            {
              navItems.map(({ label, icon: Icon, path, active }) => (

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

${active
                      ?
                      "bg-white/10 text-white"
                      :
                      "text-slate-300 hover:bg-white/5"
                    }

`}

                >

                  <Icon
                    className={
                      active
                        ?
                        "text-[#8FE3C7]"
                        :
                        "text-slate-400"
                    }
                  />


                  {label}


                </button>

              ))

            }

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
        <div>
          <p
            className="
text-xs
uppercase
tracking-widest
text-[#2E6F5E]
font-bold
"
          >
            Platform Analytics
          </p>

          <h1
            className="
text-4xl
font-black
text-[#111C34]
mt-2
"
          >
            Analytics Overview
          </h1>

          <p
            className="
text-slate-500
mt-3
"
          >
            Track bookings, users, providers and platform performance.
          </p>
        </div>

{/* METRICS */}

<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mt-8">
  {metrics.map(({ title, value, icon: Icon }) => (
    <div
      key={title}
      className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm"
    >
      <div className="w-11 h-11 rounded-xl bg-[#2E6F5E]/10 flex items-center justify-center text-[#2E6F5E]">
        <Icon />
      </div>

      <p className="text-slate-500 text-sm mt-5">
        {title}
      </p>

      <h2 className="text-3xl font-black text-[#111C34]">
        {value}
      </h2>
    </div>
  ))}
</div>

{/* SECOND ROW */}

<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">

  {/* Booking Status */}

  <div className="bg-white rounded-2xl border border-slate-200 p-8">

    <h2 className="font-bold text-xl text-[#111C34]">
      Booking Status
    </h2>

    <div className="mt-6 space-y-4">

      <div className="flex justify-between bg-[#F3F4F7] p-4 rounded-xl">
        <span>Pending</span>

        <span className="font-bold text-yellow-600">
          {analytics.pendingBookings}
        </span>
      </div>

      <div className="flex justify-between bg-[#F3F4F7] p-4 rounded-xl">
        <span>Accepted</span>

        <span className="font-bold text-blue-600">
          {analytics.acceptedBookings}
        </span>
      </div>

      <div className="flex justify-between bg-[#F3F4F7] p-4 rounded-xl">
        <span>Completed</span>

        <span className="font-bold text-green-600">
          {analytics.completedBookings}
        </span>
      </div>

      <div className="flex justify-between bg-[#F3F4F7] p-4 rounded-xl">
        <span>Cancelled</span>

        <span className="font-bold text-red-600">
          {analytics.cancelledBookings}
        </span>
      </div>

    </div>

  </div>

  {/* Popular Services */}

  <div className="bg-white rounded-2xl border border-slate-200 p-8">

    <h2 className="font-bold text-xl text-[#111C34]">
      Popular Services
    </h2>

    <div className="mt-6 space-y-4">

      {analytics.categories?.length > 0 ? (

        analytics.categories.map((item: any) => (

          <div
            key={item.category}
            className="flex justify-between bg-[#F3F4F7] p-4 rounded-xl"
          >
            <span>{item.category}</span>

            <span className="font-bold text-[#2E6F5E]">
              {item._count.category}
            </span>

          </div>

        ))

      ) : (

        <div className="text-slate-500">
          No service data found.
        </div>

      )}

    </div>

  </div>

</div>

{/* THIRD ROW */}

<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">

  {/* User Statistics */}

  <div className="bg-white rounded-2xl border border-slate-200 p-8">

    <h2 className="font-bold text-xl text-[#111C34] mb-6">
      User Statistics
    </h2>

    <div className="space-y-4">

      <div className="flex justify-between">
        <span>Total Users</span>

        <span className="font-bold">
          {analytics.totalUsers}
        </span>
      </div>

      <div className="flex justify-between">
        <span>Residents</span>

        <span className="font-bold">
          {analytics.totalResidents}
        </span>
      </div>

      <div className="flex justify-between">
        <span>Approved Providers</span>

        <span className="font-bold">
          {analytics.totalProviders}
        </span>
      </div>

      <div className="flex justify-between">
        <span>Pending Providers</span>

        <span className="font-bold text-orange-600">
          {analytics.pendingProviders}
        </span>
      </div>

      <div className="flex justify-between">
        <span>Rejected Providers</span>

        <span className="font-bold text-red-600">
          {analytics.rejectedProviders}
        </span>
      </div>

    </div>

  </div>

          {/* AI INSIGHTS */}

  <div
    className="
      bg-[#111C34]
      rounded-2xl
      p-8
      text-white
    "
  >
    <h2 className="text-xl font-bold">
      Platform Summary
    </h2>

    <div className="mt-6 space-y-4 text-slate-300">

      <div className="flex justify-between">
        <span>Total Bookings</span>
        <span className="text-[#8FE3C7] font-bold">
          {analytics.totalBookings}
        </span>
      </div>

      <div className="flex justify-between">
        <span>Completed</span>
        <span className="text-green-400 font-bold">
          {analytics.completedBookings}
        </span>
      </div>

      <div className="flex justify-between">
        <span>Pending</span>
        <span className="text-yellow-400 font-bold">
          {analytics.pendingBookings}
        </span>
      </div>

      <div className="flex justify-between">
        <span>Cancelled</span>
        <span className="text-red-400 font-bold">
          {analytics.cancelledBookings}
        </span>
      </div>

      <div className="flex justify-between">
        <span>Approved Providers</span>
        <span className="text-[#8FE3C7] font-bold">
          {analytics.totalProviders}
        </span>
      </div>

      <div className="flex justify-between">
        <span>Pending Requests</span>
        <span className="text-orange-400 font-bold">
          {analytics.pendingProviders}
        </span>
      </div>

    </div>

    <div className="mt-8 flex items-center gap-2 text-[#8FE3C7] font-semibold">
      <FaChartPie />
      Live Platform Statistics
    </div>
  </div>

</div>

</main>
</div>
);
}