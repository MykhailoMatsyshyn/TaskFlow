import React from "react";
import { useParams } from "react-router-dom";
import useTaskFilterStore from "../../../stores/TaskFilterStore";
import { TeamMemberPicker } from "../../Layout/ProjectForm/components";
import { useProjectDataBySlug } from "../../../hooks/useProjectDataBySlug";

const TeamMemberFilter: React.FC = () => {
  const { slug } = useParams();
  const { data: project, isLoading } = useProjectDataBySlug(slug);

  const setFilter = useTaskFilterStore((state) => state.setFilter);
  const currentMembers = useTaskFilterStore(
    (state) => state.filters.assignedMember
  );

  const handleMemberChange = (
    selectedUsers: { id: string; name: string }[]
  ) => {
    const memberIds = selectedUsers.map((user) => parseInt(user.id));
    setFilter("assignedMember", memberIds.length > 0 ? memberIds : []);
  };

  if (isLoading) {
    return <p className="text-white/50">Loading members...</p>;
  }

  if (!project?.assignedMembers || project.assignedMembers.length === 0) {
    return <p className="text-white/50">No assigned members available.</p>;
  }

  return (
    <div className="flex flex-col items-start gap-2">
      <div className="flex items-center justify-between w-full">
        <h4 className="mb-1">Assigned Members</h4>
        <button
          onClick={() => setFilter("assignedMember", [])}
          className="text-white/50 underline hover:text-white transition"
        >
          Show all
        </button>
      </div>
      <TeamMemberPicker
        onChange={handleMemberChange}
        defaultMembers={currentMembers.map(String)}
        isMulti={true}
        filterByProjectMembers={project.assignedMembers}
      />
    </div>
  );
};

export default TeamMemberFilter;
