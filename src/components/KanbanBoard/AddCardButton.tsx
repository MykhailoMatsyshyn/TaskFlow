import { useState } from "react";
// import AddCardForm from "components/AddCardForm";
import CustomModal from "../CustomModal/CustomModal";
import { Icon } from "../Icon/Icon";

const AddCardButton = ({ columnId }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <button
        className="flex items-center justify-center gap-2 w-[335px] h-[56px] mt-[14px] mb-[24px] md:mb-[52px] xl:mb-[16px] bg-[#BEDBB0] rounded-lg text-[#161616] font-medium tracking-[-0.02em] transition-transform duration-250 hover:scale-105"
        onClick={openModal}
      >
        <span className="p-[7px] rounded-md bg-[#161616]">
          <Icon id="plus" size={14} className="fill-white" />
        </span>
        Add another card
      </button>
      {isModalOpen && (
        <CustomModal isOpen={isModalOpen} onClose={closeModal}>
          {/* <AddCardForm onClose={closeModal} columnId={columnId} /> */}
          <p>add card</p>
        </CustomModal>
      )}
    </>
  );
};

export default AddCardButton;
