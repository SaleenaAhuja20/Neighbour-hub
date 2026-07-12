import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditService() {

  const navigate = useNavigate();

  const { id } = useParams();

  const [service, setService] = useState({
    title: "Electrical Repair",
    category: "Electrician",
    price: "2500",
    description: "Professional electrical repair services."
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setService({
      ...service,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    alert("Service Updated Successfully!");

    navigate("/provider/services");
  };

  return (
    <div className="min-h-screen bg-[#F4F6FA] ml-[270px] p-8">

      <p className="uppercase tracking-widest text-xs text-[#2E6F5E] font-bold">
        Provider
      </p>

      <h1 className="text-4xl font-black text-[#111C34] mt-2">
        Edit Service #{id}
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl shadow p-8 mt-8 max-w-3xl space-y-6"
      >

        <div>

          <label className="font-semibold">
            Service Title
          </label>

          <input
            name="title"
            value={service.title}
            onChange={handleChange}
            className="w-full border rounded-xl p-3 mt-2"
          />

        </div>

        <div>

          <label className="font-semibold">
            Category
          </label>

          <input
            name="category"
            value={service.category}
            onChange={handleChange}
            className="w-full border rounded-xl p-3 mt-2"
          />

        </div>

        <div>

          <label className="font-semibold">
            Price
          </label>

          <input
            name="price"
            value={service.price}
            onChange={handleChange}
            className="w-full border rounded-xl p-3 mt-2"
          />

        </div>

        <div>

          <label className="font-semibold">
            Description
          </label>

          <textarea
            rows={5}
            name="description"
            value={service.description}
            onChange={handleChange}
            className="w-full border rounded-xl p-3 mt-2"
          />

        </div>

        <div className="flex gap-4">

          <button
            type="submit"
            className="bg-[#111C34] text-white px-8 py-3 rounded-xl"
          >
            Update Service
          </button>

          <button
            type="button"
            onClick={() => navigate("/provider/services")}
            className="border px-8 py-3 rounded-xl"
          >
            Cancel
          </button>

        </div>

      </form>

    </div>
  );
}