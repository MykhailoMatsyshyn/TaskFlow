import React, { useState, useEffect } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { customSelectStyles } from "./customSelectStyles";
import { useTeamMembersQuery } from "../../../../../hooks/users/useTeamMembers";
import { useTeamMembersByIds } from "../../../../../hooks/users/useTeamMembers";

const animatedComponents = makeAnimated();

interface TeamMemberPickerProps {
  onChange: (selectedUsers: { id: string; name: string }[]) => void;
  defaultMembers?: string[];
  isMulti?: boolean;
  filterByProjectMembers?: string[];
}

const TeamMemberPicker: React.FC<TeamMemberPickerProps> = ({
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

export default TeamMemberPicker;
