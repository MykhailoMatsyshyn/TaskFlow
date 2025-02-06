import { useEffect, useState } from "react";
import {
  useUserProjects,
  useCreateProject,
} from "../hooks/projects/useProjects";
import { useTasks } from "../hooks/tasks/useTasks";
import { useFilteredTasks } from "../hooks/tasks/useFilteredTasks";
import { useTaskStatistics } from "../hooks/tasks/useTaskStatistics";
import DashboardLayout from "../components/Dashboard/DashboardLayout";
import DashboardSkeleton from "../components/Loaders/DashboardSkeleton";
import { useAuth } from "../hooks/auth/useAuth";
import CustomModal from "../components/Modals/CustomModal";
import { ProjectForm } from "../components/Forms";

/**
 * Main Dashboard Page Component
 *
 * Displays an overview of projects and tasks based on user role.
 * - **Admins** see all projects.
 * - **Project Managers** must create a board before starting.
 * - **Team Members** must be assigned to a project before proceeding.
 */
const MainDashboardPage = () => {
  const { userRole, userId } = useAuth();

  // Fetch projects based on user role
  const { data: projects, isLoading: isProjectsLoading } = useUserProjects(
    Number(userId),
    userRole
  );

  const { data: allTasks, isLoading: isTasksLoading } = useTasks();

  const userProjectIds = projects?.map((project) => project.id) || [];
  const tasks =
    allTasks?.filter((task) => userProjectIds.includes(task.projectId)) || [];

  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [isCreateProjectOpen, setIsCreateProjectOpen] = useState(false);

  const { mutate: createProject } = useCreateProject();

  const handleCreateProject = (projectData: any) => {
    createProject(projectData, {
      onSuccess: () => {
        setIsCreateProjectOpen(false);
      },
      onError: (error) => {
        console.error("Failed to create project:", error.message);
      },
    });
  };

  const [isDelayedLoading, setIsDelayedLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setIsDelayedLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const filteredTasks = useFilteredTasks(tasks, selectedProject);

  const { taskPriorityData, taskStatusData } = useTaskStatistics(filteredTasks);

  if (isProjectsLoading || isTasksLoading || isDelayedLoading) {
    return <DashboardSkeleton />;
  }

  if (!projects || projects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
        {userRole === "Project Manager" ? (
          <p className="text-center text-[14px] font-normal leading-[129%] tracking-[-0.02em] text-[var(--text-color-transparent)] max-w-[488px]">
            Before starting your project, it is essential{" "}
            <span>
              <button
                onClick={() => setIsCreateProjectOpen(true)}
                className="bg-none text-[#BEDBB0]"
              >
                to create a board
              </button>
            </span>{" "}
            to visualize and track all the necessary tasks and milestones. This
            board serves as a powerful tool to organize the workflow and ensure
            effective collaboration among team members.
          </p>
        ) : userRole === "Team Member" ? (
          <p className="text-center text-[14px] font-normal leading-[129%] tracking-[-0.02em] text-[var(--text-color-transparent)] max-w-[488px]">
            You have not been assigned to any project yet. Please wait for an
            invitation from a project manager.
          </p>
        ) : null}

        {/* Project Creation Modal */}
        {isCreateProjectOpen && (
          <CustomModal
            isOpen={isCreateProjectOpen}
            onClose={() => setIsCreateProjectOpen(false)}
            title="Create New Project Board"
          >
            <ProjectForm
              onCancel={() => setIsCreateProjectOpen(false)}
              onSubmit={handleCreateProject}
            />
          </CustomModal>
        )}
      </div>
    );
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
