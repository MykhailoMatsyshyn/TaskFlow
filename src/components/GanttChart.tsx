import { useEffect, useRef } from "react";
import Gantt from "frappe-gantt";

const GanttChart = ({ tasks }) => {
  const ganttRef = useRef(null);

  if (!tasks || tasks.length === 0) {
    return <p className="text-center text-gray-500">No tasks available.</p>;
  }

  useEffect(() => {
    const containerHeight = window.innerHeight - 424;
    const minBarHeight = 30;
    const totalBarsHeight = minBarHeight * tasks.length;

    let calculatedBarHeight;
    if (totalBarsHeight > containerHeight) {
      calculatedBarHeight = minBarHeight;
    } else {
      calculatedBarHeight = Math.floor(containerHeight / tasks.length);
    }

    if (ganttRef.current) {
      ganttRef.current.style.height = `${containerHeight}px`;
    }

    const gantt = new Gantt(ganttRef.current, tasks, {
      view_mode: "Day",
      bar_height: calculatedBarHeight,
      auto_move_label: true,
      infinite_padding: false,
      readonly: true,
      popup_on: "hover",
      view_mode_select: true,
      on_click: (task) => console.log("Task clicked:", task),
      on_date_change: (task, start, end) =>
        console.log("Task date changed:", task, start, end),
      on_progress_change: (task, progress) =>
        console.log("Task progress changed:", task, progress),
      on_view_change: (mode) => console.log("View mode changed:", mode),
    });

    return () => {
      ganttRef.current.innerHTML = "";
    };
  }, [tasks]); // Залежність від tasks

  return <div ref={ganttRef} className="gantt-container" />;
};

export default GanttChart;
