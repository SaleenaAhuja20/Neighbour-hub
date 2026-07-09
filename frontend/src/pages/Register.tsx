import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import api from "../services/api";

export default function Register() {

   const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };


  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();


    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }


    try {

      const response = await api.post(
        "/auth/register",
        {
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password
        }
      );


      console.log(response.data);

      alert("Account created successfully");
      navigate("/dashboard");


    } catch (error: any) {

      console.log(error.response?.data);

      alert(
        error.response?.data?.message ||
        "Registration failed"
      );

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
            JOIN YOUR NEIGHBOURHOOD
          </p>


          <h1 className="mt-4 text-6xl font-extrabold leading-none tracking-tight text-white">
            NeighbourHub
          </h1>


          <p className="mt-6 max-w-md text-lg leading-8 text-slate-300">
            Create your account to book trusted local services, offer
            your own, and become part of a verified, connected
            community.
          </p>


          <div className="mt-12 space-y-5">


            <div className="feature-card">
              <span>✅</span>

              <div>
                <h3 className="text-xl font-semibold">
                  Quick Verification
                </h3>

                <p className="mt-1 text-[15px] leading-6 text-slate-300">
                  Confirm your identity and address to unlock full access.
                </p>
              </div>

            </div>



            <div className="feature-card">

              <span>🧰</span>

              <div>
                <h3 className="text-xl font-semibold">
                  Offer Your Skills
                </h3>

                <p className="mt-1 text-[15px] leading-6 text-slate-300">
                  Switch to a Provider profile anytime and start listing services.
                </p>
              </div>

            </div>



            <div className="feature-card">

              <span>⭐</span>

              <div>
                <h3 className="text-xl font-semibold">
                  Build Real Trust
                </h3>

                <p className="mt-1 text-[15px] leading-6 text-slate-300">
                  Earn reviews and a reputation score neighbours rely on.
                </p>
              </div>

            </div>


          </div>


        </div>


      </div>





      {/* RIGHT SIDE */}


      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-10">


        <div className="w-[460px] rounded-[32px] bg-white/80 backdrop-blur-xl border border-white shadow-[0_25px_80px_rgba(0,0,0,.15)] p-12">


          <p className="text-indigo-600 uppercase tracking-[4px] text-xs font-bold">
            Get Started
          </p>


          <h2 className="mt-3 text-5xl font-black text-slate-800">
            Sign Up
          </h2>


          <p className="mt-4 text-gray-500">
            Create your NeighbourHub account.
          </p>




          <form
            onSubmit={handleSubmit}
            className="mt-7 space-y-6"
          >


            <div>

              <label className="text-sm font-semibold text-slate-700">
                Full Name
              </label>


              <div className="mt-3 input-box">

                <FaUser />


                <input
                  type="text"
                  name="fullName"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={handleChange}
                />

              </div>

            </div>





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





            <div>

              <label className="text-sm font-semibold text-slate-700">
                Confirm Password
              </label>


              <div className="mt-3 input-box">

                <FaLock />


                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />

              </div>


            </div>





            <label className="flex gap-2 items-start text-sm text-gray-600">

              <input
                type="checkbox"
                className="mt-1"
              />

              I agree to the Terms of Service and Privacy Policy.

            </label>





            <button
              type="submit"
              className="login-btn"
            >
              Create Account
            </button>



          </form>





          <p className="mt-8 text-center text-gray-600">

            Already have an account?

            <Link
              to="/?"
              className="ml-2 font-semibold text-indigo-700"
            >
              login
            </Link>

          </p>


        </div>


      </div>


    </div>
  );
}
