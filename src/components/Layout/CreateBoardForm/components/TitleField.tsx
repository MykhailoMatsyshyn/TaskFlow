import React from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";

interface FormData {
  title: string;
}

interface TitleFieldProps {
  register: UseFormRegister<{ title: string }>;
  errors: FieldErrors<FormData>;
}

const TitleField: React.FC<TitleFieldProps> = ({ register, errors }) => {
  return (
    <div className="relative">
      <label htmlFor="title" className="block mb-[14px]">
        Title
      </label>
      <input
        type="text"
        id="title"
        placeholder="Enter project title"
        {...register("title", { required: "Project title is required" })}
        className={`w-full h-[49px] p-[18px] border ${
          errors.title ? "border-red-500" : "border-[#BEDBB0]"
        } bg-[#1F1F1F] rounded-md opacity-40 focus:outline-none focus:opacity-100 text-white font-normal text-[14px] tracking-tight  transition-all duration-200 ease-in-out placeholder:text-white`}
      />
      {errors.title && (
        <p className="absolute text-red-500 text-xs mt-[-57px] ml-[13px] backdrop-blur-sm bg-opacity-30 bg-black rounded px-[5px]">
          {errors.title.message as string}
        </p>
      )}
    </div>
  );
};

export default TitleField;
