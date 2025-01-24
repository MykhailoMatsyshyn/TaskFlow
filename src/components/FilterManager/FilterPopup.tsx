import React from "react";
import { IoClose } from "react-icons/io5";

interface FilterPopupProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const FilterPopup: React.FC<FilterPopupProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  return (
    <div
      className={`absolute top-12 right-0 w-64 bg-[#1f1f1f] p-4 rounded shadow-lg border border-[#BEDBB0] border-opacity-[50%] z-50 transition-all duration-300 transform ${
        isOpen
          ? "opacity-100 scale-100 pointer-events-auto"
          : "opacity-0 scale-95 pointer-events-none"
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-white font-semibold text-lg">Filters</h3>
        <button
          onClick={onClose}
          className="text-white/70 hover:text-white transition"
          aria-label="Close"
        >
          <IoClose size={20} />
        </button>
      </div>

      <hr className="border-white/30 mb-4" />

      {children}
    </div>
  );
};

export default FilterPopup;
