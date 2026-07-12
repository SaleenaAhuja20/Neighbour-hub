import { useNavigate } from "react-router-dom";
import { FaStar, FaArrowLeft } from "react-icons/fa";

export default function ProviderReviews() {

  const navigate = useNavigate();

  const reviews = [
    {
      id: 1,
      customer: "Ali Ahmed",
      rating: 5,
      comment: "Excellent service. Highly recommended.",
      date: "10 July 2025",
    },
    {
      id: 2,
      customer: "Sara Khan",
      rating: 4,
      comment: "Very professional and on time.",
      date: "8 July 2025",
    },
    {
      id: 3,
      customer: "Usman",
      rating: 5,
      comment: "Great work quality.",
      date: "5 July 2025",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F4F6FA] ml-[270px] p-8">

      <div className="flex justify-between items-center">

        <div>
          <p className="uppercase text-xs tracking-widest text-[#2E6F5E] font-bold">
            Provider
          </p>

          <h1 className="text-4xl font-black text-[#111C34] mt-2">
            Customer Reviews
          </h1>
        </div>

        <button
          onClick={() => navigate("/provider-dashboard")}
          className="bg-[#111C34] text-white px-5 py-3 rounded-xl flex items-center gap-2"
        >
          <FaArrowLeft />
          Dashboard
        </button>

      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-8">

        <div className="bg-white rounded-3xl p-6 shadow">

          <p className="text-slate-400">
            Average Rating
          </p>

          <h2 className="text-5xl font-black mt-3">
            4.9
          </h2>

          <div className="flex gap-1 mt-3 text-yellow-400">

            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />

          </div>

        </div>

        <div className="bg-white rounded-3xl p-6 shadow">

          <p className="text-slate-400">
            Total Reviews
          </p>

          <h2 className="text-5xl font-black mt-3">
            128
          </h2>

        </div>

        <div className="bg-white rounded-3xl p-6 shadow">

          <p className="text-slate-400">
            Satisfaction
          </p>

          <h2 className="text-5xl font-black mt-3 text-[#2E6F5E]">
            98%
          </h2>

        </div>

      </div>

      <div className="bg-white rounded-3xl shadow mt-8 p-8">

        <h2 className="text-2xl font-bold mb-6">
          Recent Reviews
        </h2>

        <div className="space-y-5">

          {reviews.map((review) => (

            <div
              key={review.id}
              className="border rounded-2xl p-5"
            >

              <div className="flex justify-between">

                <div>

                  <h3 className="font-bold">
                    {review.customer}
                  </h3>

                  <p className="text-sm text-slate-500">
                    {review.date}
                  </p>

                </div>

                <div className="flex text-yellow-400">

                  {[...Array(review.rating)].map((_, index) => (
                    <FaStar key={index} />
                  ))}

                </div>

              </div>

              <p className="mt-4 text-slate-600">
                {review.comment}
              </p>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}