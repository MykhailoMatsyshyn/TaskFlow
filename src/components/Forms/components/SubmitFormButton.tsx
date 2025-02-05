import React from "react";
import { CustomIcon } from "../../UI/CustomIcon";

interface SubmitFormButtonProps {
  buttonText?: string;
}

const SubmitFormButton: React.FC<SubmitFormButtonProps> = ({
  buttonText = "Create",
}) => {
  return (
    <div className="flex justify-end gap-4">
      <button
        type="submit"
        className="flex items-center justify-center gap-2 w-full h-[49px] bg-[#BEDBB0] rounded-lg text-[#161616] font-medium tracking-[-0.02em] hover:bg-[#9DC888] transition-all duration-400 ease-in-out"
      >
        <span className="p-[7px] rounded-md bg-[#161616]">
          <CustomIcon id="plus" size={14} className="fill-white stroke-white" />
        </span>
        {buttonText}
      </button>
    </div>
  );
};

export default SubmitFormButton;
