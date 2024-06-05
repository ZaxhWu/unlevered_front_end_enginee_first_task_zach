"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { Theme } from "@/types/Theme";
import { themes } from "@/styles/themes";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  mode: string;
  toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
export const ThemeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [mode, setMode] = useState("view");

  const [theme, setTheme] = useState(themes.dark);

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === "view" ? "set" : "view"));
  };
  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === themes.light ? themes.dark : themes.light
    );
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        mode,
        toggleMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
