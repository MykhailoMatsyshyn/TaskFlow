import { GeneralStats, ProjectList, TaskStatistics } from "./components";
import { Project } from "../../types/project";
import { TaskChartData } from "../../types/charts";

/**
 * Dashboard Layout Component
 *
 * This component structures the main dashboard layout, including:
 * - General statistics (total projects, total tasks)
 * - Project selection list
 * - Task statistics (priorities and statuses)
 *
 * It is designed to organize and display key project and task data in a grid layout.
 */

interface DashboardLayoutProps {
  /** Total number of projects */
  totalProjects: number;
  /** Total number of tasks */
  totalTasks: number;
  /** List of projects available in the dashboard */
  projects: Project[];
  /** ID of the currently selected project for filtering */
  selectedProject: number | null;
  /** Function to update the selected project */
  setSelectedProject: (id: number | null) => void;
  /** Data structure for task priority statistics (used in charts) */
  taskPriorityData: TaskChartData;
  /** Data structure for task status statistics (used in charts) */
  taskStatusData: TaskChartData;
}

/**
 * Renders the main layout of the dashboard, containing:
 * - Project statistics (left section)
 * - Project selection list (right section)
 * - Task statistics graphs (bottom section)
 */
const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  totalProjects,
  totalTasks,
  projects,
  selectedProject,
  setSelectedProject,
  taskPriorityData,
  taskStatusData,
}) => {
  return (
    <div className="pr-4 h-screen flex flex-col pl-0 ml-5">
      {/* Top section: General Stats & Project Selection */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Displays total number of projects and tasks */}
        <GeneralStats totalProjects={totalProjects} totalTasks={totalTasks} />

        {/* Displays a list of projects with selection functionality */}
        <ProjectList
          projects={projects}
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
        />
      </div>

      {/* Bottom section: Task Statistics (Charts) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:col-span-2 gap-6 flex-grow">
        {/* Displays task priority and task status statistics using charts */}
        <TaskStatistics
          taskPriorityData={taskPriorityData}
          taskStatusData={taskStatusData}
        />
      </div>
    </div>
  );
};

export default DashboardLayout;
