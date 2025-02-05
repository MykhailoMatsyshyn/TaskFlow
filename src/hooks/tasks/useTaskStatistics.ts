import { useMemo } from "react";
import { Task } from "../../types/task";
import { generateColor } from "../../utils/generateColors";

/**
 * Custom hook for calculating task statistics based on priorities and statuses.
 *
 * @param {Task[]} tasks - The list of tasks to analyze.
 * @returns {object} - An object containing:
 *   - `taskPriorityData`: Data structure for task priorities visualization.
 *   - `taskStatusData`: Data structure for task statuses visualization.
 */
export const useTaskStatistics = (tasks: Task[]) => {
  return useMemo(() => {
    // Count tasks by priority
    const taskPriorities = tasks.reduce((acc, task) => {
      acc[task.priority] = (acc[task.priority] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Define priority labels and corresponding colors
    const priorityLabels = ["Without priority", "Low", "Medium", "High"];
    const priorityColors: Record<string, string> = {
      "Without priority": "#B7B7B7",
      Low: "#8FA1D0",
      Medium: "#E09CB5",
      High: "#BEDBB0",
    };

    // Prepare dataset for task priorities visualization
    const taskPriorityData = {
      labels: priorityLabels,
      datasets: [
        {
          label: "Task Priorities",
          data: priorityLabels.map((label) => taskPriorities[label] || 0),
          backgroundColor: priorityLabels.map((label) => priorityColors[label]),
        },
      ],
    };

    // Count tasks by status
    const taskStatuses = tasks.reduce((acc, task) => {
      acc[task.status] = (acc[task.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Generate unique colors for each task status
    const uniqueStatusLabels = Object.keys(taskStatuses);
    const statusColors = uniqueStatusLabels.reduce((acc, status, index) => {
      acc[status] = generateColor(index);
      return acc;
    }, {} as Record<string, string>);

    // Prepare dataset for task statuses visualization
    const taskStatusData = {
      labels: uniqueStatusLabels,
      datasets: [
        {
          label: "Task Statuses",
          data: uniqueStatusLabels.map((label) => taskStatuses[label] || 0),
          backgroundColor: uniqueStatusLabels.map(
            (label) => statusColors[label]
          ),
        },
      ],
    };

    return { taskPriorityData, taskStatusData };
  }, [tasks]);
};
