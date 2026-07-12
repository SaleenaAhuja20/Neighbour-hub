import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaShieldAlt } from "react-icons/fa";
import { useState } from "react";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Dummy Admin Login
    if (
      formData.email === "admin@gmail.com" &&
      formData.password === "admin123"
    ) {
      localStorage.setItem("admin", "true");

      alert("Admin Login Successful");

      navigate("/admin/dashboard");
    } else {
      alert("Invalid Admin Credentials");
    }
  };

  return (
    <div className="min-h-screen flex overflow-hidden">

      {/* LEFT */}

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
            ADMINISTRATOR PORTAL
          </p>

          <h1 className="mt-4 text-6xl font-extrabold leading-none tracking-tight text-white">
            NeighbourHub
          </h1>

          <p className="mt-6 max-w-md text-lg leading-8 text-slate-300">
            Securely manage residents, providers, bookings, analytics,
            community reports and complete platform administration.
          </p>

          <div className="mt-12 space-y-5">

            <div className="feature-card">

              <span>🛡️</span>

              <div>

                <h3 className="text-xl font-semibold">
                  Secure Admin Access
                </h3>

                <p className="mt-1 text-[15px] leading-6 text-slate-300">
                  Only authorized administrators can access the control panel.
                </p>

              </div>

            </div>

            <div className="feature-card">

              <span>📊</span>

              <div>

                <h3 className="text-xl font-semibold">
                  Platform Analytics
                </h3>

                <p className="mt-1 text-[15px] leading-6 text-slate-300">
                  View bookings, users, providers and revenue insights.
                </p>

              </div>

            </div>

            <div className="feature-card">

              <span>⚙️</span>

              <div>

                <h3 className="text-xl font-semibold">
                  Complete Management
                </h3>

                <p className="mt-1 text-[15px] leading-6 text-slate-300">
                  Manage services, disputes, providers and system settings.
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* RIGHT */}

      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">

        <div className="w-[460px] rounded-[32px] bg-white/80 backdrop-blur-xl border border-white shadow-[0_25px_80px_rgba(0,0,0,.15)] p-12">

          <div className="flex justify-center">

            <div className="w-20 h-20 rounded-full bg-[#111C34] flex items-center justify-center">

              <FaShieldAlt className="text-4xl text-[#8FE3C7]" />

            </div>

          </div>

          <p className="text-indigo-600 uppercase tracking-[4px] text-xs font-bold text-center mt-6">
            Administrator
          </p>

          <h2 className="mt-3 text-5xl font-black text-slate-800 text-center">
            Admin Login
          </h2>

          <p className="mt-4 text-gray-500 text-center">
            Login to access the Admin Dashboard.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-10 space-y-7"
          >

            <div>

              <label className="text-sm font-semibold text-slate-700">
                Admin Email
              </label>

              <div className="mt-3 input-box">

                <FaEnvelope />

                <input
                  type="email"
                  name="email"
                  placeholder="admin@gmail.com"
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

                Remember Me

              </label>

              <a
                href="#"
                className="text-indigo-600"
              >
                Forgot Password?
              </a>

            </div>

            <button
              type="submit"
              className="login-btn"
            >
              Login as Admin
            </button>

          </form>

          <div className="mt-8 rounded-xl bg-[#111C34]/5 p-4 border border-[#111C34]/10">

            <p className="text-sm font-semibold text-[#111C34]">
              Demo Credentials
            </p>

            <p className="text-sm text-slate-500 mt-2">
              Email : admin@gmail.com
            </p>

            <p className="text-sm text-slate-500">
              Password : admin123
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}