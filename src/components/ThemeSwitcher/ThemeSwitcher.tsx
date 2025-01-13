import { useState, useEffect, useRef } from "react";
import { Icon } from "../Icon/Icon";

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState<string>(
    localStorage.getItem("theme") || "light"
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleThemeChange = (selectedTheme: string) => {
    setTheme(selectedTheme);
    setIsDropdownOpen(false);
  };

  return (
    <div className="text-[14px] tracking-[-0.02em] text-white/80">
      <button
        onClick={() => setIsDropdownOpen((prev) => !prev)}
        className="flex items-center justify-between gap-1 w-[68px]  font-medium"
      >
        Theme
        <Icon
          id="arrow-down"
          size={16}
          className={`fill-none  stroke-white/80 ${
            isDropdownOpen ? "rotate-180" : ""
          } `}
        />
      </button>

      {isDropdownOpen && (
        <div
          ref={dropdownRef}
          className="absolute right-0 mt-2 w-40 bg-gray-800 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none font-normal"
        >
          <ul className="py-1">
            <li>
              <button
                onClick={() => handleThemeChange("light")}
                className={`block w-full px-4 py-2 text-left  ${
                  theme === "light" ? "bg-gray-700" : ""
                }`}
              >
                Light
              </button>
            </li>
            <li>
              <button
                onClick={() => handleThemeChange("dark")}
                className={`block w-full px-4 py-2 text-left ${
                  theme === "dark" ? "bg-gray-700" : ""
                }`}
              >
                Dark
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ThemeSwitcher;

// import { useState, useEffect } from "react";

// const ThemeSwitcher = () => {
//   const [theme, setTheme] = useState<string>(
//     localStorage.getItem("theme") || "light"
//   );

//   useEffect(() => {
//     document.documentElement.className = theme;
//     localStorage.setItem("theme", theme);
//   }, [theme]);

//   const handleChangeTheme = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     setTheme(event.target.value);
//   };

//   return (
//     <div>
//       <label htmlFor="theme-selector" className="text-white">
//         Theme
//       </label>
//       <select
//         id="theme-selector"
//         value={theme}
//         onChange={handleChangeTheme}
//         className="bg-black text-white p-2 rounded"
//       >
//         <option value="light">Light</option>
//         <option value="dark">Dark</option>
//       </select>
//     </div>
//   );
// };

// export default ThemeSwitcher;
