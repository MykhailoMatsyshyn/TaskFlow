import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import KanbanBoard from "../../components/KanbanBoard/KanbanBoard";
import GanttChart from "../../components/GanttChart";
import { useProjectDataBySlug } from "../../hooks/useProjectDataBySlug";
import { useTasksByProject } from "../../hooks/useTasksByProject";
import { useUpdateColumns } from "../../hooks/useUpdateColumns";
import { useUpdateTask } from "../../hooks/useUpdateTask";
import SwitchToggle from "../../components/SwitchToggle/SwitchToggle";

const ProjectPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  // Завантаження проекту
  const { data: project, error, isLoading } = useProjectDataBySlug(slug);
  const { data: tasks, isLoading: tasksLoading } = useTasksByProject(
    project?.id
  );

  // Локальний стан колонок
  const [columns, setColumns] = useState(project?.columns || []);
  const { mutate: updateColumns } = useUpdateColumns(project?.id);
  const { mutate: updateTask } = useUpdateTask();

  useEffect(() => {
    if (error) {
      toast.error("Error: Project not found. Please check the URL.");
      navigate("/dashboard");
    }
  }, [error, navigate]);

  // Синхронізація колонок
  useEffect(() => {
    if (project?.columns) {
      setColumns(project.columns);
    }
  }, [project?.columns]);

  // Стан для перемикання між Kanban і Gantt
  const [view, setView] = useState<"kanban" | "gantt">("kanban");

  const toggleView = () => {
    setView((prevView) => (prevView === "kanban" ? "gantt" : "kanban"));
  };

  const handleColumnDragEnd = (updatedColumns) => {
    setColumns(updatedColumns);
    updateColumns(updatedColumns, {
      onError: () => {
        toast.error("Failed to update columns. Please try again.");
      },
    });
  };

  const handleTaskUpdate = (taskId, data) => {
    updateTask({ id: taskId, data });
  };

  if (isLoading || tasksLoading) return <div>Loading...</div>;

  return (
    <div className="p-0">
      <header className="flex items-center justify-between mb-4">
        <h1 className="text-lg font-normal italic underline">
          {project?.title}
        </h1>
        <SwitchToggle
          leftLabel="Kanban"
          rightLabel="Gantt"
          currentView={view}
          onToggle={toggleView}
        />
        {/* <button
          onClick={toggleView}
          className="px-1 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-all"
        >
          {view === "kanban" ? "View Gantt Chart" : "View Kanban Board"}
        </button> */}
      </header>

      <div className="relative">
        {/* Kanban Board */}
        <div
          className={`absolute inset-0 transition-all duration-1000 ${
            view === "kanban"
              ? "translate-x-0 z-10 opacity-100 pointer-events-auto"
              : "-translate-x-[110%] z-0  opacity-0 pointer-events-none "
          }`}
        >
          <KanbanBoard
            projectId={project?.id}
            columns={columns}
            tasks={tasks}
            onColumnUpdate={handleColumnDragEnd}
            onTaskUpdate={handleTaskUpdate}
          />
        </div>

        {/* Gantt Chart */}
        <div
          className={`absolute inset-0 transition-all duration-1000 ${
            view === "gantt"
              ? "translate-x-0 z-10  opacity-100  pointer-events-auto mr-[20px]"
              : "translate-x-[110%] z-0 pointer-events-none  opacity-0"
          }`}
        >
          <GanttChart tasks={tasks} />
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
