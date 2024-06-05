"use client";
import React from "react";
import { useTheme } from "@/context/ThemeContext";

interface TextColorProps {
  keyName: string;
  value: number;
}

const TextColor: React.FC<TextColorProps> = ({ keyName, value }) => {
  const { theme, mode } = useTheme();

  const getColorClass = () => {
    switch (keyName) {
      case "market_ap":
        return value > 200 ? "text-green-500" : value < 1 ? "text-red-500" : "";
      case "shares_outstanding":
        return value > 10 ? "text-green-500" : value < 1 ? "text-red-500" : "";
      case "pe_ratio":
        return value < 15 ? "text-green-500" : value > 25 ? "text-red-500" : "";
      case "ps_ratio":
        return value < 2 ? "text-green-500" : value > 5 ? "text-red-500" : "";
      case "pb_ratio":
        return value < 1.5 ? "text-green-500" : value > 3 ? "text-red-500" : "";
      case "peg_ratio":
        return value < 1 ? "text-green-500" : value > 2 ? "text-red-500" : "";
      case "current_ratio":
        return value > 2 ? "text-green-500" : value < 1 ? "text-red-500" : "";
      case "debt_to_equity_ratio":
        return value < 0.5 ? "text-green-500" : value > 2 ? "text-red-500" : "";
      case "eps":
        return value > 2 ? "text-green-500" : value < 0.5 ? "text-red-500" : "";
      default:
        return theme.color;
    }
  };

  return <p className={getColorClass()}>{String(value)}</p>;
};

export default TextColor;
