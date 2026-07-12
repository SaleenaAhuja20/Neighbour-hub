import { useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaHeart,
  FaComment,
  FaShare,
  FaPlus,
} from "react-icons/fa";

export default function Community() {
  const navigate = useNavigate();

  const posts = [
    {
      id: 1,
      name: "Ali Ahmed",
      time: "2 hours ago",
      post:
        "Looking for a trusted electrician near Block A. Any recommendations?",
    },
    {
      id: 2,
      name: "Sara Khan",
      time: "5 hours ago",
      post:
        "Community clean-up drive this Sunday at 10 AM. Everyone is welcome!",
    },
    {
      id: 3,
      name: "Hassan Raza",
      time: "Yesterday",
      post:
        "Selling a slightly used study table. Message me if interested.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F3F4F7] p-8">
      <div className="max-w-5xl mx-auto">

        <div className="flex justify-between items-center mb-8">
          <div>
            <p className="text-[#2E6F5E] uppercase text-xs font-bold tracking-widest">
              Community
            </p>

            <h1 className="text-4xl font-black text-[#111C34] mt-2">
              Neighbour Community
            </h1>
          </div>

          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 bg-[#111C34] text-white px-5 py-3 rounded-xl"
          >
            <FaArrowLeft />
            Dashboard
          </button>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border">

          <div className="flex gap-3">

            <input
              placeholder="Share something with your neighbours..."
              className="flex-1 border rounded-xl px-4 py-3 outline-none"
            />

            <button className="bg-[#2E6F5E] text-white px-6 rounded-xl flex items-center gap-2">
              <FaPlus />
              Post
            </button>

          </div>

        </div>

        <div className="space-y-6 mt-8">

          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-2xl p-6 shadow-sm border"
            >
              <div className="flex justify-between">
                <div>
                  <h3 className="font-bold text-lg">{post.name}</h3>
                  <p className="text-sm text-gray-500">{post.time}</p>
                </div>
              </div>

              <p className="mt-5 text-gray-700 leading-7">
                {post.post}
              </p>

              <div className="flex gap-8 mt-6 text-gray-500">

                <button className="flex items-center gap-2 hover:text-red-500">
                  <FaHeart />
                  Like
                </button>

                <button className="flex items-center gap-2 hover:text-blue-500">
                  <FaComment />
                  Comment
                </button>

                <button className="flex items-center gap-2 hover:text-green-600">
                  <FaShare />
                  Share
                </button>

              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}