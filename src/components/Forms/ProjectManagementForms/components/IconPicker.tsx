import React from "react";
import { CustomIcon } from "../../../CustomIcon/CustomIcon";

interface IconPickerProps {
  IconNames: string[];
  selectedIcon: string;
  onIconSelect: (CustomIcon: string) => void;
}

const IconPicker: React.FC<IconPickerProps> = ({
  IconNames,
  selectedIcon,
  onIconSelect,
}) => {
  return (
    <div>
      <label className="block mb-[14px]">Icon</label>
      <ul className="flex gap-3 flex-wrap pl-[1px]">
        {IconNames.map((name) => (
          <li key={name} className="list-none">
            <button
              type="button"
              onClick={() => onIconSelect(name)}
              className={`focus:outline-none transition-transform duration-200 ${
                selectedIcon === name ? "scale-[130%]" : "hover:scale-[130%]"
              }`}
            >
              <CustomIcon
                id={name}
                size={20}
                // color={
                //   selectedIcon === name ? "#fff" : "rgba(255, 255, 255, 0.5)"
                // }
                color={
                  selectedIcon === name
                    ? "var(--text-color)"
                    : "var(--text-color-transparent)"
                }
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IconPicker;
