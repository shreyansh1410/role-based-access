import React from "react";
import { UserProvider } from "./context/UserContext"; // Import UserProvider
import { RoleProvider } from "./context/RoleContext"; // Import RoleProvider
import UserManagement from "./pages/UserManagement"; // Adjusted path based on your folder structure
import RoleManagement from "./pages/RoleManagement"; // Adjusted path based on your folder structure

const App = () => {
  return (
    <UserProvider>
      <RoleProvider>
        <div className="app">
          <h1 className="text-3xl font-semibold">Role and User Management</h1>

          {/* User Management Component */}
          <UserManagement />

          {/* Role Management Component */}
          <RoleManagement />
        </div>
      </RoleProvider>
    </UserProvider>
  );
};

export default App;
