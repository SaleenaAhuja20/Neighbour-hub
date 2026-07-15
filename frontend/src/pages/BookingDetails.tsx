import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

import {
  FaArrowLeft,
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaPhone,
  FaUser,
  FaClipboardCheck,
} from "react-icons/fa";


type Booking = {
  id: string;
  bookingDate: string;
  address: string;
  notes?: string;
  status: string;

  provider: {
    serviceTitle: string;
    category: string;
    phone: string;

    user: {
      fullName: string;
    };
  };
};


export default function BookingDetails() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [booking, setBooking] = useState<Booking | null>(null);


  useEffect(() => {

    const fetchBooking = async () => {

      try {

        const token = localStorage.getItem("token");

        const response = await api.get(`/booking/${id}`, {
          headers:{
            Authorization:`Bearer ${token}`
          }
        });


        setBooking(response.data);

      } catch(err){

        console.log(err);

      }

    };


    fetchBooking();

  },[id]);



  if(!booking){

    return (

      <div className="min-h-screen flex items-center justify-center bg-[#F3F4F7]">

        <div className="text-xl font-bold text-[#111C34]">
          Loading booking details...
        </div>

      </div>

    );

  }



  return (

    <div className="min-h-screen bg-[#F3F4F7] px-10 py-10">


      {/* BACK BUTTON */}

      <button
        onClick={()=>navigate("/bookings")}
        className="flex items-center gap-2 text-[#4f46e5] font-semibold mb-8"
      >

        <FaArrowLeft/>

        Back to bookings

      </button>



      <div className="max-w-5xl mx-auto">


        <p className="uppercase tracking-widest text-xs text-[#4f46e5]">
          Booking Details
        </p>


        <h1 className="text-4xl font-extrabold text-[#111C34] mt-2">
          {booking.provider.serviceTitle}
        </h1>


        <p className="text-slate-500 mt-2">
          Complete information about your service request
        </p>




        {/* MAIN CARD */}

        <div className="dashboard-card mt-8">


          <div className="flex justify-between items-center">


            <div>

              <h2 className="text-2xl font-bold text-[#1e293b]">

                {booking.provider.user.fullName}

              </h2>


              <p className="text-[#4f46e5] font-semibold mt-1">

                {booking.provider.category}

              </p>

            </div>



            <span
            className={`px-5 py-2 rounded-full font-bold text-sm

            ${
              booking.status==="PENDING"
              ?"bg-yellow-100 text-yellow-700"

              :booking.status==="ACCEPTED"
              ?"bg-green-100 text-green-700"

              :booking.status==="COMPLETED"
              ?"bg-blue-100 text-blue-700"

              :"bg-red-100 text-red-700"

            }`}
            >

              {booking.status}

            </span>


          </div>





          <div className="profile-divider"/>



          {/* DETAILS */}


          <div className="space-y-5">


            <div className="profile-row">

              <span className="flex items-center gap-3">

                <FaCalendarAlt className="text-[#4f46e5]"/>

                Date

              </span>


              <span>

              {new Date(
                booking.bookingDate
              ).toLocaleDateString()}

              </span>

            </div>





            <div className="profile-row">

              <span className="flex items-center gap-3">

                <FaClock className="text-[#4f46e5]"/>

                Time

              </span>


              <span>

              {new Date(
                booking.bookingDate
              ).toLocaleTimeString([],{
                hour:"2-digit",
                minute:"2-digit"
              })}

              </span>

            </div>





            <div className="profile-row">

              <span className="flex items-center gap-3">

                <FaMapMarkerAlt className="text-[#4f46e5]"/>

                Address

              </span>


              <span>

                {booking.address}

              </span>


            </div>





            <div className="profile-row">

              <span className="flex items-center gap-3">

                <FaPhone className="text-[#4f46e5]"/>

                Contact

              </span>


              <span>

                {booking.provider.phone}

              </span>

            </div>


          </div>






          {booking.notes && (

            <div className="mt-8 bg-[#eef2ff] p-5 rounded-2xl">


              <h3 className="font-bold text-[#1e293b] flex items-center gap-2">

                <FaClipboardCheck/>

                Notes

              </h3>


              <p className="mt-2 text-slate-600">

                {booking.notes}

              </p>


            </div>

          )}






        </div>



      </div>


    </div>

  );

}