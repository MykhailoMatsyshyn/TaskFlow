import React, { useState } from "react";
import { Icon } from "../Icon/Icon";
import CustomModal from "../CustomModal/CustomModal";
import CreateBoardForm from "./CreateBoardForm"; // Імпортуємо форму

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
          <Icon id="plus" size={20} />
        </button>
      </div>
      <hr className="border-white/10 mb-10" />

      {/* Модальне вікно */}
      <CustomModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Create New Board"
      >
        <CreateBoardForm
          onCancel={handleCloseModal}
          teamMembers={[
            { id: "1", name: "Alice" },
            { id: "2", name: "Bob" },
          ]}
        />
      </CustomModal>
    </>
  );
};

export default CreateBoard;
