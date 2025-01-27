import React, { useState, useRef, useEffect } from "react";
import { FiFilter } from "react-icons/fi";
import FilterPopup from "./FilterPopup";
import useProjectFilterStore from "../../stores/ProjectFilterStore";
import StatusFilter from "./components/StatusFilter";
import TeamMemberFilter from "./components/TeamMemberFilter";

const statuses = [
  { label: "Planned", color: "#8FA1D0" },
  { label: "In Progress", color: "#E09CB5" },
  { label: "Completed", color: "#BEDBB0" },
  { label: "All", color: "rgba(255, 255, 255, 0.5)" },
];

const ProjectFilterManager: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const setFilter = useProjectFilterStore((state) => state.setFilter);
  const currentStatus = useProjectFilterStore((state) => state.filters.status);

  const toggleFilterPopup = () => {
    setIsOpen((prev) => !prev);
  };

  const resetFilters = useProjectFilterStore((state) => state.resetFilters);

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
    <div className="relative text-sm font-light" ref={popupRef}>
      <button
        onClick={toggleFilterPopup}
        className={`flex items-center gap-1 text-xs transition ${
          isOpen ? "text-white" : "text-white/50 hover:text-white"
        }`}
      >
        <FiFilter size={14} />
        Filters
      </button>

      <FilterPopup
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        className="w-[232px]  top-6"
      >
        <StatusFilter
          statuses={statuses}
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
