"use client";
import React from "react";
import { useTheme } from "@/context/ThemeContext";
import { themes } from "@/styles/themes";

interface ModeToggleProps {
  mode: string;
  toggleMode: () => void;
}

const ModeToggle: React.FC = () => {
  const { mode, toggleMode, theme } = useTheme();
  return (
    <button
      className=" absolute top-10 right-0 m-2"
      onClick={toggleMode}
      style={{ color: theme === themes.light ? "black" : "white" }}
    >
      {mode === "view" ? "Switch to Set Mode" : "Switch to View Mode"}
    </button>
  );
};

export default ModeToggle;
