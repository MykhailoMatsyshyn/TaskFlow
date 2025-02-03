import { useState } from "react";
import { useFetchAllProjects } from "../../hooks/useFetchAllProjects";
import { useFetchAllTasks } from "../../hooks/useFetchAllTasks";
import {
  GeneralStats,
  ProjectList,
  TaskStatistics,
} from "../../components/Dashboard";
import MainLoader from "../../components/Loaders/MainLoader";

const MainDashboardPage = () => {
  const { data: projects, isLoading: isProjectsLoading } =
    useFetchAllProjects();
  const { data: tasks, isLoading: isTasksLoading } = useFetchAllTasks();

  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  if (isProjectsLoading || isTasksLoading) {
    return <MainLoader />;
  }

  if (!projects || !tasks) {
    return <div>Error: Could not load data.</div>;
  }

  const filteredTasks = selectedProject
    ? tasks.filter((task) => task.projectId === selectedProject)
    : tasks;

  const totalProjects = projects.length;
  const totalTasks = tasks.length;

  const taskPriorities = filteredTasks.reduce((acc, task) => {
    acc[task.priority] = (acc[task.priority] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const taskPriorityData = {
    labels: Object.keys(taskPriorities),
    datasets: [
      {
        label: "Task Priorities",
        data: Object.values(taskPriorities),
        backgroundColor: ["#FF0000", "#FFA500", "#00FF00", "#808080"],
      },
    ],
  };

  const taskStatuses = filteredTasks.reduce((acc, task) => {
    acc[task.status] = (acc[task.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const taskStatusData = {
    labels: Object.keys(taskStatuses),
    datasets: [
      {
        label: "Task Statuses",
        data: Object.values(taskStatuses),
        backgroundColor: ["#8FA1D0", "#E09CB5", "#FFD700", "#BEDBB0"],
      },
    ],
  };

  return (
    <div className="pr-4 h-screen flex flex-col pl-0">
      <GeneralStats totalProjects={totalProjects} totalTasks={totalTasks} />
      <div className="grid grid-cols-3 gap-6 flex-grow overflow-y-auto">
        <ProjectList
          projects={projects}
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
        />
        <TaskStatistics
          taskPriorityData={taskPriorityData}
          taskStatusData={taskStatusData}
        />
      </div>
    </div>
  );
};

export default MainDashboardPage;
