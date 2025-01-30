import React from "react";
import { UseFormRegisterReturn, FieldErrors } from "react-hook-form";
import { InputField } from "../../components";

interface FormData {
  title: string;
}

interface TitleFieldProps {
  register: UseFormRegisterReturn;
  errors: FieldErrors<FormData>;
}

const TitleField: React.FC<TitleFieldProps> = ({ register, errors }) => {
  return (
    <div>
      <label htmlFor="title" className="block mb-2 text-white">
        Title
      </label>
      <InputField
        label="Title"
        type="text"
        placeholder="Enter project title"
        register={() => register}
        name="title"
        errors={errors}
      />
    </div>
  );
};

export default TitleField;
