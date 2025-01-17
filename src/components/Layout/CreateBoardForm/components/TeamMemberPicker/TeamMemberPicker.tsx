import React, { useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useTeamMembersQuery } from "../../../../../hooks/useTeamMembersQuery";
import { customSelectStyles } from "./customSelectStyles";

const animatedComponents = makeAnimated();

interface TeamMemberPickerProps {
  onChange: (selectedUsers: { id: string; name: string }[]) => void;
}

const TeamMemberPicker: React.FC<TeamMemberPickerProps> = ({ onChange }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: teamMembers, isLoading } = useTeamMembersQuery(searchQuery);

  console.log("teamMembers", teamMembers);

  const options = teamMembers
    ? teamMembers.map((member) => ({
        value: member.id,
        // label: `${member.name} (${member.email})`,
        label: member.email,
        name: member.name,
        email: member.email,
      }))
    : [];

  console.log("Options: ", options);

  const handleInputChange = (inputValue: string) => {
    console.log("Search Query Updated: ", inputValue);
    setSearchQuery(inputValue);
  };

  const CustomOption = (props: any) => {
    const { data, innerRef, innerProps } = props;
    return (
      <div
        ref={innerRef}
        {...innerProps}
        className="p-2 hover:bg-[#525252] transition-all rounded cursor-pointer"
        style={{ backgroundColor: props.isFocused ? "#3d3d3d" : "#1f1f1f" }}
      >
        <div style={{ color: "#fff", fontWeight: "bold" }}>{data.name}</div>
        <div style={{ color: "#888", fontSize: "12px" }}>{data.email}</div>
      </div>
    );
  };

  //   const CustomSingleValue = (props: any) => {
  //     const { data } = props;
  //     return <span style={{ color: "#fff" }}>{data}</span>;
  //   };

  return (
    <div>
      <label htmlFor="team-members" className="block mb-[14px]">
        Team Members
      </label>
      <Select
        id="team-members"
        isMulti
        closeMenuOnSelect={false}
        components={{
          ...animatedComponents,
          Option: CustomOption,
          // SingleValue: CustomSingleValue,
        }}
        options={options}
        onInputChange={handleInputChange}
        isLoading={isLoading}
        noOptionsMessage={() => "No Team Members"}
        styles={customSelectStyles}
        onChange={(selected) => {
          const formattedSelection = selected.map((option) => ({
            id: option.value,
            name: option.name,
          }));
          onChange(formattedSelection);
        }}
        placeholder="Search by emails..."
      />
    </div>
  );
};

export default TeamMemberPicker;
