import { useEffect, useState } from "react";
import { useProjects } from "../hooks/projects/useProjects";
import { useTasks } from "../hooks/tasks/useTasks";
import { useFilteredTasks } from "../hooks/tasks/useFilteredTasks";
import { useTaskStatistics } from "../hooks/tasks/useTaskStatistics";
import DashboardLayout from "../components/Dashboard/DashboardLayout";
import DashboardSkeleton from "../components/Loaders/DashboardSkeleton";

/**
 * Main Dashboard Page Component
 *
 * This component serves as the main dashboard view, displaying an overview of projects and tasks.
 * It fetches project and task data, filters tasks based on the selected project, and calculates task statistics.
 *
 */
const MainDashboardPage = () => {
  // Fetch projects and tasks from the API
  const { data: projects, isLoading: isProjectsLoading } = useProjects();
  const { data: tasks, isLoading: isTasksLoading } = useTasks();

  // State to store the selected project ID for filtering tasks
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [isDelayedLoading, setIsDelayedLoading] = useState(true);

  // Simulate a loading delay (e.g., 3 seconds)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDelayedLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Filter tasks based on the selected project
  const filteredTasks = useFilteredTasks(tasks ?? [], selectedProject);

  // Generate task statistics (priorities & statuses)
  const { taskPriorityData, taskStatusData } = useTaskStatistics(filteredTasks);

  // Show a loader if project or task data is still being fetched
  if (isProjectsLoading || isTasksLoading || isDelayedLoading) {
    return <DashboardSkeleton />;
  }

  // Show an error message if data could not be retrieved
  if (!projects || !tasks) {
    return <div>Error: Could not load data.</div>;
  }

  return (
    <DashboardLayout
      totalProjects={projects.length}
      totalTasks={tasks.length}
      projects={projects}
      selectedProject={selectedProject}
      setSelectedProject={setSelectedProject}
      taskPriorityData={taskPriorityData}
      taskStatusData={taskStatusData}
    />
  );
};

export default MainDashboardPage;
