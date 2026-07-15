import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api/api";
import {
    FaArrowLeft,
    FaCalendarAlt,
    FaClock,
    FaMapMarkerAlt,
    FaHome,
    FaClipboardList,
    FaUser,
    FaPhoneAlt,
    FaCheckCircle,
} from "react-icons/fa";

export default function BookService() {
    const navigate = useNavigate();
    const { providerId } = useParams();


    const [provider, setProvider] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const platformFee = 100;
    const total = (provider?.serviceFee || 0) + platformFee;

    useEffect(() => {
        fetchProvider();
    }, []);

    const fetchProvider = async () => {
        try {
            const res = await API.get(`/provider/${providerId}`);
            setProvider(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const [booking, setBooking] = useState({
        date: "",
        time: "",
        address: "",
        house: "",
        description: "",
        priority: "Normal",
    });

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        setBooking({
            ...booking,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async () => {
        if (
            !booking.date ||
            !booking.time ||
            !booking.address ||
            !booking.house
        ) {
            alert("Please fill all required fields.");
            return;
        }

        try {
            const token = localStorage.getItem("token");

            await API.post(
                `/booking/${providerId}`,
                {
                    bookingDate: booking.date,
                    bookingTime: booking.time,
                    address: `${booking.house}, ${booking.address}`,
                    notes: booking.description,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert("Booking created successfully!");

            navigate("/bookings");
        } catch (error: any) {
            console.error(error);

            alert(
                error.response?.data?.message ||
                "Failed to create booking"
            );
        }
    };
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                Loading...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F6F8FC] p-8">

            {/* Header */}

            <div className="flex items-center gap-4 mb-8">

                <button
                    onClick={() => navigate(-1)}
                    className="w-12 h-12 rounded-xl bg-white shadow flex items-center justify-center hover:bg-gray-100"
                >
                    <FaArrowLeft />
                </button>

                <div>
                    <h1 className="text-3xl font-bold text-slate-800">
                        Book Service
                    </h1>

                    <p className="text-slate-500">
                        Complete the details below.
                    </p>
                </div>

            </div>

            <div className="grid lg:grid-cols-3 gap-8">

                {/* LEFT */}

                <div className="lg:col-span-2 bg-white rounded-3xl shadow-md p-8">

                    <h2 className="text-2xl font-bold mb-6 text-slate-800">
                        Booking Details
                    </h2>

                    <div className="grid md:grid-cols-2 gap-5">

                        <div>
                            <label className="font-semibold">
                                Date
                            </label>

                            <div className="input-box mt-2">
                                <FaCalendarAlt />
                                <input
                                    type="date"
                                    name="date"
                                    value={booking.date}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="font-semibold">
                                Time
                            </label>

                            <div className="input-box mt-2">
                                <FaClock />
                                <input
                                    type="time"
                                    name="time"
                                    value={booking.time}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                    </div>

                    <div className="mt-6">

                        <label className="font-semibold">
                            Address
                        </label>

                        <div className="input-box mt-2">
                            <FaMapMarkerAlt />
                            <input
                                name="address"
                                placeholder="Street / Area"
                                value={booking.address}
                                onChange={handleChange}
                            />
                        </div>

                    </div>

                    <div className="mt-6">

                        <label className="font-semibold">
                            House / Apartment No
                        </label>

                        <div className="input-box mt-2">
                            <FaHome />
                            <input
                                name="house"
                                placeholder="House #"
                                value={booking.house}
                                onChange={handleChange}
                            />
                        </div>

                    </div>

                    <div className="mt-6">

                        <label className="font-semibold">
                            Describe Your Problem
                        </label>

                        <textarea
                            rows={5}
                            name="description"
                            value={booking.description}
                            onChange={handleChange}
                            placeholder="Describe the issue..."
                            className="provider-input resize-none"
                        />

                    </div>

                    <div className="mt-6">

                        <label className="font-semibold">
                            Priority
                        </label>

                        <select
                            name="priority"
                            value={booking.priority}
                            onChange={handleChange}
                            className="provider-input"
                        >
                            <option>Normal</option>
                            <option>Urgent</option>
                        </select>

                    </div>

                </div>

                {/* RIGHT */}

                <div className="space-y-6">

                    {/* Provider */}

                    <div className="bg-white rounded-3xl shadow-md p-6">

                        <div className="flex items-center justify-between">

                            <h2 className="text-xl font-bold">
                                Provider
                            </h2>

                            <FaCheckCircle className="text-green-500 text-xl" />

                        </div>

                        <div className="mt-5 space-y-4">

                            <div className="flex items-center gap-3">
                                <FaUser className="text-[#2E6F5E]" />
                                <span>{provider.user.fullName}</span>
                            </div>

                            <div>
                                <strong>Category:</strong> {provider.category}
                            </div>

                            <div>
                                <strong>Experience:</strong> {provider.experience}
                            </div>

                            <div className="flex items-center gap-3">
                                <FaPhoneAlt className="text-[#2E6F5E]" />
                                <span>{provider.phone}</span>
                            </div>

                            <div className="flex items-center gap-3">
                                <FaMapMarkerAlt className="text-[#2E6F5E]" />
                                <span>{provider.address}</span>
                            </div>

                        </div>

                    </div>

                    {/* Summary */}

                    <div className="bg-white rounded-3xl shadow-md p-6">

                        <div className="flex items-center gap-3 mb-6">

                            <FaClipboardList
                                className="text-[#2E6F5E]"
                            />

                            <h2 className="text-xl font-bold">
                                Booking Summary
                            </h2>

                        </div>

                        <div className="space-y-3">

                            <div className="flex justify-between">
                                <span>Service Fee</span>
                                <span>Rs. {provider.serviceFee}</span>
                            </div>

                            <div className="flex justify-between">
                                <span>Platform Fee</span>
                                <span>Rs. {platformFee}</span>
                            </div>

                            <hr />

                            <div className="flex justify-between text-xl font-bold">

                                <span>Total</span>

                                <span className="text-[#2E6F5E]">
                                    Rs. {total}
                                </span>

                            </div>

                        </div>

                        <button
                            onClick={handleSubmit}
                            className="w-full mt-8 py-4 rounded-xl bg-[#2E6F5E] hover:bg-[#25594c] text-white font-semibold transition"
                        >
                            Confirm Booking
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
}