import { useState } from "react";
import CustomModal from "../../../CustomModal/CustomModal";
import { CustomIcon } from "../../../CustomIcon/CustomIcon";
import { ColumnForm } from "../../../Forms";

const AddColumnButton = ({
  projectId,
  columns,
}: {
  projectId: string;
  columns: { id: string; title: string }[];
}) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <div className="mr-[20px]">
        <button
          className="flex items-center justify-center gap-2 w-[335px] h-[56px] bg-[#121212] rounded-lg text-[#fff] font-normal tracking-[-0.02em]"
          onClick={openModal}
        >
          <span className="p-[7px] rounded-md bg-[#FFFFFF]">
            <CustomIcon
              id="plus"
              size={14}
              className="fill-[#121212] stroke-black"
            />
          </span>
          Add another column
        </button>
      </div>

      {isModalOpen && (
        <CustomModal
          isOpen={isModalOpen}
          onClose={closeModal}
          title="Add Column"
        >
          <ColumnForm
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
