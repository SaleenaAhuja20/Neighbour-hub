import { useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaCalendarCheck,
  FaComments,
  FaStar,
  FaTools,
  FaClipboardList,
  FaMoneyBill,
  FaChartLine
} from "react-icons/fa";


export default function Dashboard() {

  const navigate = useNavigate();


  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );


  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");

  };



  const isProvider = user.role === "PROVIDER";



  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100">


      {/* NAVBAR */}

      <nav className="bg-[#0f1f45] text-white px-10 py-5 flex justify-between items-center shadow-lg">


        <h1 className="text-3xl font-black">
          NeighbourHub
        </h1>


        <div className="flex items-center gap-6">


          <div className="text-right">

            <p className="font-semibold">
              {user.fullName}
            </p>

            <p className="text-xs text-cyan-300">
              {user.role}
            </p>

          </div>


          <button
            onClick={logout}
            className="bg-red-500 px-4 py-2 rounded-xl"
          >
            Logout
          </button>


        </div>


      </nav>





      {/* CONTENT */}

      <div className="p-10">


        <h2 className="text-4xl font-black text-slate-800">

          Welcome back, {user.fullName} 👋

        </h2>


        <p className="mt-2 text-gray-600">

          Manage your NeighbourHub activities from here.

        </p>





        {
          !isProvider ?

          (

          /* ================= RESIDENT DASHBOARD ================= */


          <div className="mt-10 space-y-10">



            {/* Become Provider */}

            <div className="bg-[#0f1f45] rounded-3xl p-8 text-white flex justify-between items-center">


              <div>

                <h3 className="text-3xl font-bold">
                  Have a skill to share?
                </h3>


                <p className="mt-2 text-slate-300">

                  Become a service provider and help your neighbours.

                </p>

              </div>



              <button
                className="bg-cyan-400 text-black px-6 py-3 rounded-xl font-bold"
              >

                Become Provider

              </button>


            </div>





            {/* Quick Actions */}


            <div className="grid md:grid-cols-4 gap-6">


              <DashboardCard
                icon={<FaSearch />}
                title="Find Services"
                text="Discover trusted providers"
              />


              <DashboardCard
                icon={<FaCalendarCheck />}
                title="My Requests"
                text="Track your bookings"
              />


              <DashboardCard
                icon={<FaComments />}
                title="Messages"
                text="Chat with providers"
              />


              <DashboardCard
                icon={<FaStar />}
                title="Reviews"
                text="Manage your ratings"
              />


            </div>





            {/* Recommendations */}


            <div className="bg-white rounded-3xl p-8 shadow">


              <h3 className="text-2xl font-bold text-slate-800">

                Recommended Providers 🤖

              </h3>


              <div className="mt-6 grid md:grid-cols-2 gap-5">


                <ProviderCard
                  name="Ahmed Khan"
                  service="Plumber"
                  match="98%"
                />


                <ProviderCard
                  name="Sara Services"
                  service="Cleaning"
                  match="95%"
                />


              </div>


            </div>



          </div>


          )



          :

          (


          /* ================= PROVIDER DASHBOARD ================= */


          <div className="mt-10 space-y-10">



            <div className="grid md:grid-cols-4 gap-6">


              <DashboardCard
                icon={<FaTools />}
                title="Services"
                text="Manage your services"
              />


              <DashboardCard
                icon={<FaClipboardList />}
                title="Requests"
                text="New booking requests"
              />


              <DashboardCard
                icon={<FaMoneyBill />}
                title="Earnings"
                text="Track income"
              />


              <DashboardCard
                icon={<FaChartLine />}
                title="Rating"
                text="4.8 ⭐"
              />


            </div>





            <div className="bg-white rounded-3xl shadow p-8">


              <h3 className="text-2xl font-bold">
                Recent Requests
              </h3>


              <div className="mt-5 space-y-4">


                <div className="p-5 bg-slate-100 rounded-xl">

                  AC Repair Request

                  <span className="float-right text-green-600">
                    Pending
                  </span>

                </div>



                <div className="p-5 bg-slate-100 rounded-xl">

                  Plumbing Service

                  <span className="float-right text-blue-600">
                    Completed
                  </span>

                </div>


              </div>


            </div>



          </div>


          )

        }



      </div>


    </div>

  );
}





function DashboardCard(
{
 icon,
 title,
 text
}:any
){

return (

<div className="bg-white rounded-3xl p-6 shadow hover:shadow-xl transition">


<div className="text-3xl text-indigo-600">

{icon}

</div>


<h3 className="mt-4 text-xl font-bold">

{title}

</h3>


<p className="text-gray-500 mt-2">

{text}

</p>


</div>

)

}





function ProviderCard(
{
name,
service,
match
}:any
){

return (

<div className="border rounded-2xl p-5">


<h4 className="text-xl font-bold">
{name}
</h4>


<p className="text-gray-500">
{service}
</p>


<p className="mt-3 text-cyan-600 font-bold">
{match} Match
</p>


<button className="mt-4 bg-[#0f1f45] text-white px-5 py-2 rounded-lg">

View Profile

</button>


</div>

)

}