import React, { useState, useEffect } from "react";
import { PolarArea } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale,
} from "chart.js";
import { TaskChartData } from "../../../types/charts";

// Register necessary chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale
);

/**
 * Task Statistics Component
 *
 * Displays visual representations of task priorities and statuses using polar area charts.
 * It dynamically adapts to dark/light mode for better visibility.
 *
 * @param {TaskChartData} taskPriorityData - Data for the task priority chart.
 * @param {TaskChartData} taskStatusData - Data for the task status chart.
 */
type TaskStatisticsProps = {
  taskPriorityData: TaskChartData;
  taskStatusData: TaskChartData;
};

const TaskStatistics: React.FC<TaskStatisticsProps> = ({
  taskPriorityData,
  taskStatusData,
}) => {
  const [isDarkMode, setIsDarkMode] = useState(
    document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: isDarkMode ? "#E0E0E0" : "#161616",
          boxWidth: 15,
        },
      },
    },
    scales: {
      r: {
        grid: {
          color: isDarkMode ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.1)",
        },
        ticks: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="bg-neutral-background shadow-md rounded-xl p-6 w-full col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="flex flex-col items-center">
        <h2 className="text-lg font-semibold text-text opacity-70 mb-4">
          Task Priorities
        </h2>
        <div className="w-full max-w-[400px] h-full max-h-[400px]">
          <PolarArea data={taskPriorityData} options={chartOptions} />
        </div>
      </div>
      <div className="flex flex-col items-center">
        <h2 className="text-lg font-semibold text-text opacity-70 mb-4">
          Task Statuses
        </h2>
        <div className="w-full max-w-[400px] h-full max-h-[400px]">
          <PolarArea data={taskStatusData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default TaskStatistics;
