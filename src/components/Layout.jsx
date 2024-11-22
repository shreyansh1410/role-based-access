import React, { useState } from "react";
import { Users, ShieldCheck, Menu } from "lucide-react";
import { RoleProvider } from "../context/RoleContext";
import { UserProvider } from "../context/UserContext";
import { ThemeProvider, useTheme } from "../context/ThemeContext";
import RoleManagement from "./RoleManagement";
import UserManagement from "./UserManagement";
import Header from "./Header";

const LayoutContent = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("users");
  const { isDarkMode } = useTheme();

  const renderContent = () => {
    switch (activeTab) {
      case "users":
        return <UserManagement />;
      case "roles":
        return <RoleManagement />;
      default:
        return <UserManagement />;
    }
  };

  return (
    <div className={`flex h-screen ${isDarkMode ? "dark" : ""}`}>
      {/* Sidebar */}
      <div
        className={`
        fixed inset-y-0 left-0 z-30 w-64 
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        bg-white dark:bg-gray-700 
        shadow-lg
        md:relative md:translate-x-0
      `}
      >
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
            Admin Dashboard
          </h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
          >
            ✕
          </button>
        </div>

        <nav className="p-4">
          <button
            onClick={() => setActiveTab("users")}
            className={`
              flex items-center w-full p-2 mb-2 rounded transition-colors duration-200
              ${
                activeTab === "users"
                  ? "bg-blue-500 text-white"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }
            `}
          >
            <Users className="mr-2 w-5 h-5" /> User Management
          </button>

          <button
            onClick={() => setActiveTab("roles")}
            className={`
              flex items-center w-full p-2 mb-2 rounded transition-colors duration-200
              ${
                activeTab === "roles"
                  ? "bg-blue-500 text-white"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }
            `}
          >
            <ShieldCheck className="mr-2 w-5 h-5" /> Role Management
          </button>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden bg-gray-300 dark:bg-gray-700">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Main Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-300 dark:bg-gray-900 p-4">
          <RoleProvider>
            <UserProvider>{renderContent()}</UserProvider>
          </RoleProvider>
        </main>

        {/* Footer */}
        <footer className="bg-white dark:bg-gray-700 p-4 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            © 2024 Admin Dashboard. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
};

const Layout = () => (
  <ThemeProvider>
    <LayoutContent />
  </ThemeProvider>
);

export default Layout;
