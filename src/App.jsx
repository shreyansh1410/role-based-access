import React from "react";
import { UserProvider } from "./context/UserContext"; // Import UserProvider
import { RoleProvider } from "./context/RoleContext"; // Import RoleProvider
import { ThemeProvider } from "./context/ThemeContext"; // Import ThemeProvider for dark/light mode
import UserManagement from "./pages/UserManagement"; // Adjusted path based on your folder structure
import RoleManagement from "./pages/RoleManagement"; // Adjusted path based on your folder structure
import Header from "./components/Header"; // Assuming you have a Header component
import Footer from "./components/Footer"; // Assuming you have a Footer component

const App = () => {
  return (
    <ThemeProvider>
      <UserProvider>
        <RoleProvider>
          <div className="app">
            <Header /> {/* Add Header for dark/light toggle and app title */}
            <h1 className="text-3xl font-semibold text-center mb-4">
              Role and User Management
            </h1>
            {/* User Management Component */}
            <UserManagement />
            {/* Role Management Component */}
            <RoleManagement />
            <Footer /> {/* Add Footer at the bottom */}
          </div>
        </RoleProvider>
      </UserProvider>
    </ThemeProvider>
  );
};

export default App;
