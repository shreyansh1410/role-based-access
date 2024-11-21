import React, { createContext, useState, useContext } from "react";

// Create the context
const UserContext = createContext();

// Create a custom hook to use the UserContext
export const useUserContext = () => {
  return useContext(UserContext);
};

// Provider component to wrap your application
export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      role: "Admin",
      status: "Active",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      role: "User",
      status: "Inactive",
    },
  ]);

  // Add new user
  const addUser = (user) => {
    setUsers((prevUsers) => [
      ...prevUsers,
      { id: Date.now(), ...user }, // Assuming each user has a unique ID based on timestamp
    ]);
  };

  // Edit existing user
  const editUser = (id, updatedUser) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, ...updatedUser } : user
      )
    );
  };

  // Delete user
  const deleteUser = (id) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
  };

  // Toggle user status (Active/Inactive)
  const toggleUserStatus = (id) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id
          ? {
              ...user,
              status: user.status === "Active" ? "Inactive" : "Active",
            }
          : user
      )
    );
  };

  // Assign or change user role
  const assignRole = (id, role) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === id ? { ...user, role } : user))
    );
  };

  return (
    <UserContext.Provider
      value={{
        users,
        addUser,
        editUser,
        deleteUser,
        toggleUserStatus,
        assignRole,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
