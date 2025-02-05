import { useMemo } from "react";
import { Task } from "../../types/task";

/**
 * Custom hook for filtering tasks by the selected project.
 *
 * @param {Task[]} tasks - The list of tasks to filter.
 * @param {number | null} selectedProject - The ID of the selected project, or null to show all tasks.
 * @returns {Task[]} - The filtered list of tasks based on the selected project.
 */
export const useFilteredTasks = (
  tasks: Task[],
  selectedProject: number | null
) => {
  return useMemo(() => {
    return selectedProject
      ? tasks.filter((task) => task.projectId === selectedProject)
      : tasks;
  }, [tasks, selectedProject]);
};
