import { Column } from "@tanstack/react-table";
import { useState, useEffect } from "react";
import useFilterStore from "../../stores/filterStore";

function Filter({ column }: { column: Column<any, any> }) {
  const { filters, setFilter } = useFilterStore();
  const [inputValue, setInputValue] = useState<string | undefined>(
    filters[column.id as keyof typeof filters] as string | undefined
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

  // For text-based fields (e.g., name, email)
  if (column.id === "name" || column.id === "email") {
    return (
      <input
        className="w-full border-b-2 border-white/20 bg-transparent text-white/50 text-sm font-light placeholder:text-white/40 placeholder:font-light outline-none focus:border-white/40 focus:placeholder:text-white/20 transition-all"
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
        className="w-24 border-b-2 border-white/20 bg-transparent text-white/50 text-sm font-light placeholder:text-white/40 placeholder:font-light outline-none focus:border-white/40 focus:placeholder:text-white/20 transition-all"
        placeholder={`Search ID`}
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
          className="w-full px-3 border-b-2 border-white/20 bg-transparent text-white/50 outline-none focus:border-white/40 transition-all appearance-none"
          value={inputValue ?? ""}
          onChange={(e) => setInputValue(e.target.value)}
        >
          <option value="" className="bg-[#2D2D2D] text-white/50">
            All
          </option>
          <option value="Admin" className="bg-[#2D2D2D] text-white/50">
            Admin
          </option>
          <option
            value="Project Manager"
            className="bg-[#2D2D2D] text-white/50"
          >
            Project Manager
          </option>
          <option value="Team Member" className="bg-[#2D2D2D] text-white/50">
            Team Member
          </option>
        </select>

        <span className="absolute right-0 top-1/2 transform -translate-y-1/2 pointer-events-none text-white/50">
          ▼
        </span>
      </div>
    );
  }

  return null;
}

export default Filter;
