import { Column } from "@tanstack/react-table";
import { useState, useEffect } from "react";
import useFilterStore from "../../stores/filterStore";

function Filter({ column }: { column: Column<any, any> }) {
  const { filters, setFilter } = useFilterStore();
  const [inputValue, setInputValue] = useState<string | undefined>(
    filters[column.id as keyof typeof filters] as string | undefined
  );
  const [isDarkMode, setIsDarkMode] = useState(
    document.documentElement.classList.contains("dark")
  );

  // Sync local state with global zustand state
  useEffect(() => {
    setInputValue(
      filters[column.id as keyof typeof filters] as string | undefined
    );
  }, [filters, column.id]);

  // Use debounce to avoid frequent requests
  useEffect(() => {
    const timeout = setTimeout(() => {
      setFilter(column.id, inputValue);
    }, 300);

    return () => clearTimeout(timeout);
  }, [inputValue, setFilter, column.id]);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  // **Styles for light and dark themes**
  const baseStyles =
    "w-full border-b-2 text-sm font-light placeholder:font-light outline-none transition-all";

  const darkThemeStyles =
    "border-white/20 bg-transparent text-white/50 placeholder:text-white/40 focus:border-white/40 focus:placeholder:text-white/20";

  const lightThemeStyles =
    "border-[rgba(22,22,22,0.3)] bg-transparent text-[rgba(22,22,22,0.8)] placeholder:text-[rgba(22,22,22,0.6)] focus:border-[rgba(22,22,22,0.5)] focus:placeholder:text-[rgba(22,22,22,0.4)]";

  // **Styles for select elements**
  const selectBaseStyles =
    "w-full px-3 border-b-2 outline-none transition-all appearance-none";

  const selectDarkStyles =
    "border-white/20 bg-transparent text-white/50 focus:border-white/40";
  const selectLightStyles =
    "border-[rgba(22,22,22,0.3)] bg-transparent text-[rgba(22,22,22,0.8)] focus:border-[rgba(22,22,22,0.5)]";

  // **Dropdown item styles**
  const optionBaseStyles = "px-2 py-1";
  const optionDarkStyles = "bg-[#2D2D2D] text-white/50";
  const optionLightStyles =
    "bg-[rgba(22,22,22,0.05)] text-[rgba(22,22,22,0.8)]";

  // For text-based fields (e.g., name, email)
  if (column.id === "name" || column.id === "email") {
    return (
      <input
        className={`${baseStyles} ${
          isDarkMode ? darkThemeStyles : lightThemeStyles
        }`}
        placeholder={`Search by ${column.id}...`}
        type="text"
        value={inputValue ?? ""}
        onChange={(e) => setInputValue(e.target.value)}
      />
    );
  }

  // For numeric fields (e.g., ID)
  if (column.id === "id") {
    return (
      <input
        className={`${baseStyles} ${
          isDarkMode ? darkThemeStyles : lightThemeStyles
        }`}
        placeholder="Search ID"
        type="number"
        min="0"
        value={inputValue ?? ""}
        onChange={(e) => setInputValue(e.target.value)}
      />
    );
  }

  // For select fields (e.g., role)
  if (column.id === "role") {
    return (
      <div className="relative text-sm font-light">
        <select
          className={`${selectBaseStyles} ${
            isDarkMode ? selectDarkStyles : selectLightStyles
          }`}
          value={inputValue ?? ""}
          onChange={(e) => setInputValue(e.target.value)}
        >
          <option
            value=""
            className={`${optionBaseStyles} ${
              isDarkMode ? optionDarkStyles : optionLightStyles
            }`}
          >
            All
          </option>
          <option
            value="Admin"
            className={`${optionBaseStyles} ${
              isDarkMode ? optionDarkStyles : optionLightStyles
            }`}
          >
            Admin
          </option>
          <option
            value="Project Manager"
            className={`${optionBaseStyles} ${
              isDarkMode ? optionDarkStyles : optionLightStyles
            }`}
          >
            Project Manager
          </option>
          <option
            value="Team Member"
            className={`${optionBaseStyles} ${
              isDarkMode ? optionDarkStyles : optionLightStyles
            }`}
          >
            Team Member
          </option>
        </select>

        <span
          className={`absolute right-0 top-1/2 transform -translate-y-1/2 pointer-events-none ${
            isDarkMode ? "text-white/50" : "text-[rgba(22,22,22,0.5)]"
          }`}
        >
          ▼
        </span>
      </div>
    );
  }

  return null;
}

export default Filter;
