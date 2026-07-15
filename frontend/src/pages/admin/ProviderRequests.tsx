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
  FaCheckCircle,
  FaTimes,
  FaShieldAlt,
} from "react-icons/fa";

export default function ProviderRequests() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
  };

  const approve = async (id: string) => {
    try {
      await api.patch(`/provider/approve/${id}`);

      alert("Application Approved");

      fetchRequests();
    } catch (err) {
      console.log(err);
    }
  };

  const reject = async (id: string) => {
    try {
      await api.patch(`/provider/reject/${id}`);

      alert("Application Rejected");

      fetchRequests();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await api.get("/provider/applications");

      setRequests(res.data);
    } catch (err) {
      console.log(err);
    }
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
      active: true,
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

  const [requests, setRequests] = useState<any[]>([]);
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
        <p
          className="
text-xs
uppercase
tracking-widest
font-bold
text-[#2E6F5E]
"
        >
          Provider Requests
        </p>

        <h1
          className="
text-4xl
font-black
text-[#111C34]
mt-2
"
        >
          Manage Provider Applications
        </h1>

        <p className="text-slate-500 mt-3">
          Review and approve new service providers.
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
            <p className="text-slate-500">Pending Requests</p>

            <h2 className="text-3xl font-black mt-2">{requests.filter((r) => r.status === "PENDING").length}</h2>
          </div>

          <div className="bg-white rounded-2xl border p-6">
            <p className="text-slate-500">Approved Providers</p>

            <h2 className="text-3xl font-black text-[#2E6F5E] mt-2">{requests.filter((r) => r.status === "APPROVED").length}</h2>
          </div>

          <div className="bg-white rounded-2xl border p-6">
            <p className="text-slate-500">Rejected</p>

            <h2 className="text-3xl font-black text-red-500 mt-2">{requests.filter((r) => r.status === "REJECTED").length}</h2>
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
            Provider Applications
          </h2>

          <table className="w-full mt-6">
            <thead>
              <tr className="text-left text-slate-500 text-sm">
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Service</th>
                <th>Experience</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {requests.map((item) => (
                <tr key={item.id.slice(0, 8)} className="border-t text-sm">
                  <td className="py-4 font-bold">{item.id}</td>

                  <td>{item.user.fullName}</td>

                  <td>{item.user.email}</td>

                  <td>{item.serviceTitle}</td>

                  <td>{item.experience}</td>

                  <td>
                    <span
                      className={`
px-3
py-1
rounded-full
text-xs
font-bold

${item.status === "APPROVED"
                          ? "bg-green-100 text-green-700"
                          : item.status === "REJECTED"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                        }
`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td>
                    {item.status === "PENDING" ? (

                      <div className="flex gap-2">

                        <button
                          onClick={() => approve(item.id)}
                          className="
px-4
py-2
rounded-lg
bg-[#2E6F5E]
text-white
text-xs
font-bold
"
                        >
                          Approve
                        </button>

                        <button
                          onClick={() => reject(item.id)}
                          className="
p-2
rounded-lg
bg-red-50
hover:bg-red-100
text-red-600
"
                        >
                          <FaTimes />
                        </button>

                      </div>

                    ) : (

                      <span className="text-slate-400 text-sm">
                        No Action
                      </span>

                    )}
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