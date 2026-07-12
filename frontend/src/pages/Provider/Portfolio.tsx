import { FaPlus, FaTrash } from "react-icons/fa";

export default function ProviderPortfolio() {
  const portfolio = [
    {
      id: 1,
      title: "Electrical Wiring",
      image: "https://picsum.photos/400/300?1",
    },
    {
      id: 2,
      title: "AC Installation",
      image: "https://picsum.photos/400/300?2",
    },
    {
      id: 3,
      title: "Home Cleaning",
      image: "https://picsum.photos/400/300?3",
    },
    {
      id: 4,
      title: "Plumbing Work",
      image: "https://picsum.photos/400/300?4",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F4F6FA] ml-[270px] p-8">

      <p className="uppercase tracking-widest text-xs text-[#2E6F5E] font-bold">
        Provider
      </p>

      <h1 className="text-4xl font-black text-[#111C34] mt-2">
        Portfolio
      </h1>

      <p className="text-slate-500 mt-2">
        Showcase your completed work.
      </p>

      <button className="mt-8 bg-[#111C34] text-white px-6 py-3 rounded-xl">
        <FaPlus className="inline mr-2" />
        Upload Image
      </button>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-8">

        {portfolio.map((item) => (

          <div
            key={item.id}
            className="bg-white rounded-3xl shadow overflow-hidden"
          >

            <img
              src={item.image}
              className="h-52 w-full object-cover"
            />

            <div className="p-5">

              <h2 className="font-bold">
                {item.title}
              </h2>

              <button className="mt-4 bg-red-500 text-white w-full py-3 rounded-xl">
                <FaTrash className="inline mr-2" />
                Delete
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}