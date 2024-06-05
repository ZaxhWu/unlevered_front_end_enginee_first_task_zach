"use client";
import { Theme } from "@/types/Theme";
export const themes: Record<string, Theme> = {
  light: {
    background: "bg-white",
    color: "text-black",
    borderColor: "black",
  },
  dark: {
    background: "bg-black",
    color: "text-white",
    borderColor: "white",
  },
};
