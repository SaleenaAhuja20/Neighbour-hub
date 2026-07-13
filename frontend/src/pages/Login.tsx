import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useState, useEffect } from "react";
import api from "../services/api";

export default function Login() {

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (!token) return;

    if (user.role === "ADMIN") {
      navigate("/admin/dashboard");
    } else if (user.role === "PROVIDER") {
      navigate("/provider-dashboard");
    } else {
      navigate("/dashboard");
    }
  }, [navigate]);

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };



  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();


    try {

      const response = await api.post(
        "/auth/login",
        {
          email: formData.email,
          password: formData.password
        }
      );


      console.log(response.data);


      localStorage.setItem(
        "token",
        response.data.access_token
      );
      // Save logged-in user details
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      alert("Login successful");

      if (response.data.user.role === "ADMIN") {
        navigate("/admin/dashboard");
      }
      else if (response.data.user.role === "PROVIDER") {
        navigate("/provider-dashboard");
      }
      else {
        navigate("/dashboard");
      }


    } catch (error: any) {
      console.log(error.response?.data);

      if (
        error.response?.data?.message ===
        "Your account has been blocked. Please contact the administrator."
      ) {
        alert("❌ Your account has been blocked. Please contact the administrator.");
      } else {
        alert(
          error.response?.data?.message ||
          "Invalid email or password"
        );
      }
    }
  };


  return (
    <div className="min-h-screen flex overflow-hidden">

      {/* LEFT SIDE */}

      <div className="hidden lg:flex w-[58%] relative bg-[#0f1f45] text-white overflow-hidden">

        <div className="blueprint-grid"></div>


        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1000 1000"
        >
          <path
            d="M120 220 Q260 180 330 320 T560 420 T800 700"
            fill="none"
            stroke="rgba(255,255,255,.15)"
            strokeWidth="3"
            strokeDasharray="12 10"
          />
        </svg>


        <div className="house h1"></div>
        <div className="house h2"></div>
        <div className="house h3"></div>
        <div className="house h4"></div>
        <div className="house h5"></div>


        <div className="radar"></div>



        <div className="relative z-20 px-16 py-16 max-w-xl">


          <p className="tracking-[8px] uppercase text-cyan-300 text-[11px] font-semibold">
            TRUSTED NEIGHBOURHOOD SERVICES
          </p>


          <h1 className="mt-4 text-6xl font-extrabold leading-none tracking-tight text-white">
            NeighbourHub
          </h1>


          <p className="mt-6 max-w-md text-lg leading-8 text-slate-300">
            Find trusted local service providers, connect with verified
            neighbours, and discover community services powered by
            intelligent recommendations.
          </p>


          <div className="mt-12 space-y-5">


            <div className="feature-card">
              <span>🤖</span>

              <div>
                <h3 className="text-xl font-semibold">
                  AI Smart Matching
                </h3>

                <p className="mt-1 text-[15px] leading-6 text-slate-300">
                  Receive intelligent recommendations for trusted
                  professionals nearby.
                </p>
              </div>

            </div>



            <div className="feature-card">

              <span>🛡️</span>

              <div>
                <h3 className="text-xl font-semibold">
                  Verified Community
                </h3>

                <p className="mt-1 text-[15px] leading-6 text-slate-300">
                  Verified identities, ratings and authentic reviews
                  build trust.
                </p>
              </div>

            </div>



            <div className="feature-card">

              <span>💬</span>

              <div>
                <h3 className="text-xl font-semibold">
                  Secure Communication
                </h3>

                <p className="mt-1 text-[15px] leading-6 text-slate-300">
                  Chat, manage bookings and receive updates in one place.
                </p>
              </div>

            </div>


          </div>


        </div>


      </div>





      {/* RIGHT SIDE */}


      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">


        <div className="w-[460px] rounded-[32px] bg-white/80 backdrop-blur-xl border border-white shadow-[0_25px_80px_rgba(0,0,0,.15)] p-12">


          <p className="text-indigo-600 uppercase tracking-[4px] text-xs font-bold">
            Welcome Back
          </p>


          <h2 className="mt-3 text-5xl font-black text-slate-800">
            Sign In
          </h2>


          <p className="mt-4 text-gray-500">
            Continue to your NeighbourHub account.
          </p>




          <form
            onSubmit={handleSubmit}
            className="mt-10 space-y-7"
            autoComplete="off"
          >


            <div>

              <label className="text-sm font-semibold text-slate-700">
                Email Address
              </label>


              <div className="mt-3 input-box">

                <FaEnvelope />


                <input
                  type="email"
                  name="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />


              </div>


            </div>





            <div>


              <label className="text-sm font-semibold text-slate-700">
                Password
              </label>


              <div className="mt-3 input-box">


                <FaLock />


                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                />


              </div>


            </div>





            <div className="flex justify-between text-sm">


              <label className="flex gap-2 items-center">

                <input type="checkbox" />

                Remember me

              </label>



              <a href="#" className="text-indigo-600">
                Forgot password?
              </a>


            </div>





            <button
              type="submit"
              className="login-btn"
            >

              Sign In

            </button>



          </form>





          <p className="mt-8 text-center text-gray-600">


            Don't have an account?


            <Link
              to="/register"
              className="ml-2 font-semibold text-indigo-700"
            >

              Register

            </Link>


          </p>


        </div>


      </div>


    </div>
  );
}