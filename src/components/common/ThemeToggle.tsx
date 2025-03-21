"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="fixed bottom-4 right-4 p-3 rounded-full bg-primary-600 text-white shadow-lg 
                 hover:bg-primary-700 transition-all duration-300 hover:shadow-xl hover:scale-105
                 dark:bg-primary-500 dark:hover:bg-primary-600 z-50"
      aria-label="Cambiar tema"
    >
      {theme === "light" ? (
        <Moon className="w-5 h-5" />
      ) : (
        <Sun className="w-5 h-5" />
      )}
    </button>
  );
}
