import React, { useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useTeamMembersQuery } from "../../../../../hooks/useTeamMembersQuery";
import { customSelectStyles } from "./customSelectStyles";
import { useTeamMembersByIds } from "../../../../../hooks/useTeamMembersByIds";

const animatedComponents = makeAnimated();

interface TeamMemberPickerProps {
  onChange: (selectedUsers: { id: string; name: string }[]) => void;
  defaultMembers?: string[]; // Масив ID учасників
}

const TeamMemberPicker: React.FC<TeamMemberPickerProps> = ({
  onChange,
  defaultMembers = [],
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: teamMembers, isLoading: isSearching } =
    useTeamMembersQuery(searchQuery);
  const { data: loadedMembers, isLoading: isLoadingDefaultMembers } =
    useTeamMembersByIds(defaultMembers);

  // Локальний стан для поточних вибраних учасників
  const [selectedMembers, setSelectedMembers] = useState<
    { value: string; label: string; name: string }[]
  >([]);

  // Оновлюємо `selectedMembers`, коли `loadedMembers` завантажуються
  React.useEffect(() => {
    if (loadedMembers) {
      const formattedMembers = loadedMembers.map((member) => ({
        value: member.id,
        label: member.email,
        name: member.name,
      }));
      setSelectedMembers(formattedMembers);
    }
  }, [loadedMembers]);

  // Формуємо опції для пошуку
  const options = teamMembers
    ? teamMembers.map((member) => ({
        value: member.id,
        label: member.email,
        name: member.name,
      }))
    : [];

  const handleInputChange = (inputValue: string) => {
    setSearchQuery(inputValue);
  };

  const handleChange = (selected: any) => {
    // Оновлюємо локальний стан та передаємо нові значення в `onChange`
    const formattedSelection = selected.map((option: any) => ({
      id: option.value,
      name: option.name,
    }));
    setSelectedMembers(selected); // Оновлюємо локальний стан
    onChange(formattedSelection); // Передаємо змінені дані в батьківський компонент
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
        <div style={{ color: "#888", fontSize: "12px" }}>{data.label}</div>
      </div>
    );
  };

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
        }}
        options={options}
        value={selectedMembers} // Контрольований стан для `value`
        onInputChange={handleInputChange}
        isLoading={isSearching || isLoadingDefaultMembers}
        noOptionsMessage={() => "No Team Members"}
        styles={customSelectStyles}
        onChange={handleChange} // Оновлення стану при зміні вибору
        placeholder="Search by emails..."
      />
    </div>
  );
};

export default TeamMemberPicker;
