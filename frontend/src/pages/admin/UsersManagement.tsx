import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services/api";

import {
  FaHome,
  FaUsers,
  FaUserTie,
  FaClipboardList,
  FaChartLine,
  FaBell,
  FaCog,
  FaSignOutAlt,
  FaCrown,
  FaCheckCircle,
  FaSearch,
  FaEdit,
  FaTrash,
  FaBan,
  FaUnlock,
  FaShieldAlt,
} from "react-icons/fa";

export default function UsersManagement() {
  const navigate = useNavigate();

  const [users, setUsers] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  const [showEditModal, setShowEditModal] = useState(false);

  const [editingUser, setEditingUser] = useState<any>({
    id: "",
    fullName: "",
    email: "",
    role: "",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/users");
      setUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const deleteUser = async (id: string) => {
    console.log("DELETE CLICKED", id);

    if (!window.confirm("Delete this user?")) return;

    try {
      await api.delete(`/users/${id}`);
      alert("Deleted");
      fetchUsers();
    } catch (err) {
      console.log(err);
    }
  };

  const blockUser = async (id: string, blocked: boolean) => {
    try {
      if (blocked) {
        await api.patch(`/users/unblock/${id}`);
      } else {
        await api.patch(`/users/block/${id}`);
      }

      fetchUsers();
    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    }
  };

  const openEditModal = (user: any) => {
    setEditingUser({
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
    });

    setShowEditModal(true);
  };
  const updateUser = async () => {
    try {
      await api.patch(`/users/${editingUser.id}`, {
        fullName: editingUser.fullName,
        email: editingUser.email,
        role: editingUser.role,
      });

      alert("User updated successfully!");

      setShowEditModal(false);

      fetchUsers();

    } catch (err) {
      console.log(err);
      alert("Failed to update user");
    }
  };

  const filteredUsers = users.filter((user) =>
    user.fullName
      ?.toLowerCase()
      .includes(search.toLowerCase()) ||
    user.email
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  const navItems = [
    {
      label: "Dashboard",
      icon: FaHome,
      path: "/admin/dashboard",
    },
    {
      label: "Users",
      icon: FaUsers,
      path: "/admin/users",
      active: true,
    },
    {
      label: "Providers",
      icon: FaUserTie,
      path: "/admin/providers",
    },
    {
      label: "Provider Requests",
      icon: FaCheckCircle,
      path: "/admin/provider-requests",
    },
    {
      label: "Bookings",
      icon: FaClipboardList,
      path: "/admin/bookings",
    },
    {
      label: "Analytics",
      icon: FaChartLine,
      path: "/admin/analytics",
    },
  ];

  return (
    <div className="min-h-screen flex bg-[#F3F4F7]">

      {/* SIDEBAR */}

      <aside
        className="
fixed
left-0
top-0
h-screen
w-[272px]
bg-[#111C34]
text-white
flex
flex-col
justify-between
z-50
overflow-y-auto
"
      >
        <div>

          <div className="px-7 py-8 border-b border-white/10">

            <div className="flex items-center gap-3">

              <span
                className="
w-10
h-10
rounded-xl
bg-[#2E6F5E]
flex
items-center
justify-center
"
              >
                <FaCrown className="text-[#8FE3C7]" />
              </span>

              <div>

                <p className="text-xs uppercase tracking-widest text-[#8FE3C7] font-bold">
                  Premium
                </p>

                <h1 className="text-2xl font-black">
                  NeighbourHub
                </h1>

              </div>

            </div>

            <p className="text-slate-400 text-sm mt-2">
              Admin Portal
            </p>

          </div>

          <nav className="mt-6 px-3 space-y-1">

            {navItems.map(({ label, icon: Icon, path, active }) => (

              <button
                key={label}
                onClick={() => navigate(path)}
                className={`
w-full
flex
items-center
gap-3
px-4
py-3
rounded-xl
text-sm
font-medium
transition
${active
                    ? "bg-white/10 text-white"
                    : "text-slate-300 hover:bg-white/5"}
`}
              >

                <Icon
                  className={
                    active
                      ? "text-[#8FE3C7]"
                      : "text-slate-400"
                  }
                />

                {label}

              </button>

            ))}

          </nav>

        </div>

        {/* Bottom */}

        <div className="p-4">

          <div
            className="
bg-white/5
border
border-white/10
rounded-xl
p-4
mb-3
"
          >

            <div className="flex items-center gap-2 text-[#8FE3C7] text-xs font-bold">
              <FaShieldAlt />
              ADMIN ACCESS
            </div>

            <p className="text-slate-400 text-xs mt-2">
              Full platform control enabled.
            </p>

          </div>

          <button
            onClick={logout}
            className="
w-full
py-3
rounded-xl
bg-white/5
hover:bg-red-500/20
flex
items-center
justify-center
gap-2
text-sm
transition
"
          >
            <FaSignOutAlt />
            Logout
          </button>

        </div>

      </aside>

      {/* MAIN */}

      <main
        className="
flex-1
ml-[272px]
px-10
py-9
"
      >

        <p className="text-xs uppercase tracking-widest font-bold text-[#2E6F5E]">
          User Management
        </p>

        <h1 className="text-4xl font-black text-[#111C34] mt-2">
          Manage Users
        </h1>

        <p className="text-slate-500 mt-3">
          Admin control panel for managing all registered users.
        </p>

        {/* Search Box */}

        <div
          className="
mt-8
bg-white
rounded-2xl
border
border-slate-200
p-6
"
        >

          <div className="flex justify-between items-center">

            <h2 className="text-xl font-bold text-[#111C34]">
              All Users ({filteredUsers.length})
            </h2>

            <div
              className="
flex
items-center
gap-2
bg-[#F3F4F7]
px-4
py-2
rounded-xl
"
            >

              <FaSearch className="text-slate-400" />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search users..."
                className="bg-transparent outline-none text-sm"
              />

            </div>

          </div>

          <table className="w-full mt-6">

            <thead>

              <tr className="text-left text-slate-500 text-sm">

                <th className="pb-4">ID</th>

                <th>Name</th>

                <th>Email</th>

                <th>Role</th>

                <th>Status</th>

                <th>Joined</th>

                <th>Actions</th>

              </tr>

            </thead>

            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-t border-slate-100 text-sm"
                  >
                    <td className="py-4 font-bold">
                      {user.id.slice(0, 8)}
                    </td>

                    <td>{user.fullName}</td>

                    <td>{user.email}</td>

                    <td>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold
          ${user.role === "ADMIN"
                            ? "bg-red-100 text-red-600"
                            : user.role === "PROVIDER"
                              ? "bg-green-100 text-green-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                      >
                        {user.role}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold
          ${user.status === "BLOCKED"
                            ? "bg-red-100 text-red-600"
                            : "bg-green-100 text-green-700"
                          }`}
                      >
                        {user.status}
                      </span>
                    </td>

                    <td>
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>

                    <td>
                      <div className="flex gap-2">

                        <button
                          onClick={() => openEditModal(user)}
                          className="p-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600"
                          title="Edit"
                        >
                          <FaEdit />
                        </button>

                        <button
                          onClick={() => deleteUser(user.id)}
                          className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600"
                          title="Delete"
                        >
                          <FaTrash />
                        </button>

                        <button
                          onClick={() =>
                            blockUser(
                              user.id,
                              user.status === "BLOCKED"
                            )
                          }
                          className="p-2 rounded-lg bg-yellow-50 hover:bg-yellow-100 text-yellow-600"
                          title={
                            user.status === "BLOCKED"
                              ? "Unblock User"
                              : "Block User"
                          }
                        >
                          {user.status === "BLOCKED" ? (
                            <FaUnlock />
                          ) : (
                            <FaBan />
                          )}
                        </button>

                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="text-center py-8 text-slate-500"
                  >
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>

          </table>

        </div>

        {showEditModal && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

    <div className="bg-white rounded-2xl p-8 w-[500px] shadow-2xl">

      <h2 className="text-2xl font-bold mb-6">
        Edit User
      </h2>

      {/* Full Name */}

      <div className="mb-4">
        <label className="text-sm font-semibold">
          Full Name
        </label>

        <input
          type="text"
          value={editingUser.fullName}
          onChange={(e) =>
            setEditingUser({
              ...editingUser,
              fullName: e.target.value,
            })
          }
          className="w-full border rounded-lg p-3 mt-2"
        />
      </div>

      {/* Email */}

      <div className="mb-4">
        <label className="text-sm font-semibold">
          Email
        </label>

        <input
          type="email"
          value={editingUser.email}
          onChange={(e) =>
            setEditingUser({
              ...editingUser,
              email: e.target.value,
            })
          }
          className="w-full border rounded-lg p-3 mt-2"
        />
      </div>

      {/* Role */}

      <div className="mb-6">
        <label className="text-sm font-semibold">
          Role
        </label>

        <select
          value={editingUser.role}
          onChange={(e) =>
            setEditingUser({
              ...editingUser,
              role: e.target.value,
            })
          }
          className="w-full border rounded-lg p-3 mt-2"
        >
          <option value="RESIDENT">Resident</option>
          <option value="PROVIDER">Provider</option>
          <option value="MODERATOR">Moderator</option>
          <option value="ADMIN">Admin</option>
        </select>
      </div>

      {/* Buttons */}

      <div className="flex justify-end gap-3">

        <button
          onClick={() => setShowEditModal(false)}
          className="px-5 py-2 rounded-lg bg-gray-200"
        >
          Cancel
        </button>

        <button
          onClick={updateUser}
          className="px-5 py-2 rounded-lg bg-blue-600 text-white"
        >
          Save Changes
        </button>

      </div>

    </div>

  </div>
)}

      </main>

    </div>
  );
}