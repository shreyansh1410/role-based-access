import React, { useState, useRef, useContext } from "react";
import Modal from "../components/Modal";
import { useRoleContext } from "../context/RoleContext";
import { PlusCircle, Edit2, Trash2 } from "lucide-react";
import { ThemeContext } from "@/context/ThemeContext";

const RoleManagement = () => {
  const { roles, addRole, editRole, deleteRole } = useRoleContext();
  const [modalOpen, setModalOpen] = useState(false);
  const { isDarkMode } = useContext(ThemeContext);
  const [currentRole, setCurrentRole] = useState(null);
  const [permissions, setPermissions] = useState([]);
  const roleNameInputRef = useRef(null);

  const handleSaveRole = () => {
    const roleName = roleNameInputRef.current.value;
    if (currentRole) {
      editRole(currentRole.id, { name: roleName, permissions });
    } else {
      addRole({ name: roleName, permissions });
    }
    setModalOpen(false);
    setPermissions([]);
    setCurrentRole(null);
  };

  const handleEditRole = (id) => {
    const role = roles.find((role) => role.id === id);
    setCurrentRole(role);
    setPermissions(role.permissions);
    setModalOpen(true);
  };

  const handleDeleteRole = (id) => {
    deleteRole(id);
  };

  const handlePermissionChange = (permission) => {
    setPermissions((prev) =>
      prev.includes(permission)
        ? prev.filter((p) => p !== permission)
        : [...prev, permission]
    );
  };

  return (
    <div
      className={`container mx-auto p-6 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <div className="flex justify-between items-center mb-14">
        <h2 className="text-2xl font-semibold">Role Management</h2>
        <button
          onClick={() => {
            setCurrentRole(null);
            setPermissions([]);
            setModalOpen(true);
          }}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md flex items-center transition-colors duration-200"
        >
          <PlusCircle size={20} className="mr-2" />
          Add Role
        </button>
      </div>

      <div
        className={`shadow-md rounded-lg overflow-hidden ${
          isDarkMode ? "bg-gray-00 border border-gray-700" : "bg-white"
        }`}
      >
        <table
          className={`w-full table-auto ${
            isDarkMode ? "bg-gray-800 text-gray-200" : "bg-white text-black"
          }`}
        >
          <thead
            className={`bg-gray-50 ${
              isDarkMode ? "bg-gray-700 text-gray-200" : "text-gray-700"
            }`}
          >
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Permissions
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className={`divide-y ${isDarkMode && "bg-gray-800"}`}>
            {roles.map((role) => (
              <tr
                key={role.id}
                className={`hover:bg-gray-100 ${
                  isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"
                }`}
              >
                <td className="px-6 py-4">{role.name}</td>
                <td className="px-6 py-4">{role.permissions.join(", ")}</td>
                <td className="px-6 py-4 text-sm font-medium">
                  <button
                    onClick={() => handleEditRole(role.id)}
                    className="text-yellow-600 hover:text-yellow-900 mr-4"
                  >
                    <Edit2 size={20} />
                  </button>
                  <button
                    onClick={() => handleDeleteRole(role.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={modalOpen} closeModal={() => setModalOpen(false)}>
        <h3 className="text-lg font-semibold mb-4">
          {currentRole ? "Edit Role" : "Add Role"}
        </h3>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <input
            type="text"
            ref={roleNameInputRef}
            placeholder="Enter Role Name"
            defaultValue={currentRole ? currentRole.name : ""}
            className={`w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              isDarkMode
                ? "bg-gray-800 text-white border-gray-600"
                : "bg-white text-black border-gray-300"
            }`}
          />

          <div>
            <h4 className="font-semibold mb-2">Assign Permissions:</h4>
            <div className="space-y-2">
              {["Read", "Write", "Delete"].map((permission) => (
                <div key={permission} className="flex items-center">
                  <input
                    type="checkbox"
                    id={permission}
                    checked={permissions.includes(permission)}
                    onChange={() => handlePermissionChange(permission)}
                    className="mr-2"
                  />
                  <label htmlFor={permission}>{permission}</label>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleSaveRole}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors duration-200"
            >
              {currentRole ? "Save Changes" : "Add Role"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default RoleManagement;
