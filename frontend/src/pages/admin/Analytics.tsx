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
  FaChartPie,
  FaArrowUp,
  FaExclamationTriangle,
} from "react-icons/fa";

export default function Analytics() {
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
  label: "Disputes",
  icon: FaExclamationTriangle,
  path: "/admin/disputes",
},
    {
      label: "Analytics",
      icon: FaChartLine,
      path: "/admin/analytics",
      active: true,
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

  const metrics = [
    {
      title: "Booking Growth",
      value: "+24%",
      icon: FaArrowUp,
    },

    {
      title: "Provider Retention",
      value: "87%",
      icon: FaUserTie,
    },

    {
      title: "Dispute Rate",
      value: "3.2%",
      icon: FaExclamationTriangle,
    },

    {
      title: "Active Users",
      value: "3,850",
      icon: FaUsers,
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
navItems.map(({label,icon:Icon,path,active})=>(

<button

key={label}

onClick={()=>navigate(path)}

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

${
active
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
          {metrics.map(({ title, value, icon: Icon }) => (
            <div
              key={title}
              className="
bg-white
rounded-2xl
border
border-slate-200
p-6
shadow-sm
"
            >
              <div
                className="
w-11
h-11
rounded-xl
bg-[#2E6F5E]/10
flex
items-center
justify-center
text-[#2E6F5E]
"
              >
                <Icon />
              </div>

              <p
                className="
text-slate-500
text-sm
mt-5
"
              >
                {title}
              </p>

              <h2
                className="
text-3xl
font-black
text-[#111C34]
"
              >
                {value}
              </h2>
            </div>
          ))}
        </div>

        {/* CHARTS */}

        <div
          className="
grid
grid-cols-1
lg:grid-cols-2
gap-6
mt-8
"
        >
          <div
            className="
bg-white
rounded-2xl
border
border-slate-200
p-8
"
          >
            <h2
              className="
font-bold
text-xl
text-[#111C34]
"
            >
              Booking Volume By Zone
            </h2>

            <div
              className="
mt-6
h-60
rounded-xl
bg-[#F3F4F7]
flex
items-center
justify-center
text-slate-400
"
            >
              Bar Chart Area
            </div>
          </div>

          <div
            className="
bg-white
rounded-2xl
border
border-slate-200
p-8
"
          >
            <h2
              className="
font-bold
text-xl
text-[#111C34]
"
            >
              Popular Services
            </h2>

            <div
              className="
mt-6
space-y-4
"
            >
              {["Home Repair", "Cleaning", "Tutoring", "Gardening"].map(
                (item) => (
                  <div
                    key={item}
                    className="
flex
justify-between
bg-[#F3F4F7]
p-4
rounded-xl
text-sm
"
                  >
                    <span>{item}</span>

                    <span className="font-bold text-[#2E6F5E]">85%</span>
                  </div>
                ),
              )}
            </div>
          </div>

          <div
            className="
bg-white
rounded-2xl
border
border-slate-200
p-8
"
          >
            <h2
              className="
font-bold
text-xl
text-[#111C34]
"
            >
              Provider Retention
            </h2>

            <div
              className="
mt-6
h-48
rounded-xl
bg-[#F3F4F7]
flex
items-center
justify-center
text-slate-400
"
            >
              Line Chart Area
            </div>
          </div>

          <div
            className="
bg-[#111C34]
rounded-2xl
p-8
text-white
"
          >
            <h2
              className="
text-xl
font-bold
"
            >
              AI Insights
            </h2>

            <p
              className="
text-slate-300
mt-4
leading-7
"
            >
              AI detected highest demand in Home Repair and Cleaning categories.
            </p>

            <div
              className="
mt-6
flex
items-center
gap-2
text-[#8FE3C7]
"
            >
              <FaChartPie />
              Smart Analytics
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
