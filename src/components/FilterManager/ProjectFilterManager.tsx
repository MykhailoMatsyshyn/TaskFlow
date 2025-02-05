import React, { useState, useRef, useEffect } from "react";
import { FiFilter } from "react-icons/fi";
import FilterPopup from "./FilterPopup";
import useProjectsFilterStore from "../../stores/filters/ProjectsFilterStore";
import StatusFilter from "./components/StatusFilter";
import TeamMemberFilter from "./components/TeamMemberFilter";
import { PROJECT_STATUSES } from "../../constants/statuses";

/**
 * ProjectFilterManager Component
 *
 * Manages project filters and displays a filter popup.
 * Supports filtering projects by status and team members.
 *
 * @returns {JSX.Element} - Renders a filter button and popup filter menu.
 */
const ProjectFilterManager: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  // Access Zustand store for project filters
  const setFilter = useProjectsFilterStore((state) => state.setFilter);
  const currentStatus = useProjectsFilterStore((state) => state.filters.status);

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
    <div className="relative text-sm font-light" ref={popupRef}>
      {/* Filter toggle button */}
      <button
        onClick={toggleFilterPopup}
        className={`flex items-center gap-1 text-xs transition ${
          isOpen ? "text-text" : "text-text opacity-50 hover:text-text"
        }`}
      >
        <FiFilter size={14} />
        Filters
      </button>

      {/* Filter popup */}
      <FilterPopup
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        className="w-[197px] md:w-[232px] top-6"
      >
        <StatusFilter
          statuses={PROJECT_STATUSES}
          currentStatus={currentStatus}
          setFilter={setFilter}
          onReset={() => setFilter("status", "")}
        />
        <TeamMemberFilter isProjectFilter={true} />
      </FilterPopup>
    </div>
  );
};

export default ProjectFilterManager;
