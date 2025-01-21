import React from "react";
import { PolarArea } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale
);

type TaskStatisticsProps = {
  taskPriorityData: any;
  taskStatusData: any;
};

const TaskStatistics: React.FC<TaskStatisticsProps> = ({
  taskPriorityData,
  taskStatusData,
}) => {
  return (
    <div className="bg-white shadow rounded p-4 col-span-2 grid grid-cols-2 gap-6">
      <div>
        <h2 className="text-lg font-semibold mb-4">
          Task Priorities (Polar Area)
        </h2>
        <PolarArea data={taskPriorityData} options={{ responsive: true }} />
      </div>
      <div>
        <h2 className="text-lg font-semibold mb-4">
          Task Statuses (Polar Area)
        </h2>
        <PolarArea data={taskStatusData} options={{ responsive: true }} />
      </div>
    </div>
  );
};

export default TaskStatistics;
