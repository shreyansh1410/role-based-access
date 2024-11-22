import React, { useState, useContext } from "react";
import { useUserContext } from "../context/UserContext";
import Modal from "../components/Modal";
import {
  PlusCircle,
  Edit2,
  Trash2,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import { ThemeContext } from "@/context/ThemeContext";

const UserManagement = () => {
  const { users, addUser, editUser, deleteUser, toggleUserStatus } =
    useUserContext();
  const { isDarkMode } = useContext(ThemeContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    role: "User",
    status: "Active",
  });

  const handleSaveUser = () => {
    if (currentUser) {
      editUser(currentUser.id, userData);
    } else {
      addUser(userData);
    }
    setModalOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setUserData({ name: "", email: "", role: "User", status: "Active" });
    setCurrentUser(null);
  };

  const headers = ["Name", "Email", "Role", "Status", "Actions"];

  return (
    <div
      className={`container mx-auto p-6 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">User Management</h2>
        <button
          onClick={() => {
            resetForm();
            setModalOpen(true);
          }}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md flex items-center"
        >
          <PlusCircle size={20} className="mr-2" />
          Add User
        </button>
      </div>

      <div className="shadow-md rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead
            className={`bg-gray-50 ${
              isDarkMode ? "bg-gray-700 text-gray-200" : "text-gray-700"
            }`}
          >
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider w-1/4">
                {headers[0]}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider w-1/4">
                {headers[1]}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider w-1/6">
                {headers[2]}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider w-1/6">
                {headers[3]}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider w-1/6">
                {headers[4]}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {users.map((user) => (
              <tr
                key={user.id}
                className={
                  isDarkMode ? "bg-gray-800 text-gray-200" : "bg-white"
                }
              >
                <td className="px-6 py-4 w-1/4">{user.name}</td>
                <td className="px-6 py-4 w-1/4">{user.email}</td>
                <td className="px-6 py-4 w-1/6">{user.role}</td>
                <td className="px-6 py-4 w-1/6">
                  <div className="w-20">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {user.status}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 w-1/6">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => toggleUserStatus(user.id)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      {user.status === "Active" ? (
                        <ToggleRight size={20} />
                      ) : (
                        <ToggleLeft size={20} />
                      )}
                    </button>
                    <button
                      onClick={() => {
                        setCurrentUser(user);
                        setUserData({
                          name: user.name,
                          email: user.email,
                          role: user.role,
                          status: user.status,
                        });
                        setModalOpen(true);
                      }}
                      className="text-yellow-600 hover:text-yellow-900"
                    >
                      <Edit2 size={20} />
                    </button>
                    <button
                      onClick={() => deleteUser(user.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={modalOpen} closeModal={() => setModalOpen(false)}>
        <h3 className="text-lg font-semibold mb-4">
          {currentUser ? "Edit User" : "Add User"}
        </h3>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={userData.name}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
            className={`w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              isDarkMode
                ? "bg-gray-800 text-white border-gray-600"
                : "bg-white text-black border-gray-300"
            }`}
          />
          <input
            type="email"
            placeholder="Email"
            value={userData.email}
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
            className={`w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              isDarkMode
                ? "bg-gray-800 text-white border-gray-600"
                : "bg-white text-black border-gray-300"
            }`}
          />
          <select
            value={userData.role}
            onChange={(e) => setUserData({ ...userData, role: e.target.value })}
            className={`w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              isDarkMode
                ? "bg-gray-800 text-white border-gray-600"
                : "bg-white text-black border-gray-300"
            }`}
          >
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>
          <select
            value={userData.status}
            onChange={(e) =>
              setUserData({ ...userData, status: e.target.value })
            }
            className={`w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              isDarkMode
                ? "bg-gray-800 text-white border-gray-600"
                : "bg-white text-black border-gray-300"
            }`}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <div className="flex justify-end">
            <button
              onClick={handleSaveUser}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              {currentUser ? "Save Changes" : "Add User"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default UserManagement;
