import { useEffect, useState } from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";

const ThemeToggle = ({ compact = false }) => {
  const [isDark, setIsDark] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  useEffect(() => {
    const syncTheme = () => {
      setIsDark(localStorage.getItem("theme") === "dark");
    };

    window.addEventListener("themechange", syncTheme);
    return () => window.removeEventListener("themechange", syncTheme);
  }, []);

  const toggleTheme = () => {
    setIsDark((value) => {
      const nextValue = !value;
      localStorage.setItem("theme", nextValue ? "dark" : "light");
      window.dispatchEvent(new Event("themechange"));
      return nextValue;
    });
  };

  return (
    <button
      type='button'
      onClick={toggleTheme}
      className={compact
        ? "flex h-10 w-10 items-center justify-center rounded-full text-xl text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
        : "flex items-center gap-2 rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? <MdLightMode aria-hidden='true' /> : <MdDarkMode aria-hidden='true' />}
      {!compact && (isDark ? "Light mode" : "Dark mode")}
    </button>
  );
};

export default ThemeToggle;
