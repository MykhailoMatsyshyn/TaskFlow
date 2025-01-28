import React, { useState, useEffect } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { customSelectStyles } from "./customSelectStyles";
import { useTeamMembersQuery } from "../../../../../hooks/useTeamMembersQuery";
import { useTeamMembersByIds } from "../../../../../hooks/useTeamMembersByIds";

const animatedComponents = makeAnimated();

interface TeamMemberSelectorProps {
  onChange: (selectedUsers: { id: string; name: string }[]) => void;
  defaultMembers?: string[];
  isMulti?: boolean;
  filterByProjectMembers?: string[];
}

const TeamMemberSelector: React.FC<TeamMemberSelectorProps> = ({
  onChange,
  defaultMembers = [],
  isMulti = true,
  filterByProjectMembers,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: allTeamMembers, isLoading: isSearching } =
    useTeamMembersQuery(searchQuery);
  const { data: loadedMembers, isLoading: isLoadingDefaultMembers } =
    useTeamMembersByIds(defaultMembers);

  const [selectedMembers, setSelectedMembers] = useState<
    { value: string; label: string; name: string }[]
  >([]);

  useEffect(() => {
    if (defaultMembers?.length && loadedMembers) {
      const formattedMembers = loadedMembers.map((member) => ({
        value: member.id,
        label: member.email,
        name: member.name,
      }));
      setSelectedMembers(formattedMembers);
    } else {
      setSelectedMembers([]);
    }
  }, [defaultMembers, loadedMembers]);

  const options =
    allTeamMembers?.map((member) => ({
      value: member.id,
      label: member.email,
      name: member.name,
    })) || [];

  const filteredOptions = filterByProjectMembers
    ? options.filter((option) => filterByProjectMembers.includes(option.value))
    : options;

  const handleInputChange = (inputValue: string) => {
    setSearchQuery(inputValue);
  };

  const handleChange = (selected: any) => {
    const formattedSelection = isMulti
      ? selected.map((option: any) => ({
          id: option.value,
          name: option.name,
        }))
      : selected
      ? [{ id: selected.value, name: selected.name }]
      : [];
    setSelectedMembers(isMulti ? selected : selected ? [selected] : []);
    onChange(formattedSelection);
  };

  return (
    <div className="w-full">
      <Select
        isMulti={isMulti}
        closeMenuOnSelect={!isMulti}
        components={animatedComponents}
        options={filteredOptions}
        value={selectedMembers}
        onInputChange={handleInputChange}
        isLoading={isSearching || isLoadingDefaultMembers}
        noOptionsMessage={() => "No Team Members"}
        styles={customSelectStyles}
        onChange={handleChange}
        placeholder={`Search by email${isMulti ? "s" : ""}...`}
      />
    </div>
  );
};

export default TeamMemberSelector;

// import React, { useState, useEffect } from "react";
// import Select from "react-select";
// import makeAnimated from "react-select/animated";
// import { useTeamMembersQuery } from "../../../../../hooks/useTeamMembersQuery";
// import { customSelectStyles } from "./customSelectStyles";
// import { useTeamMembersByIds } from "../../../../../hooks/useTeamMembersByIds";

// const animatedComponents = makeAnimated();

// interface TeamMemberPickerProps {
//   onChange: (selectedUsers: { id: string; name: string }[]) => void;
//   defaultMembers?: string[];
//   isMulti?: boolean;
// }

// const TeamMemberPicker: React.FC<TeamMemberPickerProps> = ({
//   onChange,
//   defaultMembers = [],
//   isMulti = true,
// }) => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const { data: teamMembers, isLoading: isSearching } =
//     useTeamMembersQuery(searchQuery);
//   const { data: loadedMembers, isLoading: isLoadingDefaultMembers } =
//     useTeamMembersByIds(defaultMembers);

//   const [selectedMembers, setSelectedMembers] = useState<
//     { value: string; label: string; name: string }[]
//   >([]);

//   useEffect(() => {
//     if (loadedMembers) {
//       const formattedMembers = loadedMembers.map((member) => ({
//         value: member.id,
//         label: member.email,
//         name: member.name,
//       }));
//       setSelectedMembers(formattedMembers);
//     }
//   }, [loadedMembers]);

//   const options = teamMembers
//     ? teamMembers.map((member) => ({
//         value: member.id,
//         label: member.email,
//         name: member.name,
//       }))
//     : [];

//   const handleInputChange = (inputValue: string) => {
//     setSearchQuery(inputValue);
//   };

//   const handleChange = (selected: any) => {
//     const formattedSelection = isMulti
//       ? selected.map((option: any) => ({
//           id: option.value,
//           name: option.name,
//         }))
//       : selected
//       ? [{ id: selected.value, name: selected.name }]
//       : [];
//     setSelectedMembers(isMulti ? selected : selected ? [selected] : []);
//     onChange(formattedSelection);
//   };

//   const CustomOption = (props: any) => {
//     const { data, innerRef, innerProps } = props;
//     return (
//       <div
//         ref={innerRef}
//         {...innerProps}
//         className="p-2 hover:bg-[#525252] transition-all rounded cursor-pointer"
//         style={{ backgroundColor: props.isFocused ? "#3d3d3d" : "#1f1f1f" }}
//       >
//         <div style={{ color: "#fff", fontWeight: "bold" }}>{data.name}</div>
//         <div style={{ color: "#888", fontSize: "12px" }}>{data.label}</div>
//       </div>
//     );
//   };

//   return (
//     <div>
//       <label htmlFor="team-members" className="block mb-[14px]">
//         {!isMulti ? "Team Member" : "Team Members"}
//       </label>
//       <Select
//         id="team-members"
//         isMulti={isMulti}
//         closeMenuOnSelect={!isMulti}
//         components={{
//           ...animatedComponents,
//           Option: CustomOption,
//         }}
//         options={options}
//         value={selectedMembers}
//         onInputChange={handleInputChange}
//         isLoading={isSearching || isLoadingDefaultMembers}
//         noOptionsMessage={() => "No Team Members"}
//         styles={customSelectStyles}
//         onChange={handleChange}
//         placeholder={`Search by email${isMulti ? "s" : ""}...`}
//       />
//     </div>
//   );
// };

// export default TeamMemberPicker;
