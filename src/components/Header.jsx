import React, { useContext } from "react";
import { Sun, Moon } from "lucide-react"; // Import icons
import { ThemeContext } from "../context/ThemeContext"; // Create and use ThemeContext to manage dark/light mode

const Header = () => {
  const { isDarkMode, toggleDarkMode } = useContext(ThemeContext); // Use context for dark mode

  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <h1 className="text-xl">Role & User Management</h1>
      <button
        onClick={toggleDarkMode}
        className="p-2 bg-gray-700 rounded-full"
      >
        {isDarkMode ? <Moon size={20} /> : <Sun size={20} />}
      </button>
    </header>
  );
};

export default Header;
