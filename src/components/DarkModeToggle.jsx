import React from "react";
import { Moon, Sun } from "lucide-react";

const DarkModeToggle = ({ darkMode, toggleDarkMode }) => {
  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
      aria-label={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      {darkMode ? (
        <Sun className="text-yellow-500" />
      ) : (
        <Moon className="text-indigo-500" />
      )}
    </button>
  );
};

export default DarkModeToggle;
