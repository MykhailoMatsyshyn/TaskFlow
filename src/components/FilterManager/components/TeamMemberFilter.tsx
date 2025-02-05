import React from "react";
import { useParams } from "react-router-dom";
import useTasksFilterStore from "../../../stores/filters/TasksFilterStore";
import useProjectsFilterStore from "../../../stores/filters/ProjectsFilterStore";
import { useProjectDataBySlug } from "../../../hooks/projects/useProjectDataBySlug";
import { TeamMemberPicker } from "../../Forms/ProjectManagementForms/components";

interface TeamMemberFilterProps {
  isProjectFilter?: boolean; // Determines if the filter is for tasks or projects
}

/**
 * TeamMemberFilter Component
 *
 * Allows users to filter tasks or projects based on assigned team members.
 * Supports selecting multiple users.
 *
 * Features:
 * - Filters tasks when `isProjectFilter` is false.
 * - Filters projects when `isProjectFilter` is true.
 * - Uses Zustand for state management.
 * - Fetches project members dynamically when filtering tasks.
 *
 * @param {TeamMemberFilterProps} props - Props to determine the filter type.
 * @returns {JSX.Element} - A filter component for team members.
 */
const TeamMemberFilter: React.FC<TeamMemberFilterProps> = ({
  isProjectFilter = false,
}) => {
  const { slug } = useParams();

  // Zustand store for filtering tasks
  const setTaskFilter = useTasksFilterStore((state) => state.setFilter);
  const currentTaskMembers = useTasksFilterStore(
    (state) => state.filters.assignedMembers
  );

  // Zustand store for filtering projects
  const setProjectFilter = useProjectsFilterStore((state) => state.setFilter);
  const currentProjectMembers = useProjectsFilterStore(
    (state) => state.filters.assignedMembers
  );

  // Fetch project details to get available members
  const { data: project, isLoading } = useProjectDataBySlug(String(slug));

  // Determine which filter function to use (task or project)
  const setFilter = isProjectFilter ? setProjectFilter : setTaskFilter;
  const currentMembers = isProjectFilter
    ? currentProjectMembers
    : currentTaskMembers;

  // List of project members for filtering
  const projectMembers = project?.assignedMembers;

  // Handle member selection changes
  const handleMemberChange = (
    selectedUsers: { id: string; name: string }[]
  ) => {
    const memberIds = selectedUsers.map((user) => parseInt(user.id));
    setFilter("assignedMembers", memberIds.length > 0 ? memberIds : []);
  };

  // Loading state for task filtering (not needed for projects)
  if (!isProjectFilter && isLoading) {
    return <p className="text-white/50">Loading members...</p>;
  }

  // If no members are assigned to the project
  if (!isProjectFilter && (!projectMembers || projectMembers.length === 0)) {
    return <p className="text-white/50">No assigned members available.</p>;
  }

  return (
    <div className="flex flex-col items-start gap-2">
      {/* Filter Header with Reset Option */}
      <div
        className={`flex text-text ${
          isProjectFilter ? "flex-col gap-1" : "flex-row justify-between"
        } w-full`}
      >
        <h4>Assigned Members</h4>
        <button
          onClick={() => setFilter("assignedMembers", [])}
          className={`opacity-50 text-sm font-light underline hover:opacity-100 transition ${
            isProjectFilter ? "text-left" : ""
          }`}
        >
          Show all
        </button>
      </div>

      {/* Team Member Picker Component */}
      <TeamMemberPicker
        onChange={handleMemberChange}
        defaultMembers={currentMembers.map(String)}
        isMulti={true}
        filterByProjectMembers={isProjectFilter ? undefined : projectMembers}
      />
    </div>
  );
};

export default TeamMemberFilter;
