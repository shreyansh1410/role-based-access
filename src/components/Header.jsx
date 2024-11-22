import React, { useContext } from "react";
import { Sun, Moon } from "lucide-react";
import { ThemeContext } from "../context/ThemeContext";

const Header = () => {
  const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);

  return (
    <header
      className={` text-gray-300 ${
        isDarkMode ? "shadow-gray-900 shadow-lg bg-gray-900" : "shadow-gray-300 shadow-lg"
      } md:px-[50px]`}
    >
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <h1
          className={`${
            isDarkMode
              ? "text-2xl font-bold text-gray-300"
              : "text-2xl font-bold text-gray-700"
          }`}
        >
          RBAC by Shreyansh
        </h1>
        <button
          onClick={toggleDarkMode}
          className="p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-colors duration-200"
          aria-label={
            isDarkMode ? "Switch to light mode" : "Switch to dark mode"
          }
        >
          {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
        </button>
      </div>
    </header>
  );
};

export default Header;
