import React, { useState, useRef } from "react";
import Modal from "../components/Modal";
import { useRoleContext } from "../context/RoleContext";

const RoleManagement = () => {
  const { roles, addRole, editRole, deleteRole } = useRoleContext();
  const [modalOpen, setModalOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState(null);
  const [permissions, setPermissions] = useState([]);
  const roleNameInputRef = useRef(null);

  const handleSaveRole = () => {
    const roleName = roleNameInputRef.current.value;

    if (currentRole) {
      // If editing an existing role, use editRole
      editRole(currentRole.id, {
        name: roleName,
        permissions: permissions,
      });
    } else {
      // If adding a new role, use addRole
      addRole({
        name: roleName,
        permissions: permissions,
      });
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
    setPermissions((prevPermissions) =>
      prevPermissions.includes(permission)
        ? prevPermissions.filter((perm) => perm !== permission)
        : [...prevPermissions, permission]
    );
  };

  return (
    <div>
      <button
        onClick={() => {
          setCurrentRole(null);
          setPermissions([]);
          setModalOpen(true);
        }}
        className="bg-green-500 text-white px-4 py-2 rounded-md"
      >
        Add Role
      </button>

      <div className="role-list mt-4">
        {roles.map((role) => (
          <div
            key={role.id}
            className="role-item p-2 flex justify-between items-center bg-gray-100 mb-2 rounded"
          >
            <span>{role.name}</span>
            <span>{role.permissions.join(", ")}</span>
            <button
              onClick={() => handleEditRole(role.id)}
              className="text-blue-500"
            >
              Edit
            </button>
            <button
              onClick={() => handleDeleteRole(role.id)}
              className="text-red-500"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      <Modal isOpen={modalOpen} closeModal={() => setModalOpen(false)}>
        <h3 className="text-lg font-semibold">
          {currentRole ? "Edit Role" : "Add Role"}
        </h3>

        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mt-4">
            <input
              type="text"
              ref={roleNameInputRef}
              placeholder="Enter Role Name"
              defaultValue={currentRole ? currentRole.name : ""}
              className="p-2 border rounded w-full"
            />
          </div>

          <div className="mt-4">
            <h4 className="font-semibold">Assign Permissions:</h4>
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

          <div className="mt-4 flex justify-end">
            <button
              onClick={handleSaveRole}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
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
