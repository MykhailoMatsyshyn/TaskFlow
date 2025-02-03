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
import FilterManager from "../../components/FilterManager/FilterManager";
import useTaskFilterStore from "../../stores/TaskFilterStore";
import MainLoader from "../../components/Loaders/MainLoader";

const ProjectPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const { data: project, error, isLoading } = useProjectDataBySlug(slug);

  const filters = useTaskFilterStore((state) => state.filters);

  const { data: tasks, isLoading: tasksLoading } = useTasksByProject(
    project?.id,
    filters
  );

  const [columns, setColumns] = useState(project?.columns || []);
  const { mutate: updateColumns } = useUpdateColumns(project?.id);
  const { mutate: updateTask } = useUpdateTask();

  useEffect(() => {
    if (error) {
      toast.error("Error: Project not found. Please check the URL.");
      navigate("/dashboard");
    }
  }, [error, navigate]);

  useEffect(() => {
    if (project?.columns) {
      setColumns(project.columns);
    }
  }, [project?.columns]);

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

  if (isLoading) return <MainLoader />;

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
      <section className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 ml-5">
        <h1 className="pr-[20px] md:pr-0 md:text-lg md:font-normal italic underline text-text opacity-70">
          {project?.title}
        </h1>

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

      <div className="relative">
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
            projectId={project?.id}
            columns={columns}
            tasks={tasks}
            onColumnUpdate={handleColumnDragEnd}
            onTaskUpdate={handleTaskUpdate}
            tasksLoading={tasksLoading}
          />
        </div>

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
