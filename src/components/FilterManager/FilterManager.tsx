import React, { useState, useRef, useEffect } from "react";
import { FiFilter } from "react-icons/fi";
import FilterPopup from "./FilterPopup";
import useTasksFilterStore from "../../stores/filters/TasksFilterStore";
import PriorityFilter from "./components/PriorityFilter";
import StatusFilter from "./components/StatusFilter";
import TeamMemberFilter from "./components/TeamMemberFilter";
import { TASK_STATUSES } from "../../constants/statuses";

interface FilterManagerProps {
  className?: string;
}

/**
 * FilterManager Component
 *
 * Manages task filters and displays a filter popup.
 * Supports filtering tasks by status, priority, and team members.
 *
 * @returns {JSX.Element} - Renders a filter button and popup filter menu.
 */
const FilterManager: React.FC<FilterManagerProps> = ({ className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  // Access Zustand store for task filters
  const setFilter = useTasksFilterStore((state) => state.setFilter);
  const currentStatus = useTasksFilterStore((state) => state.filters.status);

  // Toggle filter popup visibility
  const toggleFilterPopup = () => setIsOpen((prev) => !prev);

  // Close popup on outside click
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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className={`relative mr-[20px] text-sm font-light ${className}`}
      ref={popupRef}
    >
      {/* Filter toggle button */}
      <button
        onClick={toggleFilterPopup}
        className="flex items-center gap-2 h-[40px] px-3 py-2 text-sm text-text bg-transparent border border-[--text-color-transparent] rounded hover:bg-white/10 transition"
      >
        <FiFilter size={20} />
        Filters
      </button>

      {/* Filter popup */}
      <FilterPopup
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        className="w-[270px] top-12"
      >
        <StatusFilter
          statuses={TASK_STATUSES}
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
