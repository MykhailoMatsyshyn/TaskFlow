import React from "react";
import useTasksFilterStore from "../../../stores/filters/TasksFilterStore";
import { PriorityPicker } from "../../Forms/ProjectManagementForms/components";

/**
 * PriorityFilter Component
 *
 * Allows users to filter tasks by priority using a dropdown selector.
 * Integrated with Zustand for state management.
 *
 * Features:
 * - Updates the global task filter state when a priority is selected.
 * - Provides an option to reset the priority filter.
 *
 * @returns {JSX.Element} - A filter component for task priority.
 */
const PriorityFilter: React.FC = () => {
  // Access Zustand store to manage task filters
  const setFilter = useTasksFilterStore((state) => state.setFilter);
  const currentPriority = useTasksFilterStore(
    (state) => state.filters.priority
  );

  // Handle priority selection change
  const handlePriorityChange = (priority: string) => {
    setFilter("priority", priority === "all" ? "" : priority);
  };

  return (
    <div className="flex flex-col items-start gap-2">
      {/* Filter Header with Reset Option */}
      <div className="flex items-center justify-between w-full text-text">
        <h4>Priority</h4>
        <button
          onClick={() => handlePriorityChange("all")}
          className="opacity-50 text-sm font-light underline hover:text-text hover:opacity-100 transition"
        >
          Show all
        </button>
      </div>

      {/* Priority Picker Component */}
      <PriorityPicker
        hideLabel
        onPriorityChange={handlePriorityChange}
        value={currentPriority || " "}
      />
    </div>
  );
};

export default PriorityFilter;
