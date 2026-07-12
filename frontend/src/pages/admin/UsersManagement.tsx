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
  FaSearch,
  FaEdit,
  FaTrash,
  FaBan,
  FaUnlock,
  FaShieldAlt,
} from "react-icons/fa";

export default function UsersManagement() {
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
      active: true,
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
    },
  ];

  const users = [
    {
      id: "001",
      name: "Ali Khan",
      email: "ali@gmail.com",
      role: "Customer",
      status: "Active",
      join: "12 July 2026",
    },
    {
      id: "002",
      name: "Sara Ahmed",
      email: "sara@gmail.com",
      role: "Customer",
      status: "Active",
      join: "10 July 2026",
    },
    {
      id: "003",
      name: "Usman Ali",
      email: "usman@gmail.com",
      role: "Customer",
      status: "Blocked",
      join: "05 July 2026",
    },
    {
      id: "004",
      name: "Ahmed Raza",
      email: "ahmed@gmail.com",
      role: "Provider",
      status: "Active",
      join: "01 July 2026",
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
          User Management
        </p>

        <h1 className="text-4xl font-black text-[#111C34] mt-2">
          Manage Users
        </h1>

        <p className="text-slate-500 mt-3">
          Admin control panel for managing all users.
        </p>

        <div
          className="
mt-8
bg-white
rounded-2xl
border
border-slate-200
p-6
"
        >
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-[#111C34]">All Users</h2>

            <div
              className="
flex
items-center
gap-2
bg-[#F3F4F7]
px-4
py-2
rounded-xl
"
            >
              <FaSearch className="text-slate-400" />

              <input
                placeholder="Search users..."
                className="bg-transparent outline-none text-sm"
              />
            </div>
          </div>

          <table className="w-full mt-6">
            <thead>
              <tr className="text-left text-slate-500 text-sm">
                <th className="pb-4">ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="
border-t
border-slate-100
text-sm
"
                >
                  <td className="py-4 font-bold">{user.id}</td>

                  <td>{user.name}</td>

                  <td>{user.email}</td>

                  <td>{user.role}</td>

                  <td>
                    <span
                      className={`
px-3
py-1
rounded-full
text-xs
font-bold

${
  user.status === "Active"
    ? "bg-[#2E6F5E]/10 text-[#2E6F5E]"
    : "bg-red-100 text-red-600"
}

`}
                    >
                      {user.status}
                    </span>
                  </td>

                  <td>{user.join}</td>

                  <td>
                    <div className="flex gap-2">
                      <button
                        className="
p-2
rounded-lg
bg-blue-50
text-blue-600
"
                        title="Edit"
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
                        title="Delete"
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
                        title="Block/Unblock"
                      >
                        {user.status === "Active" ? <FaBan /> : <FaUnlock />}
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
