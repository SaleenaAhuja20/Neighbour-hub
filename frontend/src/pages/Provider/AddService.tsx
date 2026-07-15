import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import {
  FaHome,
  FaTools,
  FaPlus,
  FaClipboardList,
  FaComments,
  FaStar,
  FaWallet,
  FaUserCircle,
  FaCog,
  FaSignOutAlt,
  FaShieldAlt,
  FaCrown,
} from "react-icons/fa";

export default function AddService() {
  const navigate = useNavigate();

  const [service, setService] = useState({
    title: "",
    category: "",
    price: "",
    description: "",
  });

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  useEffect(() => {
  const fetchService = async () => {
    try {
      const { data } = await api.get("/provider/my-service");

      if (data) {
        setService({
          title: data.serviceTitle || "",
          category: data.category || "",
          price: data.serviceFee?.toString() || "",
          description: data.description || "",
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  fetchService();
}, []);
  const navItems = [
    { label: "Dashboard", icon: FaHome, path: "/provider-dashboard" },
    { label: "My Services", icon: FaTools, path: "/provider/services" },
    {
      label: "Add Service",
      icon: FaPlus,
      path: "/provider/add-service",
      active: true,
    },
    { label: "Bookings", icon: FaClipboardList, path: "/provider/bookings" },
    { label: "Profile", icon: FaUserCircle, path: "/provider/profile" },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setService({
      ...service,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    await api.patch("/provider/service", {
      serviceTitle: service.title,
      category: service.category,
      serviceFee: Number(service.price),
      description: service.description,
    });

    alert("Service updated successfully");
    navigate("/provider/services");
  } catch (error: any) {
    console.error(error);
    alert(error.response?.data?.message || "Failed to update service");
  }
};

  return (
    <div className="min-h-screen flex bg-[#F3F4F7]">

      {/* SIDEBAR */}

      <aside className="fixed left-0 top-0 h-screen w-[270px] bg-[#111C34] text-white flex flex-col justify-between">

        <div>

          <div className="px-6 py-7 border-b border-white/10">

            <div className="flex items-center gap-3">

              <div className="w-10 h-10 rounded-xl bg-[#2E6F5E] flex items-center justify-center">
                <FaCrown className="text-[#8FE3C7]" />
              </div>

              <div>
                <p className="text-xs text-[#8FE3C7] font-bold">
                  PROVIDER
                </p>

                <h1 className="text-xl font-black">
                  NeighbourHub
                </h1>
              </div>

            </div>

            <p className="text-xs text-slate-400 mt-3">
              Service Provider
            </p>

          </div>

          <nav className="mt-5 px-3 space-y-1">

            {navItems.map(({ label, icon: Icon, path, active }) => (

              <button
                key={label}
                onClick={() => navigate(path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl ${
                  active
                    ? "bg-white/10"
                    : "hover:bg-white/5 text-slate-300"
                }`}
              >
                <Icon />
                {label}
              </button>

            ))}

          </nav>

        </div>

        <div className="p-4">

          <div className="bg-[#1B2948] rounded-xl p-4 mb-3">

            <div className="flex gap-2 text-[#8FE3C7] text-xs">
              <FaShieldAlt />
              Verified Provider
            </div>

          </div>

          <button
            onClick={logout}
            className="w-full py-3 rounded-xl bg-[#1B2948]"
          >
            <FaSignOutAlt className="inline mr-2" />
            Logout
          </button>

        </div>

      </aside>

      {/* MAIN */}

      <main className="flex-1 ml-[270px] p-8">

        <p className="uppercase text-xs tracking-widest text-[#2E6F5E] font-bold">
          Provider
        </p>

        <h1 className="text-4xl font-black text-[#111C34] mt-2">
          Add New Service
        </h1>

        <p className="text-slate-500 mt-3">
          Create a new service for customers.
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl shadow-sm p-8 mt-8 space-y-6 max-w-4xl"
        >

          <div>

            <label className="font-semibold">
              Service Name
            </label>

            <input
              type="text"
              name="title"
              value={service.title}
              onChange={handleChange}
              className="w-full mt-2 border rounded-xl p-3"
              placeholder="Electrician"
            />

          </div>

          <div>

            <label className="font-semibold">
              Category
            </label>

            <select
              name="category"
              value={service.category}
              onChange={handleChange}
              className="w-full mt-2 border rounded-xl p-3"
            >

              <option value="">
                Select Category
              </option>

              <option>Electrical</option>
              <option>Cleaning</option>
              <option>Painting</option>
              <option>Plumbing</option>
              <option>Carpentry</option>

            </select>

          </div>

          <div>

            <label className="font-semibold">
              Price
            </label>

            <input
              type="number"
              name="price"
              value={service.price}
              onChange={handleChange}
              className="w-full mt-2 border rounded-xl p-3"
              placeholder="2500"
            />

          </div>

          <div>

            <label className="font-semibold">
              Description
            </label>

            <textarea
              rows={6}
              name="description"
              value={service.description}
              onChange={handleChange}
              className="w-full mt-2 border rounded-xl p-3"
              placeholder="Describe your service..."
            />

          </div>

          <button
            type="submit"
            className="bg-[#111C34] text-white px-8 py-3 rounded-xl"
          >
            Add Service
          </button>

        </form>

      </main>

    </div>
  );
}