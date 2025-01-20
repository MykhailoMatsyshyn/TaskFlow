import { useState } from "react";

import CustomModal from "../CustomModal/CustomModal";
import { CustomIcon } from "../CustomIcon/CustomIcon";
import AddColumnForm from "./AddColumnForm";

const AddColumnButton = ({
  projectId,
  columns,
}: {
  projectId: string;
  columns: { id: string; title: string }[];
}) => {
  const [isModalOpen, setModalOpen] = useState(false);

  console.log("AddColumnButton", projectId);
  console.log("AddColumnButton projectId", columns);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <div>
        <button
          className="flex items-center justify-center gap-2 w-[335px] h-[56px] bg-[#121212] rounded-lg text-[#fff] font-medium tracking-[-0.02em] transition-transform duration-250 hover:scale-105"
          onClick={openModal}
        >
          <span className="p-[7px] rounded-md bg-[#FFFFFF]">
            <CustomIcon id="plus" size={14} className="fill-[#121212]" />
          </span>
          Add another column
        </button>
      </div>
      {isModalOpen && (
        <CustomModal isOpen={isModalOpen} onClose={closeModal}>
          <AddColumnForm
            onClose={closeModal}
            projectId={projectId}
            existingColumnTitles={
              Array.isArray(columns) ? columns.map((col) => col.title) : []
            }
          />
        </CustomModal>
      )}
    </>
  );
};

export default AddColumnButton;
