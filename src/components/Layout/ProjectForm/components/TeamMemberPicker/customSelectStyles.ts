import { StylesConfig } from "react-select";

export const customSelectStyles: StylesConfig = {
  menu: (provided) => ({
    ...provided,
    backgroundColor: "#1f1f1f",
    padding: "8px",
    borderRadius: "6px",
  }),
  menuList: (provided) => ({
    ...provided,
    maxHeight: "150px",
    overflowY: "auto",
    borderRadius: "6px",
    "::-webkit-scrollbar": {
      width: "6px",
    },
    "::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(190, 219, 176, 0.5)",
      borderRadius: "8px",
    },
    "::-webkit-scrollbar-track": {
      backgroundColor: "rgba(190, 219, 176, 0.05)",
    },
  }),
  control: (provided, state) => ({
    ...provided,
    backgroundColor: "#1f1f1f",
    border: "1px solid #BEDBB0",
    borderRadius: "6px",
    padding: "10px",
    opacity: state.isFocused ? 1 : 0.4,
    transition: "opacity 0.2s ease-in-out",
    "&:hover": {
      opacity: 1,
    },
    color: "#fff",
    boxShadow: "none",
    minHeight: "49px",
    paddingLeft: "9px",
    cursor: "pointer",
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: "#BEDBB0",
    transition: "color 0.2s ease-in-out",
    "&:hover": {
      color: "#fff",
    },
  }),
  clearIndicator: (provided) => ({
    ...provided,
    color: "#BEDBB0",
    transition: "color 0.2s ease-in-out",
    "&:hover": {
      color: "#fff",
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#fff",
  }),
  input: (provided) => ({
    ...provided,
    color: "#fff",
    fontWeight: "400",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#fff",
    fontWeight: "400",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? "#3d3d3d" : "#1f1f1f",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#525252",
    },
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: "#1F1F1F",
    borderRadius: "8px",
    border: "1px solid #BEDBB0",
    color: "#fff",
    padding: "2px 5px",
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: "#fff",
    fontWeight: "400",
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: "#fff",
    cursor: "pointer",
    "&:hover": {
      //   backgroundColor: "#BEDBB0",
      //   borderRadius: "50%",
      color: "#1F1F1F",
    },
  }),
};
