import React from "react";
import useTaskFilterStore from "../../../stores/TaskFilterStore";
import { PriorityPicker } from "../../Forms/ProjectManagementForms/components";

const PriorityFilter: React.FC = () => {
  const setFilter = useTaskFilterStore((state) => state.setFilter);
  const currentPriority = useTaskFilterStore((state) => state.filters.priority);

  const handlePriorityChange = (priority: string) => {
    setFilter("priority", priority === "all" ? "" : priority);
  };

  return (
    <div className="flex flex-col items-start gap-2">
      <div className="flex items-center justify-between w-full text-text">
        <h4>Priority</h4>
        <button
          onClick={() => handlePriorityChange("all")}
          className="opacity-50 text-sm font-light underline hover:text-text hover:opacity-100  transition"
        >
          Show all
        </button>
      </div>

      <PriorityPicker
        hideLabel
        onPriorityChange={handlePriorityChange}
        value={currentPriority || " "}
      />
    </div>
  );
};

export default PriorityFilter;
