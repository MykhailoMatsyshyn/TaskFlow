import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./CustomDatePicker.scss";

interface CustomDatePickerProps {
  label: string;
  selectedDate: Date | null;
  onDateChange: (date: Date | null) => void;
  minDate?: Date | undefined;
  highlightRange?: { start: Date | null; end: Date | null };
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  label,
  selectedDate,
  onDateChange,
  minDate,
  highlightRange,
}) => {
  const formatDate = (date: Date | null): string => {
    if (!date) return "Select a date";
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="relative">
      <h3 className="text-gray-400 text-sm mb-1">{label}</h3>
      <DatePicker
        selected={selectedDate}
        onChange={onDateChange}
        showTimeInput
        dateFormat="MMM d, yyyy h:mm aa"
        minDate={minDate}
        dayClassName={(date) => {
          if (highlightRange?.start && highlightRange?.end) {
            if (date >= highlightRange.start && date <= highlightRange.end) {
              return "bg-green-500 text-white rounded-full";
            }
          }
          return "";
        }}
        popperPlacement="bottom-start"
        portalId="datepicker-portal"
        customInput={
          <button className="text-left text-white bg-transparent w-full">
            <span className="text-green-500 font-medium">
              {selectedDate ? formatDate(selectedDate) : "Select a date"}
            </span>
          </button>
        }
      />
    </div>
  );
};

export default CustomDatePicker;
