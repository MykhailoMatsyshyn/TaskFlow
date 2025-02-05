import { useState } from "react";
import { CustomIcon } from "../../../UI/CustomIcon";
import { ColumnForm } from "../../../Forms";
import CustomModal from "../../../Modals/CustomModal";
// import CustomModal from "../../../CustomModal/CustomModal";

const AddColumnButton = ({
  projectId,
  columns,
}: {
  projectId: number;
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
          className="flex items-center justify-center gap-2 w-[335px] h-[56px] bg-background-highlight rounded-lg text-text font-normal tracking-[-0.02em]"
          onClick={openModal}
        >
          <span className="p-[7px] rounded-md bg-text">
            <CustomIcon
              id="plus"
              size={14}
              className="fill-background-highlight stroke-background-highlight"
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
