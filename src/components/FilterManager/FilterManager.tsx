import React, { useState, useRef, useEffect } from "react";
import { FiFilter } from "react-icons/fi";
import FilterPopup from "./FilterPopup";

const FilterManager: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

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
    <div className="relative mr-[20px]" ref={popupRef}>
      <button
        onClick={toggleFilterPopup}
        className="flex items-center gap-2 h-[40px] px-3 py-2 text-sm text-white bg-transparent border border-white/20 rounded hover:bg-white/10 transition"
      >
        <FiFilter size={20} />
        Filters
      </button>

      <FilterPopup isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <p className="text-sm text-white/50">Filter options go here...</p>
      </FilterPopup>
    </div>
  );
};

export default FilterManager;
