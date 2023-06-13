"use client";

import { useTheme } from "next-themes";
import { FaSun, FaRegMoon } from "react-icons/fa";

/**
 * Toggle app theme
 * @returns Node to render
 */
const ToggleDarkMode = () => {
  const { theme, setTheme } = useTheme();

  return (
      <button
        id="theme-toggle"
        type="button"
        className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none rounded-lg text-sm p-2.5 ml-2"
        onClick={() => (theme == "dark" ? setTheme("light") : setTheme("dark"))}
      >
        {theme === "dark" ? <FaSun className="text-white"/> : <FaRegMoon className="text-black"/>}
      </button>
  );
};

export default ToggleDarkMode;
