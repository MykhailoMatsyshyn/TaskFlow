import { useEffect, useRef } from "react";
import Gantt from "frappe-gantt";

const customViewModes = [
  {
    name: "Hour",
    padding: 24, // Інтервал між поділками
    step: 1, // Крок для кожного стовпця
    lower_text: "HH", // Формат тексту у нижній частині
    upper_text: "MMMM DD, YYYY", // Формат тексту у верхній частині
    column_width: 80,
  },
];

const calculateProgress = (startDate: string, endDate: string): number => {
  const now = new Date().getTime(); // Поточна дата в мілісекундах
  const start = new Date(startDate).getTime(); // Початкова дата в мілісекундах
  const end = new Date(endDate).getTime(); // Кінцева дата в мілісекундах

  if (now >= end) return 100; // Якщо поточна дата після кінцевої, прогрес = 100%
  if (now <= start) return 0; // Якщо поточна дата до початкової, прогрес = 0%

  const totalDuration = end - start; // Загальна тривалість
  const elapsedTime = now - start; // Пройдений час

  return Math.min(100, Math.max(0, (elapsedTime / totalDuration) * 100)); // Прогрес у межах 0-100
};

const mapTasksToGanttFormat = (tasks) => {
  const priorityColors = {
    High: "rgba(190, 219, 176, 0.8)",
    Medium: "rgba(224, 156, 181, 0.8)",
    Low: "rgba(143, 161, 208, 0.8)",
    Default: "rgba(0, 0, 0, 0.2)",
  };

  return tasks.map((task) => ({
    id: task.id.toString(), // Ідентифікатор завдання (строка)
    name: task.title, // Назва завдання
    start: new Date(task.startDate).toISOString(), // Повна дата з часом
    end: new Date(task.endDate).toISOString(), // Повна дата з часом
    progress: calculateProgress(task.startDate, task.endDate),
    color: priorityColors[task.priority] || priorityColors.Default, // Колір на основі пріоритету
  }));
};

const GanttChart = ({ tasks }) => {
  const ganttRef = useRef(null);
  const transformedTasks = mapTasksToGanttFormat(tasks);

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

      const gantt = new Gantt(ganttRef.current, transformedTasks, {
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
        if (ganttRef.current) {
          ganttRef.current.innerHTML = ""; // Перевірка перед очищенням
        }
      };
    }
  }, [transformedTasks]);

  return <div ref={ganttRef} className="gantt-container" />;
};

export default GanttChart;
