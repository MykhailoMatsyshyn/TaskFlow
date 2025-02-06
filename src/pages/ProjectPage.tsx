import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import KanbanBoard from "../components/KanbanBoard/KanbanBoard";
import GanttChart from "../components/UI/GanttChart";
import { useProjectDataBySlug } from "../hooks/projects/useProjectDataBySlug";
import { useTasksByProject } from "../hooks/tasks/useTasks";
import { useUpdateColumns } from "../hooks/columns/useColumns";
import { useUpdateTask } from "../hooks/tasks/useTasks";
import SwitchToggle from "../components/UI/SwitchToggle/SwitchToggle";
import FilterManager from "../components/FilterManager/FilterManager";
import useTasksFilterStore from "../stores/filters/TasksFilterStore";
import MainLoader from "../components/Loaders/MainLoader";
import { Task } from "../types/task";
import { Column } from "../types/project";

/**
 * ProjectPage - Displays a project management interface with Kanban and Gantt views.
 *
 * Features:
 * - Fetches project and task data using React Query hooks.
 * - Allows users to toggle between Kanban and Gantt views.
 * - Enables drag-and-drop task and column updates.
 * - Uses Zustand for task filtering.
 * - Displays a loading state while fetching project details.
 *
 * @returns {JSX.Element} - The project management page.
 */
const ProjectPage = () => {
  // Get the project slug from URL parameters
  const { slug } = useParams();
  const resetFilters = useTasksFilterStore((state) => state.resetFilters);
  const navigate = useNavigate();

  // Fetch project data by its slug
  const {
    data: project,
    error,
    isLoading,
  } = useProjectDataBySlug(String(slug));

  // Retrieve task filters from the Zustand store
  const filters = useTasksFilterStore((state) => state.filters);

  // Fetch tasks for the project (ensuring project ID is a number)
  const { data: tasks, isLoading: tasksLoading } = useTasksByProject(
    Number(project?.id),
    filters
  );

  // State to store project columns
  const [columns, setColumns] = useState<Column[]>(project?.columns || []);

  // Mutations for updating columns and tasks
  const { mutate: updateColumns } = useUpdateColumns(project?.id);
  const { mutate: updateTask } = useUpdateTask();

  // Handle errors when project is not found
  useEffect(() => {
    if (error) {
      toast.error("Error: Project not found.");
      navigate("/dashboard");
    }
  }, [error, navigate]);

  // Reset filters when switching projects
  useEffect(() => {
    resetFilters();
  }, [slug, resetFilters]);

  // Update the columns state when project columns change
  useEffect(() => {
    if (project?.columns) {
      setColumns(project.columns);
    }
  }, [project?.columns]);

  // View state to toggle between Kanban and Gantt chart
  const [view, setView] = useState<"kanban" | "gantt">("kanban");

  // Toggle view between Kanban and Gantt
  const toggleView = () => {
    setView((prevView) => (prevView === "kanban" ? "gantt" : "kanban"));
  };

  // Handle drag-and-drop column updates
  const handleColumnDragEnd = (updatedColumns: Column[]) => {
    setColumns(updatedColumns);
    updateColumns(updatedColumns, {
      onError: () => {
        toast.error("Failed to update columns. Please try again.");
      },
    });
  };

  // Handle task updates
  const handleTaskUpdate = (taskId: number, data: Partial<Task>) => {
    updateTask({ id: taskId, data });
  };

  // Show loading indicator while fetching project data
  if (isLoading) return <MainLoader />;

  // Render Gantt chart or display a message if no tasks are available
  const renderGanttChart = () => {
    if (!tasks || tasks.length === 0) {
      return (
        <div
          className="flex items-center justify-center text-2xl text-text opacity-50"
          style={{ height: "calc(100vh - 164px)" }}
        >
          <p>No tasks available.</p>
        </div>
      );
    }
    return <GanttChart tasks={tasks} />;
  };

  return (
    <div>
      {/* Header Section */}
      <section className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 ml-5">
        <h1 className="pr-[20px] md:pr-0 md:text-lg md:font-normal italic underline text-text opacity-70">
          {project?.title}
        </h1>
        {/* Controls: View Toggle & Filters */}
        <div className="flex flex-row justify-between md:flex-row md:gap-2">
          <SwitchToggle
            leftLabel="Kanban"
            rightLabel="Gantt"
            currentView={view}
            onToggle={toggleView}
            className="mt-2 md:mt-0"
          />
          <FilterManager className="mt-2 md:mt-0" />
        </div>
      </section>

      {/* Kanban and Gantt View Container */}
      <div className="relative">
        {/* Kanban Board */}
        <div
          className={`absolute inset-0 transition-all duration-1000 
            ${
              view === "kanban"
                ? ""
                : "-translate-x-[110%] opacity-0 pointer-events-none"
            }
          `}
        >
          <KanbanBoard
            projectId={Number(project?.id)}
            columns={columns}
            tasks={tasks || []}
            onColumnUpdate={handleColumnDragEnd}
            onTaskUpdate={handleTaskUpdate}
            tasksLoading={tasksLoading}
          />
        </div>

        {/* Gantt Chart */}
        <div
          className={`absolute inset-0 transition-all duration-1000 ${
            view === "gantt"
              ? "translate-x-0  opacity-100  pointer-events-auto mr-[20px]"
              : "translate-x-[110%] pointer-events-none  opacity-0"
          }`}
        >
          {renderGanttChart()}
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
