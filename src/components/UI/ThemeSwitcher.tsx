import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * ThemeSwitcher Component
 *
 * A theme toggle dropdown allowing users to switch between "light" and "dark" modes.
 * The selected theme is saved in `localStorage` and applied to the document root.
 *
 * Features:
 * - Saves the selected theme in local storage.
 * - Provides a dropdown with animation for switching themes.
 * - Closes when clicking outside the dropdown.
 * - Keeps the dropdown open after selecting a theme.
 */
const ThemeSwitcher: React.FC = () => {
  // State for theme and dropdown visibility
  const [theme, setTheme] = useState<"light" | "dark">(
    (localStorage.getItem("theme") as "light" | "dark") || "light"
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  // Refs for dropdown and button elements
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  // Apply the selected theme to the document and save to localStorage
  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Close dropdown when clicking outside of it
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  // Handle theme change without closing the dropdown
  const handleThemeChange = (selectedTheme: "light" | "dark") => {
    setTheme(selectedTheme);
  };

  // Animation settings for dropdown menu
  const dropdownAnimation = {
    initial: { opacity: 0, y: -15 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -15 },
    transition: { duration: 0.3 },
  };

  return (
    <div className="relative inline-block text-left">
      {/* Toggle button for dropdown */}
      <button
        ref={buttonRef}
        onClick={(e) => {
          e.stopPropagation();
          setIsDropdownOpen((prev) => !prev);
        }}
        className="flex items-center gap-1 h-full"
      >
        <span className="text-text opacity-80">Theme</span>
        <ChevronDown
          className={`w-4 h-4 text-text opacity-80 transition-transform duration-500 ${
            isDropdownOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown menu with animation */}
      <AnimatePresence>
        {isDropdownOpen && (
          <motion.div
            ref={dropdownRef}
            {...dropdownAnimation}
            className="absolute z-50 left-0 mt-2 w-[100px] bg-neutral-background text-text font-light rounded-lg border border-[#BEDBB0] shadow-lg ring-1 ring-black ring-opacity-5"
          >
            <ul className="py-2">
              {(["light", "dark"] as const).map((mode) => (
                <li key={mode}>
                  <button
                    onClick={() => handleThemeChange(mode)}
                    className={`block w-full px-4 py-2 text-left transition-all hover:text-[#BEDBB0] ${
                      theme === mode ? "text-[#BEDBB0]" : ""
                    }`}
                  >
                    {mode.charAt(0).toUpperCase() + mode.slice(1)}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemeSwitcher;
