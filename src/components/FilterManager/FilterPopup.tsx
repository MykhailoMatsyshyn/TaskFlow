import React from "react";
import { IoClose } from "react-icons/io5";

interface FilterPopupProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

/**
 * FilterPopup Component
 *
 * A reusable popup for displaying task and project filters.
 * Supports smooth animations, auto-closing on outside clicks, and flexible styling.
 *
 * @param {FilterPopupProps} props - The component props
 * @returns {JSX.Element} - A styled filter popup
 */
const FilterPopup: React.FC<FilterPopupProps> = ({
  isOpen,
  onClose,
  children,
  className = "",
}) => {
  return (
    <div
      className={`absolute right-0 py-4 px-5 rounded shadow-lg bg-neutral-background border border-[#BEDBB0] border-opacity-[50%] z-50 transition-all duration-300 transform ${
        isOpen
          ? "opacity-100 scale-100 pointer-events-auto"
          : "opacity-0 scale-95 pointer-events-none"
      } ${className}`}
    >
      {/* Header with close button */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-text font-semibold text-lg">Filters</h3>
        <button
          onClick={onClose}
          className="text-text opacity-50 hover:opacity-100 transition"
          aria-label="Close"
        >
          <IoClose size={20} />
        </button>
      </div>

      <hr className="border-text opacity-30 mb-4" />

      {/* Scrollable filter content */}
      <div className="overflow-y-auto max-h-[320px] popup-content custom-scrollbar mr-[-12px] pr-[8px]">
        {children}
      </div>
    </div>
  );
};

export default FilterPopup;
