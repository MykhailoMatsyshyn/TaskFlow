import React from "react";
import { UseFormRegister } from "react-hook-form";

interface FormFields {
  description: string;
}

interface DescriptionFieldProps {
  register: UseFormRegister<FormFields>;
}

const DescriptionField: React.FC<DescriptionFieldProps> = ({ register }) => {
  return (
    <div className="relative">
      <label htmlFor="description" className="block mb-[14px]">
        Description
      </label>
      <textarea
        id="description"
        {...register("description")}
        placeholder="Enter project description"
        className="w-full h-[120px] p-[18px] pr-[10px] border border-[#BEDBB0] bg-[#1F1F1F] rounded-md opacity-40 focus:outline-none focus:opacity-100 text-white font-normal text-[14px] tracking-tight custom-scrollbar resize-none overflow-auto  transition-all duration-200 ease-in-out placeholder:text-white"
        style={{ maxHeight: "200px" }}
      />
    </div>
  );
};

export default DescriptionField;
