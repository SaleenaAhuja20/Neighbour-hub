import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function BecomeProvider() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    serviceTitle: "",
    category: "",
    experience: "",
    phone: "",
    address: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const response = await api.post("/provider/apply", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data);

      alert("Application submitted successfully!");

      navigate("/dashboard");
    } catch (error: any) {
      console.log(error.response?.data);

      alert(error.response?.data?.message || "Application failed.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center py-14">
      <div className="w-[850px] bg-white rounded-[30px] shadow-xl p-10">
        <p className="uppercase tracking-[4px] text-indigo-600 text-xs font-bold">
          Provider Application
        </p>

        <h1 className="text-5xl font-black mt-3">Become a Provider</h1>

        <p className="mt-4 text-slate-500">
          Fill in your information to offer your services on NeighbourHub.
        </p>

        <form onSubmit={handleSubmit} className="mt-10 space-y-7">
          <div>
            <label className="font-semibold">Service Title</label>

            <input
              name="serviceTitle"
              onChange={handleChange}
              className="provider-input"
              placeholder="Electrician"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="font-semibold">Category</label>

              <select
                name="category"
                onChange={handleChange}
                className="provider-input"
              >
                <option>Select Category</option>

                <option>Electrician</option>

                <option>Plumber</option>

                <option>Cleaner</option>

                <option>Tutor</option>

                <option>Mechanic</option>

                <option>Painter</option>
              </select>
            </div>

            <div>
              <label className="font-semibold">Experience</label>

              <input
                name="experience"
                onChange={handleChange}
                className="provider-input"
                placeholder="5 Years"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="font-semibold">Phone</label>

              <input
                name="phone"
                onChange={handleChange}
                className="provider-input"
              />
            </div>

            <div>
              <label className="font-semibold">Address</label>

              <input
                name="address"
                onChange={handleChange}
                className="provider-input"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold">About Yourself</label>

            <textarea
              rows={6}
              name="description"
              onChange={handleChange}
              className="provider-input resize-none"
              placeholder="Describe your experience..."
            />
          </div>

          <button className="login-btn mt-4">Submit Application</button>
        </form>
      </div>
    </div>
  );
}
