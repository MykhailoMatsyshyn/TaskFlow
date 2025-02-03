import React, { useState } from "react";
import Radio from "@mui/material/Radio";

interface StatusPickerProps {
  onStatusChange: (status: string) => void;
  initialStatus?: string;
}

const StatusPicker: React.FC<StatusPickerProps> = ({
  onStatusChange,
  initialStatus,
}) => {
  const [selectedStatus, setSelectedStatus] = useState(initialStatus);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newStatus = event.target.value;
    setSelectedStatus(newStatus);
    onStatusChange(newStatus);
  };

  const statusOptions = [
    { value: "planned", label: "Planned", color: "#8FA1D0" },
    { value: "in-progress", label: "In Progress", color: "#E09CB5" },
    { value: "completed", label: "Completed", color: "#BEDBB0" },
  ];

  return (
    <div>
      <label className="block mb-[14px]">Status</label>
      <ul className="flex flex-col">
        {statusOptions.map((status) => (
          <li key={status.value} className="flex items-center gap-1">
            <label className="flex items-center gap-1 cursor-pointer">
              <Radio
                checked={selectedStatus === status.value}
                onChange={handleChange}
                value={status.value}
                name="status"
                sx={{
                  color: status.color,
                  "&.Mui-checked": {
                    color: status.color,
                  },
                }}
              />
              <span className="text-text opacity-50 text-sm font-medium">
                {status.label}
              </span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StatusPicker;
