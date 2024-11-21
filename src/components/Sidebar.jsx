import React from "react";
import { Users, ShieldCheck } from "lucide-react";

const Sidebar = ({ sidebarOpen, setSidebarOpen, activeTab, setActiveTab }) => {
  return (
    <div
      className={`
      fixed inset-y-0 left-0 z-30 w-64 
      transform transition-transform duration-300 
      ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      bg-white dark:bg-gray-800 
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
          className="md:hidden text-gray-600 dark:text-gray-300"
        >
          ✕
        </button>
      </div>

      <nav className="p-4">
        <button
          onClick={() => setActiveTab("users")}
          className={`
            flex items-center w-full p-2 mb-2 rounded 
            ${
              activeTab === "users"
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-200 dark:hover:bg-gray-700"
            }
          `}
        >
          <Users className="mr-2" /> User Management
        </button>

        <button
          onClick={() => setActiveTab("roles")}
          className={`
            flex items-center w-full p-2 mb-2 rounded 
            ${
              activeTab === "roles"
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-200 dark:hover:bg-gray-700"
            }
          `}
        >
          <ShieldCheck className="mr-2" /> Role Management
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
