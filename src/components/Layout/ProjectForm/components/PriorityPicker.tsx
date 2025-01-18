import React, { useState } from "react";
import Radio from "@mui/material/Radio";

interface PriorityPickerProps {
  onPriorityChange: (priority: string) => void;
  initialPriority?: string;
}

const PriorityPicker: React.FC<PriorityPickerProps> = ({
  onPriorityChange,
  initialPriority = "No",
}) => {
  const [selectedPriority, setSelectedPriority] = useState(initialPriority);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPriority = event.target.value;
    setSelectedPriority(newPriority);
    onPriorityChange(newPriority);
  };

  const priorityOptions = [
    {
      value: "Without priority",
      label: "No",
      color: "rgba(255, 255, 255, 0.3)",
      size: 12,
    },
    { value: "Low", label: "Low", color: "#8FA1D0", size: 16 },
    { value: "Medium", label: "Medium", color: "#E09CB5", size: 20 },
    { value: "High", label: "High", color: "#BEDBB0", size: 24 },
  ];

  return (
    <div>
      <label className="block mb-[14px]">Priority</label>
      <ul className="flex items-center gap-2">
        {priorityOptions.map((priority) => (
          <li
            key={priority.value}
            className="relative flex flex-col items-center group"
          >
            <Radio
              checked={selectedPriority === priority.value}
              onChange={handleChange}
              value={priority.value}
              name="priority"
              sx={{
                color: priority.color,
                "&.Mui-checked": {
                  color: priority.color,
                },
                "& .MuiSvgIcon-root": {
                  fontSize: `${priority.size}px`,
                },
              }}
            />

            <span
              className={`font-normal text-[12px] tracking-[-0.02em] text-white/50 opacity-0 transition-opacity duration-200 
              group-hover:opacity-100 group-focus-within:opacity-100 ${
                selectedPriority === priority.value ? "opacity-100" : ""
              }`}
            >
              {priority.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PriorityPicker;
