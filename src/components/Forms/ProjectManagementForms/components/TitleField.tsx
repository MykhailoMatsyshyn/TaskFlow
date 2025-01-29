import React from "react";
import { UseFormRegisterReturn, FieldErrors } from "react-hook-form";

interface FormData {
  title: string;
}

interface TitleFieldProps {
  register: UseFormRegisterReturn;
  errors: FieldErrors<FormData>;
}

const TitleField: React.FC<TitleFieldProps> = ({ register, errors }) => {
  return (
    <div className="relative">
      <label htmlFor="title" className="block mb-2 text-white">
        Title
      </label>
      <input
        type="text"
        id="title"
        placeholder="Enter project title"
        {...register}
        className={`w-full h-[49px] p-4 border ${
          errors.title ? "border-red-500" : "border-[#BEDBB0]"
        } bg-[#1F1F1F] rounded-md text-white placeholder-white focus:outline-none focus:ring focus:ring-green-500 transition-all duration-200`}
      />
      {errors.title && (
        <p className="absolute text-red-500 text-sm mt-1">
          {errors.title.message}
        </p>
      )}
    </div>
  );
};

export default TitleField;
