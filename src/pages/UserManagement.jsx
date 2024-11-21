import React, { useState } from "react";
import { useUserContext } from "../context/UserContext";
import Modal from "../components/Modal";
import Header from "../components/Header";
import Footer from "../components/Footer";

const UserManagement = () => {
  const { users, addUser, editUser, deleteUser, toggleUserStatus, assignRole } =
    useUserContext();
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

  return (
    <div>
      <div className="container mx-auto p-4">
        <button
          onClick={() => {
            resetForm();
            setModalOpen(true);
          }}
          className="bg-green-500 text-white px-4 py-2 rounded-md"
        >
          Add User
        </button>

        <div className="user-list mt-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="user-item p-2 flex justify-between items-center bg-gray-100 mb-2 rounded"
            >
              <span>{user.name}</span>
              <span>{user.email}</span>
              <span>{user.role}</span>
              <span>{user.status}</span>
              <button
                onClick={() => toggleUserStatus(user.id)}
                className="text-yellow-500"
              >
                {user.status === "Active" ? "Deactivate" : "Activate"}
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
                className="text-blue-500"
              >
                Edit
              </button>
              <button
                onClick={() => deleteUser(user.id)}
                className="text-red-500"
              >
                Delete
              </button>
            </div>
          ))}
        </div>

        <Modal isOpen={modalOpen} closeModal={() => setModalOpen(false)}>
          <h3 className="text-lg font-semibold">
            {currentUser ? "Edit User" : "Add User"}
          </h3>

          <form onSubmit={(e) => e.preventDefault()}>
            <div className="mt-4">
              <input
                type="text"
                placeholder="Name"
                value={userData.name}
                onChange={(e) =>
                  setUserData({ ...userData, name: e.target.value })
                }
                className="p-2 border rounded w-full"
              />
            </div>
            <div className="mt-4">
              <input
                type="email"
                placeholder="Email"
                value={userData.email}
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
                className="p-2 border rounded w-full"
              />
            </div>
            <div className="mt-4">
              <select
                value={userData.role}
                onChange={(e) =>
                  setUserData({ ...userData, role: e.target.value })
                }
                className="p-2 border rounded w-full"
              >
                <option value="User">User</option>
                <option value="Admin">Admin</option>
              </select>
            </div>

            <div className="mt-4">
              <select
                value={userData.status}
                onChange={(e) =>
                  setUserData({ ...userData, status: e.target.value })
                }
                className="p-2 border rounded w-full"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                onClick={handleSaveUser}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                {currentUser ? "Save Changes" : "Add User"}
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default UserManagement;
