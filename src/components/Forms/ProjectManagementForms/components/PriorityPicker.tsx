import React from "react";
import Radio from "@mui/material/Radio";

interface PriorityPickerProps {
  value: string;
  onPriorityChange: (priority: string) => void;
  hideLabel?: boolean;
}

const PriorityPicker: React.FC<PriorityPickerProps> = ({
  value,
  onPriorityChange,
  hideLabel = false,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPriority = event.target.value;
    onPriorityChange(newPriority);
  };

  const priorityOptions = [
    {
      value: "Without priority",
      label: "No",
      color: "#B7B7B7",
      size: 12,
    },
    { value: "Low", label: "Low", color: "#8FA1D0", size: 16 },
    { value: "Medium", label: "Medium", color: "#E09CB5", size: 20 },
    { value: "High", label: "High", color: "#BEDBB0", size: 24 },
  ];

  return (
    <div>
      {!hideLabel && <label className="block mb-[14px]">Priority</label>}
      <ul className="flex items-center gap-2">
        {priorityOptions.map((priority) => (
          <li
            key={priority.value}
            className="relative flex flex-col items-center group"
          >
            <Radio
              checked={value === priority.value}
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
              className={`font-normal text-[12px] tracking-[-0.02em] text-text opacity-0 transition-opacity duration-200 
              group-hover:opacity-100 group-focus-within:opacity-100 ${
                value === priority.value ? "opacity-100" : ""
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
