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
      <div className="mt-2">
        <button
          className="flex items-center w-[335px] py-3 px-20 bg-green-500 text-white rounded-md font-medium tracking-[-0.28px] transition-transform duration-250 hover:scale-105"
          onClick={openModal}
        >
          <span className="flex justify-center items-center mr-2 w-7 h-7 bg-green-700 rounded-lg">
            <Icon id={"plus"} />
          </span>
          Add another card
        </button>
      </div>
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
