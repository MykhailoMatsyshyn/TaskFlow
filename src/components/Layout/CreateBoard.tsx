import React, { useState } from "react";
import { CustomIcon } from "../CustomIcon/CustomIcon";
import CustomModal from "../CustomModal/CustomModal";
import CreateBoardForm from "./CreateBoardForm/CreateBoardForm"; // Імпортуємо форму

const CreateBoard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="flex justify-between items-center pr-1 my-[14px]">
        <p className="font-medium text-sm tracking-[-0.02em] h-[42px]">
          Create a <br /> new board
        </p>

        <button
          onClick={handleOpenModal}
          className="px-[10px] py-2 w-10 h-[36px] rounded-md bg-[#BEDBB0]"
        >
          <CustomIcon id="plus" size={20} />
        </button>
      </div>
      <hr className="border-white/10 mb-10" />

      {/* Модальне вікно */}
      <CustomModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Create New Project"
      >
        <CreateBoardForm onCancel={handleCloseModal} />
      </CustomModal>
    </>
  );
};

export default CreateBoard;
