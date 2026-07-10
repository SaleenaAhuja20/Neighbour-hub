import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaSave } from "react-icons/fa";
import { useState } from "react";

export default function EditProfile() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [form, setForm] = useState({
    name: user.fullName || "",
    email: user.email || "",
    phone: "",
    location: "Karachi, Pakistan",
  });

  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const saveProfile = () => {
    localStorage.setItem(
      "user",
      JSON.stringify({
        ...user,
        fullName: form.name,
        email: form.email,
      }),
    );

    alert("Profile updated successfully");

    navigate("/profile");
  };

  return (
    <div className="min-h-screen bg-[#F4F6FA] p-8">
      <button
        onClick={() => navigate("/profile")}
        className="flex items-center gap-2 text-[#111C34] font-semibold"
      >
        <FaArrowLeft />
        Back to Profile
      </button>

      <div className="max-w-3xl mx-auto mt-8 bg-white rounded-3xl shadow-xl border p-8">
        <h1 className="text-3xl font-black text-[#111C34]">Edit Profile</h1>

        <p className="text-slate-500 mt-2">Update your personal information</p>

        <div className="mt-8 space-y-5">
          <div>
            <label className="text-sm font-semibold">Full Name</label>

            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full mt-2 border rounded-xl px-4 py-3 outline-none"
            />
          </div>

          <div>
            <label className="text-sm font-semibold">Email</label>

            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full mt-2 border rounded-xl px-4 py-3 outline-none"
            />
          </div>

          <div>
            <label className="text-sm font-semibold">Phone</label>

            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="+92 300 1234567"
              className="w-full mt-2 border rounded-xl px-4 py-3 outline-none"
            />
          </div>

          <div>
            <label className="text-sm font-semibold">Location</label>

            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              className="w-full mt-2 border rounded-xl px-4 py-3 outline-none"
            />
          </div>

          <button
            onClick={saveProfile}
            className="mt-5 bg-[#2E6F5E] text-white px-6 py-3 rounded-xl font-semibold"
          >
            <FaSave className="inline mr-2" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
