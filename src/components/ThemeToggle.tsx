"use client";
import React from "react";
import { useTheme } from "@/context/ThemeContext";
import { themes } from "@/styles/themes";

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className="absolute top-0 right-0 m-2"
      onClick={toggleTheme}
      style={{ color: theme === themes.light ? "black" : "white" }}
    >
      {theme === themes.light ? "Switch to Dark Mode" : "Switch to Light Mode"}
    </button>
  );
};

export default ThemeToggle;
