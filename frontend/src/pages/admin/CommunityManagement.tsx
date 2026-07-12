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
  FaTrash,
  FaFlag,
  FaShieldAlt,
} from "react-icons/fa";

export default function CommunityManagement() {
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
      active: true,
    },
    {
      label: "Settings",
      icon: FaCog,
      path: "/admin/settings",
    },
  ];

  const posts = [
    {
      id: 1,
      user: "Ali Khan",
      message: "Looking for a plumber near my area.",
      type: "Post",
      status: "Approved",
    },
    {
      id: 2,
      user: "Sara Ahmed",
      message: "Cleaning service was amazing!",
      type: "Review",
      status: "Approved",
    },
    {
      id: 3,
      user: "Usman Ali",
      message: "Reported inappropriate content.",
      type: "Report",
      status: "Pending",
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
          Community Management
        </p>

        <h1
          className="
text-4xl
font-black
text-[#111C34]
mt-2
"
        >
          Manage Community
        </h1>

        <p className="text-slate-500 mt-3">
          Monitor posts, reviews and reported content.
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
          <div className="bg-white rounded-2xl border p-6">
            <p className="text-slate-500">Total Posts</p>

            <h2 className="text-3xl font-black text-[#111C34] mt-2">2450</h2>
          </div>

          <div className="bg-white rounded-2xl border p-6">
            <p className="text-slate-500">Pending Reports</p>

            <h2 className="text-3xl font-black text-red-500 mt-2">24</h2>
          </div>

          <div className="bg-white rounded-2xl border p-6">
            <p className="text-slate-500">Active Members</p>

            <h2 className="text-3xl font-black text-[#111C34] mt-2">3800</h2>
          </div>
        </div>

        <div
          className="
mt-8
bg-white
rounded-2xl
border
p-6
"
        >
          <h2 className="text-xl font-bold text-[#111C34]">
            Community Activity
          </h2>

          <table className="w-full mt-6">
            <thead>
              <tr className="text-left text-slate-500 text-sm">
                <th>User</th>
                <th>Content</th>
                <th>Type</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {posts.map((post) => (
                <tr key={post.id} className="border-t text-sm">
                  <td className="py-4 font-bold">{post.user}</td>

                  <td>{post.message}</td>

                  <td>{post.type}</td>

                  <td>
                    <span
                      className="
px-3
py-1
rounded-full
bg-[#2E6F5E]/10
text-[#2E6F5E]
text-xs
font-bold
"
                    >
                      {post.status}
                    </span>
                  </td>

                  <td>
                    <div className="flex gap-2">
                      <button
                        className="
p-2
rounded-lg
bg-green-50
text-green-600
"
                      >
                        <FaCheckCircle />
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
                        <FaFlag />
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
