import { useState } from "react";

import CustomModal from "../CustomModal/CustomModal";
import { Icon } from "../Icon/Icon";
import AddColumnForm from "./AddColumnForm";

const AddColumnButton = (projectId: any) => {
  const [isModalOpen, setModalOpen] = useState(false);

  console.log("AddColumnButton projectId", projectId.projectId);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <div className="mr-5 lg:mr-8 xl:mr-6">
        <button
          className="flex items-center w-[335px] py-3 px-20 bg-blue-500 text-white rounded-md font-medium tracking-[-0.28px] transition-transform duration-250 hover:scale-105 scroll-snap-align-center"
          onClick={openModal}
        >
          <span className="flex justify-center items-center mr-2 w-7 h-7 bg-blue-700 rounded-lg">
            <Icon id={"plus"} />
          </span>
          Add another column
        </button>
      </div>
      {isModalOpen && (
        <CustomModal isOpen={isModalOpen} onClose={closeModal}>
          <AddColumnForm onClose={closeModal} projectId={projectId.projectId} />
        </CustomModal>
      )}
    </>
  );
};

export default AddColumnButton;
