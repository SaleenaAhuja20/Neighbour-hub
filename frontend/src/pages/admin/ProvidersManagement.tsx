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
  FaEdit,
  FaTrash,
  FaBan,
  FaShieldAlt,
} from "react-icons/fa";

export default function ProvidersManagement() {
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
      active: true,
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
    },
  ];

  const providers = [
    {
      id: "#P001",
      name: "Ahmed Services",
      owner: "Ahmed Raza",
      service: "Home Repair",
      bookings: 245,
      status: "Active",
    },
    {
      id: "#P002",
      name: "Clean Pro",
      owner: "Sara Ahmed",
      service: "Cleaning",
      bookings: 180,
      status: "Active",
    },
    {
      id: "#P003",
      name: "Green Care",
      owner: "Usman Ali",
      service: "Gardening",
      bookings: 90,
      status: "Blocked",
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
        <p className="text-xs uppercase tracking-widest font-bold text-[#2E6F5E]">
          Provider Management
        </p>

        <h1 className="text-4xl font-black text-[#111C34] mt-2">
          Manage Providers
        </h1>

        <p className="text-slate-500 mt-3">
          Control and monitor all registered service providers.
        </p>

        <div
          className="
mt-8
grid
grid-cols-1
md:grid-cols-3
gap-5
"
        >
          <div className="bg-white border rounded-2xl p-6">
            <p className="text-slate-500">Total Providers</p>

            <h2 className="text-3xl font-black mt-2">850</h2>
          </div>

          <div className="bg-white border rounded-2xl p-6">
            <p className="text-slate-500">Active Providers</p>

            <h2 className="text-3xl font-black text-[#2E6F5E] mt-2">820</h2>
          </div>

          <div className="bg-white border rounded-2xl p-6">
            <p className="text-slate-500">Blocked Providers</p>

            <h2 className="text-3xl font-black text-red-500 mt-2">30</h2>
          </div>
        </div>

        <div
          className="
mt-8
bg-white
border
rounded-2xl
p-6
"
        >
          <h2 className="text-xl font-bold text-[#111C34]">All Providers</h2>

          <table className="w-full mt-6">
            <thead>
              <tr className="text-left text-slate-500 text-sm">
                <th>ID</th>
                <th>Provider</th>
                <th>Owner</th>
                <th>Service</th>
                <th>Bookings</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {providers.map((provider) => (
                <tr key={provider.id} className="border-t text-sm">
                  <td className="py-4 font-bold">{provider.id}</td>

                  <td>{provider.name}</td>

                  <td>{provider.owner}</td>

                  <td>{provider.service}</td>

                  <td>{provider.bookings}</td>

                  <td>
                    <span
                      className={`
px-3
py-1
rounded-full
text-xs
font-bold

${
  provider.status === "Active"
    ? "bg-green-100 text-green-600"
    : "bg-red-100 text-red-600"
}

`}
                    >
                      {provider.status}
                    </span>
                  </td>

                  <td>
                    <div className="flex gap-2">
                      <button
                        className="
p-2
rounded-lg
bg-blue-50
text-blue-600
"
                      >
                        <FaEdit />
                      </button>

                      <button
                        className="
p-2
rounded-lg
bg-red-50
text-red-600
"
                      >
                        <FaTrash />
                      </button>

                      <button
                        className="
p-2
rounded-lg
bg-yellow-50
text-yellow-600
"
                      >
                        <FaBan />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
