import { useEffect, useRef } from "react";
import Gantt from "frappe-gantt";

/**
 * GanttChart Component
 *
 * This component visualizes tasks using a Gantt chart.
 * It calculates task progress dynamically and adjusts the chart's appearance based on available space.
 * 
 * Features:
 * - Maps tasks to a Gantt chart format with custom priority-based colors.
 * - Calculates task progress based on start and end dates.
 * - Dynamically adjusts bar height to fit within the available container space.
 * - Uses `frappe-gantt` for rendering.
 *
 * @param {Object[]} tasks - The list of tasks to be displayed in the Gantt chart.
 * @returns {JSX.Element} - A Gantt chart visualization of tasks.
 */

// Custom view mode for the Gantt chart
const customViewModes = [
  {
    name: "Hour",
    padding: 24,
    step: 1,
    lower_text: "HH",
    upper_text: "MMMM DD, YYYY",
    column_width: 80,
  },
];

// Calculates task progress based on the current date
const calculateProgress = (startDate: string, endDate: string): number => {
  const now = new Date().getTime();
  const start = new Date(startDate).getTime();
  const end = new Date(endDate).getTime();

  if (now >= end) return 100;
  if (now <= start) return 0;

  const totalDuration = end - start;
  const elapsedTime = now - start;

  return Math.min(100, Math.max(0, (elapsedTime / totalDuration) * 100));
};

// Maps tasks to the Gantt chart format
const mapTasksToGanttFormat = (tasks) => {
  const priorityColors = {
    High: "rgba(190, 219, 176, 0.8)",
    Medium: "rgba(224, 156, 181, 0.8)",
    Low: "rgba(143, 161, 208, 0.8)",
    Default: "rgba(0, 0, 0, 0.2)",
  };

  return tasks.map((task) => ({
    id: task.id.toString(),
    name: task.title,
    start: new Date(task.startDate).toISOString(),
    end: new Date(task.endDate).toISOString(),
    progress: calculateProgress(task.startDate, task.endDate),
    color: priorityColors[task.priority] || priorityColors.Default,
  }));
};

const GanttChart = ({ tasks }) => {
  const ganttRef = useRef(null);
  const transformedTasks = mapTasksToGanttFormat(tasks);

  useEffect(() => {
    const containerHeight = window.innerHeight - 424;
    const minBarHeight = 30;
    const totalBarsHeight = minBarHeight * tasks.length;

    // Adjusts bar height based on the available space
    const calculatedBarHeight =
      totalBarsHeight > containerHeight
        ? minBarHeight
        : Math.floor(containerHeight / tasks.length);

    if (ganttRef.current) {
      ganttRef.current.style.height = `${containerHeight}px`;

      const gantt = new Gantt(ganttRef.current, transformedTasks, {
        view_mode: "Day",
        bar_height: calculatedBarHeight,
        auto_move_label: true,
        infinite_padding: false,
        readonly: true,
        popup_on: "hover",
        view_mode_select: true,
        scroll_to: "start",
      });

      return () => {
        if (ganttRef.current) {
          ganttRef.current.innerHTML = "";
        }
      };
    }
  }, [transformedTasks]);

  return <div ref={ganttRef} className="gantt-container" />;
};

export default GanttChart;
