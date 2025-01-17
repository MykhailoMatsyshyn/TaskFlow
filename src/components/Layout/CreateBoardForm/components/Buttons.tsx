import React from "react";
import { CustomIcon } from "../../../CustomIcon/CustomIcon";

interface ButtonsProps {
  onCancel: () => void;
}

const Buttons: React.FC<ButtonsProps> = ({ onCancel }) => {
  return (
    <div className="flex justify-end gap-4">
      <button
        className="flex items-center justify-center gap-2 w-full h-[49px] bg-[#BEDBB0] rounded-lg text-[#161616] font-medium tracking-[-0.02em] hover:bg-[#9DC888] transition-all duration-400 ease-in-ou"
        // onClick={openModal}
      >
        <span className="p-[7px] rounded-md bg-[#161616]">
          <CustomIcon id="plus" size={14} className="fill-white" />
        </span>
        Create
      </button>
    </div>
  );
};

export default Buttons;
