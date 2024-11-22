import React from "react";
import { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";

const MainHeading = () => {
  const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);
  return (
    <div>
      <h1 className={` text-3xl font-semibold text-center ${isDarkMode? "text-gray-200 bg-gray-900" : "text-gray-700 bg-white"}`}>
        Role Based Access Control
      </h1>
    </div>
  );
};

export default MainHeading;
