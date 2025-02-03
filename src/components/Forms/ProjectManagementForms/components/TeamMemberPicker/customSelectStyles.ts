import { StylesConfig } from "react-select";

export const customSelectStyles: StylesConfig = {
  menu: (provided) => ({
    ...provided,
    backgroundColor: "var(--primary-bg)", // Використовуємо змінну
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
      height: "6px",
    },
    "::-webkit-scrollbar-thumb": {
      backgroundColor: "var(--scrollbar-thumb)", // Використовуємо змінну
      borderRadius: "8px",
    },
    "::-webkit-scrollbar-track": {
      backgroundColor: "var(--scrollbar-track)", // Використовуємо змінну
    },
  }),
  control: (provided, state) => ({
    ...provided,
    backgroundColor: "var(--primary-bg)", // Використовуємо змінну
    border: "1px solid #BEDBB0", // Використовуємо змінну
    borderRadius: "6px",
    padding: "10px",
    opacity: state.isFocused ? 1 : 0.4,
    transition: "opacity 0.2s ease-in-out",
    "&:hover": {
      opacity: 1,
    },
    color: "var(--text-color)", // Використовуємо змінну
    boxShadow: "none",
    minHeight: "49px",
    paddingLeft: "9px",
    cursor: "pointer",
    fontSize: "12px",
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: "var(--text-color-transparent)", // Використовуємо змінну
    transition: "color 0.2s ease-in-out",
    "&:hover": {
      color: "var(--text-color)", // Використовуємо змінну
    },
  }),
  clearIndicator: (provided) => ({
    ...provided,
    color: "var(--text-color-transparent)", // Використовуємо змінну
    transition: "color 0.2s ease-in-out",
    "&:hover": {
      color: "var(--text-color)", // Використовуємо змінну
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "var(--text-color)", // Використовуємо змінну
  }),
  input: (provided) => ({
    ...provided,
    color: "var(--text-color)", // Використовуємо змінну
    fontWeight: "400",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "var(--text-color-transparent)", // Використовуємо змінну
    fontWeight: "400",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused
      ? "var(--highlight-bg)"
      : "var(--primary-bg)", // Використовуємо змінні
    color: "var(--text-color)", // Використовуємо змінну
    "&:hover": {
      backgroundColor: "var(--secondary-bg)", // Використовуємо змінну
    },
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: "var(--primary-bg)", // Використовуємо змінну
    borderRadius: "8px",
    border: "1px solid #BEDBB0", // Використовуємо змінну
    color: "var(--text-color)", // Використовуємо змінну
    padding: "2px 5px",
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: "var(--text-color)", // Використовуємо змінну
    fontWeight: "400",
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: "var(--text-color)", // Використовуємо змінну
    cursor: "pointer",
    "&:hover": {
      color: "var(--primary-bg)", // Використовуємо змінну для hover
    },
  }),
};
