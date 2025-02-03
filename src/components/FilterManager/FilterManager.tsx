import React, { useState, useRef, useEffect } from "react";
import { FiFilter } from "react-icons/fi";
import FilterPopup from "./FilterPopup";
import useTaskFilterStore from "../../stores/TaskFilterStore";
import PriorityFilter from "./components/PriorityFilter";
import StatusFilter from "./components/StatusFilter";
import TeamMemberFilter from "./components/TeamMemberFilter";

const statuses = [
  { label: "To Do", color: "#8FA1D0" },
  { label: "In Progress", color: "#E09CB5" },
  { label: "Done", color: "#BEDBB0" },
  { label: "All", color: "#B7B7B7" },
];

interface FilterManagerProps {
  className?: string;
}

const FilterManager: React.FC<FilterManagerProps> = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const setFilter = useTaskFilterStore((state) => state.setFilter);
  const currentStatus = useTaskFilterStore((state) => state.filters.status);

  const toggleFilterPopup = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={`relative mr-[20px] text-sm font-light ${className}`}
      ref={popupRef}
    >
      <button
        onClick={toggleFilterPopup}
        className="flex items-center gap-2 h-[40px] px-3 py-2 text-sm text-text bg-transparent border border-[--text-color-transparent] rounded hover:bg-white/10 transition"
      >
        <FiFilter size={20} />
        Filters
      </button>

      <FilterPopup
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        className="w-[270px] top-12"
      >
        <StatusFilter
          statuses={statuses}
          currentStatus={currentStatus}
          setFilter={setFilter}
          onReset={() => setFilter("status", "")}
        />
        <PriorityFilter />
        <TeamMemberFilter />
      </FilterPopup>
    </div>
  );
};

export default FilterManager;
