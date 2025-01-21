import React from "react";

type GeneralStatsProps = {
  totalProjects: number;
  totalTasks: number;
};

const GeneralStats: React.FC<GeneralStatsProps> = ({
  totalProjects,
  totalTasks,
}) => {
  return (
    <div className="grid grid-cols-2 gap-6 mb-6">
      <div className="bg-white/50 shadow rounded p-4">
        <h2 className="text-lg font-semibold">Total Projects</h2>
        <p className="text-2xl font-bold">{totalProjects}</p>
      </div>
      <div className="bg-white/50 shadow rounded p-4">
        <h2 className="text-lg font-semibold">Total Tasks</h2>
        <p className="text-2xl font-bold">{totalTasks}</p>
      </div>
    </div>
  );
};

export default GeneralStats;
