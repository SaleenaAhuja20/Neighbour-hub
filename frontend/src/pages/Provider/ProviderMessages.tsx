import { useNavigate } from "react-router-dom";
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
  FaPaperPlane,
} from "react-icons/fa";
import { useState } from "react";

export default function ProviderMessages() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const navItems = [
    { label: "Dashboard", icon: FaHome, path: "/provider-dashboard" },
    { label: "My Services", icon: FaTools, path: "/provider/services" },
    { label: "Add Service", icon: FaPlus, path: "/provider/add-service" },
    { label: "Bookings", icon: FaClipboardList, path: "/provider/bookings" },
    {
      label: "Messages",
      icon: FaComments,
      path: "/provider/messages",
      active: true,
    },
    { label: "Reviews", icon: FaStar, path: "/provider/reviews" },
    { label: "Earnings", icon: FaWallet, path: "/provider/earnings" },
    { label: "Profile", icon: FaUserCircle, path: "/provider/profile" },
    { label: "Settings", icon: FaCog, path: "/provider/settings" },
  ];

  const [message, setMessage] = useState("");

  const [selectedChat, setSelectedChat] = useState(0);

  const [chats, setChats] = useState([
    {
      id: 1,
      name: "Ali Khan",
      time: "10:30 AM",
      messages: [
        {
          sender: "customer",
          text: "Hello, are you available tomorrow?",
        },
        {
          sender: "provider",
          text: "Yes, I am available.",
        },
      ],
    },

    {
      id: 2,
      name: "Sara Ahmed",
      time: "Yesterday",
      messages: [
        {
          sender: "customer",
          text: "Thank you for your service.",
        },
        {
          sender: "provider",
          text: "You're welcome 😊",
        },
      ],
    },

    {
      id: 3,
      name: "Ahmed Raza",
      time: "2 Days Ago",
      messages: [
        {
          sender: "customer",
          text: "Please send quotation.",
        },
        {
          sender: "provider",
          text: "Sure, I will send it shortly.",
        },
      ],
    },
  ]);

  const sendMessage = () => {
    if (!message.trim()) return;

    const updatedChats = [...chats];

    updatedChats[selectedChat].messages.push({
      sender: "provider",
      text: message,
    });

    setChats(updatedChats);

    setMessage("");
  };

  return (
    <div className="min-h-screen flex bg-[#F3F4F7]">

      {/* Sidebar */}

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
                    : "text-slate-300 hover:bg-white/5"
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
            {/* Main */}

     <main className="flex-1 ml-[270px] p-8">

        <div className="flex justify-between items-center">

          <div>

            <p className="uppercase text-xs tracking-widest text-[#2E6F5E] font-bold">
              Provider
            </p>

            <h1 className="text-4xl font-black text-[#111C34] mt-2">
              Messages
            </h1>

          </div>

          <button
            onClick={() => navigate("/provider-dashboard")}
            className="bg-[#111C34] text-white px-6 py-3 rounded-xl hover:bg-[#1c2d55]"
          >
            ← Back to Dashboard
          </button>

        </div>

        <div className="grid grid-cols-3 gap-6 mt-8">

          {/* Conversation List */}

          <div className="bg-white rounded-3xl shadow-sm p-5">

            <h2 className="text-xl font-bold mb-5">
              Conversations
            </h2>

            <div className="space-y-3">

              {chats.map((chat, index) => (

                <div
                  key={chat.id}
                  onClick={() => setSelectedChat(index)}
                  className={`border rounded-2xl p-4 cursor-pointer transition-all duration-200

                  ${
                    selectedChat === index
                      ? "bg-[#111C34] text-white"
                      : "hover:bg-slate-50"
                  }
                  `}
                >

                  <h3 className="font-bold">
                    {chat.name}
                  </h3>

                  <p
                    className={`text-sm mt-1 ${
                      selectedChat === index
                        ? "text-slate-300"
                        : "text-slate-500"
                    }`}
                  >
                    {chat.messages[0].text}
                  </p>

                  <span
                    className={`text-xs ${
                      selectedChat === index
                        ? "text-slate-400"
                        : "text-slate-400"
                    }`}
                  >
                    {chat.time}
                  </span>

                </div>

              ))}

            </div>

          </div>

          {/* Chat Window */}

          <div className="col-span-2 bg-white rounded-3xl shadow-sm flex flex-col">

            <div className="border-b p-5">

              <h2 className="text-xl font-bold">
                {chats[selectedChat].name}
              </h2>

            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4"></div>
                          {chats[selectedChat].messages.map((msg, index) => (

                <div
                  key={index}
                  className={`flex ${
                    msg.sender === "provider"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >

                  <div
                    className={`px-5 py-3 rounded-2xl max-w-[70%]

                    ${
                      msg.sender === "provider"
                        ? "bg-[#111C34] text-white"
                        : "bg-slate-100 text-[#111C34]"
                    }`}
                  >

                    {msg.text}

                  </div>

                </div>

              ))}

            

            <div className="border-t p-5 flex gap-3">

              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-[#111C34]"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    sendMessage();
                  }
                }}
              />

              <button
                onClick={sendMessage}
                className="bg-[#111C34] hover:bg-[#1c2d55] text-white px-6 rounded-xl"
              >

                <FaPaperPlane />

              </button>

            </div>

          </div>

        </div>

     </main>

       </div>

     );

}