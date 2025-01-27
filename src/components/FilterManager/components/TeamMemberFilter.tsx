import React from "react";
import { useParams } from "react-router-dom";
import useTaskFilterStore from "../../../stores/TaskFilterStore";
import useProjectFilterStore from "../../../stores/ProjectFilterStore";
import { useProjectDataBySlug } from "../../../hooks/useProjectDataBySlug";
import TeamMemberSelector from "../../Layout/ProjectForm/components/TeamMemberPicker/TeamMemberPicker";

interface TeamMemberFilterProps {
  isProjectFilter?: boolean;
}

const TeamMemberFilter: React.FC<TeamMemberFilterProps> = ({
  isProjectFilter = false,
}) => {
  const { slug } = useParams();
  const setTaskFilter = useTaskFilterStore((state) => state.setFilter);
  const currentTaskMembers = useTaskFilterStore(
    (state) => state.filters.assignedMembers
  );

  const setProjectFilter = useProjectFilterStore((state) => state.setFilter);
  const currentProjectMembers = useProjectFilterStore(
    (state) => state.filters.assignedMembers
  );

  const { data: project, isLoading } = useProjectDataBySlug(slug);

  const setFilter = isProjectFilter ? setProjectFilter : setTaskFilter;
  const currentMembers = isProjectFilter
    ? currentProjectMembers
    : currentTaskMembers;

  const projectMembers = project?.assignedMembers;

  const handleMemberChange = (
    selectedUsers: { id: string; name: string }[]
  ) => {
    const memberIds = selectedUsers.map((user) => parseInt(user.id));
    setFilter("assignedMembers", memberIds.length > 0 ? memberIds : []);
  };

  if (!isProjectFilter && isLoading) {
    return <p className="text-white/50">Loading members...</p>;
  }

  if (!isProjectFilter && (!projectMembers || projectMembers.length === 0)) {
    return <p className="text-white/50">No assigned members available.</p>;
  }

  return (
    <div className="flex flex-col items-start gap-2">
      <div
        className={`flex ${
          isProjectFilter ? "flex-col gap-1" : "flex-row justify-between"
        } w-full`}
      >
        <h4>Assigned Members</h4>
        <button
          onClick={() => setFilter("assignedMembers", [])}
          className={`text-white/50 text-sm font-light underline hover:text-white transition ${
            isProjectFilter ? "text-left" : ""
          }`}
        >
          Show all
        </button>
      </div>
      <TeamMemberSelector
        onChange={handleMemberChange}
        defaultMembers={currentMembers.map(String)}
        isMulti={true}
        filterByProjectMembers={isProjectFilter ? undefined : projectMembers}
      />
    </div>
  );
};

export default TeamMemberFilter;

// import React from "react";
// import { useParams } from "react-router-dom";
// import useTaskFilterStore from "../../../stores/TaskFilterStore";
// import { TeamMemberPicker } from "../../Layout/ProjectForm/components";
// import { useProjectDataBySlug } from "../../../hooks/useProjectDataBySlug";

// const TeamMemberFilter: React.FC = () => {
//   const { slug } = useParams();
//   const { data: project, isLoading } = useProjectDataBySlug(slug);

//   const setFilter = useTaskFilterStore((state) => state.setFilter);
//   const currentMembers = useTaskFilterStore(
//     (state) => state.filters.assignedMember
//   );

//   const handleMemberChange = (
//     selectedUsers: { id: string; name: string }[]
//   ) => {
//     const memberIds = selectedUsers.map((user) => parseInt(user.id));
//     setFilter("assignedMember", memberIds.length > 0 ? memberIds : []);
//   };

//   if (isLoading) {
//     return <p className="text-white/50">Loading members...</p>;
//   }

//   if (!project?.assignedMembers || project.assignedMembers.length === 0) {
//     return <p className="text-white/50">No assigned members available.</p>;
//   }

//   return (
//     <div className="flex flex-col items-start gap-2">
//       <div className="flex items-center justify-between w-full">
//         <h4 className="mb-1">Assigned Members</h4>
//         <button
//           onClick={() => setFilter("assignedMember", [])}
//           className="text-white/50 underline hover:text-white transition"
//         >
//           Show all
//         </button>
//       </div>
//       <TeamMemberPicker
//         onChange={handleMemberChange}
//         defaultMembers={currentMembers.map(String)}
//         isMulti={true}
//         filterByProjectMembers={project.assignedMembers}
//       />
//     </div>
//   );
// };

// export default TeamMemberFilter;
