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
  FaCheckCircle,
  FaSave,
  FaLock,
  FaShieldAlt,
} from "react-icons/fa";

export default function Settings() {
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
      icon: FaCheckCircle,
      path: "/admin/provider-requests",
    },
    {
      label: "Bookings",
      icon: FaClipboardList,
      path: "/admin/bookings",
    },
    {
      label: "ZoneConfiguratio",
      icon: FaShieldAlt,
      path: "/admin/zone-configuration",
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
      active: true,
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
        <p
          className="
text-xs
uppercase
tracking-widest
font-bold
text-[#2E6F5E]
"
        >
          System Settings
        </p>

        <h1
          className="
text-4xl
font-black
text-[#111C34]
mt-2
"
        >
          Admin Settings
        </h1>

        <p className="text-slate-500 mt-3">
          Manage platform configuration and admin preferences.
        </p>

        <div
          className="
mt-8
grid
grid-cols-1
lg:grid-cols-2
gap-6
"
        >
          {/* PROFILE */}

          <div
            className="
bg-white
border
rounded-2xl
p-7
"
          >
            <h2 className="text-xl font-bold text-[#111C34]">Admin Profile</h2>

            <div className="mt-5 space-y-4">
              <input
                value="Admin"
                readOnly
                className="
w-full
border
rounded-xl
px-4
py-3
outline-none
"
              />

              <input
                value="admin@neighbourhub.com"
                readOnly
                className="
w-full
border
rounded-xl
px-4
py-3
outline-none
"
              />
            </div>
          </div>

          {/* SECURITY */}

          <div
            className="
bg-white
border
rounded-2xl
p-7
"
          >
            <div className="flex items-center gap-2">
              <FaLock className="text-[#2E6F5E]" />

              <h2 className="text-xl font-bold">Security</h2>
            </div>

            <div className="mt-5 space-y-4">
              <button
                className="
w-full
text-left
border
rounded-xl
px-4
py-3
"
              >
                Change Password
              </button>

              <button
                className="
w-full
text-left
border
rounded-xl
px-4
py-3
"
              >
                Two Factor Authentication
              </button>
            </div>
          </div>

          {/* PLATFORM */}

          <div
            className="
bg-white
border
rounded-2xl
p-7
"
          >
            <h2 className="text-xl font-bold">Platform Settings</h2>

            <div className="mt-5 space-y-4">
              <label className="flex justify-between">
                <span>Maintenance Mode</span>

                <input type="checkbox" />
              </label>

              <label className="flex justify-between">
                <span>Email Notifications</span>

                <input type="checkbox" defaultChecked />
              </label>
            </div>
          </div>

          {/* SAVE */}

          <div
            className="
bg-[#111C34]
rounded-2xl
p-7
text-white
"
          >
            <h2 className="text-xl font-bold">Save Changes</h2>

            <p className="text-slate-400 mt-2">
              Update your admin configuration.
            </p>

            <button
              className="
mt-6
bg-[#2E6F5E]
px-6
py-3
rounded-xl
flex
items-center
gap-2
font-semibold
"
            >
              <FaSave />
              Save Settings
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
