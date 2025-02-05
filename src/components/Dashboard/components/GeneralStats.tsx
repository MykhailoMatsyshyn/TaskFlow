import React from "react";
import {
  FiFolder,
  FiCheckSquare,
  FiTrendingUp,
  FiTrendingDown,
} from "react-icons/fi";
import { motion } from "framer-motion";

/**
 * General Statistics Component
 *
 * Displays high-level statistics about the total number of projects and tasks.
 * Each statistic card includes:
 * - A relevant icon
 * - The total count
 * - A percentage indicating growth compared to last week
 *
 * @param {number} totalProjects - The total number of projects in the system.
 * @param {number} totalTasks - The total number of tasks across all projects.
 */
type GeneralStatsProps = {
  totalProjects: number;
  totalTasks: number;
};

const GeneralStats: React.FC<GeneralStatsProps> = ({
  totalProjects,
  totalTasks,
}) => {
  // Mocked growth values for UI representation (should be replaced with real data in the future)
  const projectGrowth = 80; // TODO: Replace with dynamic calculation
  const taskGrowth = 15; // TODO: Replace with dynamic calculation

  return (
    <div className="flex flex-col gap-6">
      {/* Total Projects Card */}
      <motion.div
        className="bg-neutral-background shadow-md rounded-xl p-6 flex items-center gap-4 cursor-pointer"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.95 }}
      >
        <FiFolder className="text-[#9DC888] text-4xl" />
        <div className="flex flex-col">
          <h2 className="text-lg font-semibold text-text opacity-70">
            Total Projects
          </h2>
          <p className="text-3xl font-bold text-text">{totalProjects}</p>
          <span
            className={`text-sm flex items-center gap-1 ${
              projectGrowth >= 0 ? "text-green-400" : "text-red-400"
            }`}
          >
            {projectGrowth >= 0 ? <FiTrendingUp /> : <FiTrendingDown />}
            {projectGrowth}% vs last week
          </span>
        </div>
      </motion.div>

      {/* Total Tasks Card */}
      <motion.div
        className="bg-neutral-background shadow-md rounded-xl p-6 flex items-center gap-4 cursor-pointer justify-end"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="flex flex-col text-right">
          <h2 className="text-lg font-semibold text-text opacity-70">
            Total Tasks
          </h2>
          <p className="text-3xl font-bold text-text">{totalTasks}</p>
          <span
            className={`text-sm flex items-center gap-1 ${
              taskGrowth >= 0 ? "text-green-400" : "text-red-400"
            }`}
          >
            {taskGrowth >= 0 ? <FiTrendingUp /> : <FiTrendingDown />}
            {taskGrowth}% vs last week
          </span>
        </div>
        <FiCheckSquare className="text-[#8fa1d0] text-4xl" />
      </motion.div>
    </div>
  );
};

export default GeneralStats;
