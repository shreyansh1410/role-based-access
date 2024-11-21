import React, { createContext, useState, useContext } from "react";

// Create the context
const RoleContext = createContext();

// Create a custom hook to use the RoleContext
export const useRoleContext = () => {
  return useContext(RoleContext);
};

// Provider component to wrap your application
export const RoleProvider = ({ children }) => {
  const [roles, setRoles] = useState([
    { id: 1, name: "Admin", permissions: ["Read", "Write", "Delete"] },
    { id: 2, name: "User", permissions: ["Read"] },
  ]);

  // Add new role
  const addRole = (role) => {
    setRoles((prevRoles) => [
      ...prevRoles,
      { id: Date.now(), name: role.name, permissions: role.permissions },
    ]);
  };

  // Edit existing role
  const editRole = (id, updatedRole) => {
    setRoles((prevRoles) =>
      prevRoles.map((role) =>
        role.id === id ? { ...role, ...updatedRole } : role
      )
    );
  };

  // Delete role
  const deleteRole = (id) => {
    setRoles((prevRoles) => prevRoles.filter((role) => role.id !== id));
  };

  return (
    <RoleContext.Provider value={{ roles, addRole, editRole, deleteRole }}>
      {children}
    </RoleContext.Provider>
  );
};
