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

  const priorityLabels = ["Without priority", "Low", "Medium", "High"];

  const priorityColors: Record<string, string> = {
    "Without priority": "#B7B7B7",
    Low: "#8FA1D0",
    Medium: "#E09CB5",
    High: "#BEDBB0",
  };

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

  const taskStatuses = filteredTasks.reduce((acc, task) => {
    acc[task.status] = (acc[task.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const baseColors = ["#B7B7B7", "#8FA1D0", "#E09CB5", "#BEDBB0"]; // Основні кольори

  const uniqueStatusLabels = Object.keys(taskStatuses); // Всі статуси

  // Функція для генерації нових відтінків HSL
  const generateColor = (index: number) => {
    const hue = (index * 137) % 360; // Використовуємо "золоте число" для рівномірного розподілу
    return `hsl(${hue}, 50%, 65%)`; // Створюємо відтінки зі збалансованою яскравістю
  };

  // Генеруємо кольори для статусів, уникаючи повторень
  const statusColors: Record<string, string> = {};
  uniqueStatusLabels.forEach((status, index) => {
    statusColors[status] =
      index < baseColors.length ? baseColors[index] : generateColor(index);
  });

  // Формуємо дані для графіка
  const taskStatusData = {
    labels: uniqueStatusLabels,
    datasets: [
      {
        label: "Task Statuses",
        data: uniqueStatusLabels.map((label) => taskStatuses[label] || 0),
        backgroundColor: uniqueStatusLabels.map((label) => statusColors[label]),
      },
    ],
  };

  return (
    <div className="pr-4 h-screen flex flex-col pl-0 ml-5">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Left: General Stats */}
        <GeneralStats totalProjects={totalProjects} totalTasks={totalTasks} />

        {/* Right: Project List */}
        <ProjectList
          projects={projects}
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
        />
      </div>

      {/* Task Statistics під ними */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:col-span-2 gap-6 flex-grow">
        <TaskStatistics
          taskPriorityData={taskPriorityData}
          taskStatusData={taskStatusData}
        />
      </div>
    </div>
  );
};

export default MainDashboardPage;
