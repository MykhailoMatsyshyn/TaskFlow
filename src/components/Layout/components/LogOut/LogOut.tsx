import { useNavigate } from "react-router-dom";
import { Icon } from "../../../Icon/Icon";
// import Modal from "../../../Modal/Modal"; // Імпортуємо Modal
// import useModalStore from "../../../../stores/modalStore"; // Імпортуємо useModalStore для керування станом модального вікна
import useUserStore from "../../../../stores/userStore";
import { useState } from "react";
import CustomModal from "../../../CustomModal/CustomModal";

const LogOut = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { setCurrentUser } = useUserStore(); // Отримуємо стан користувача та змінюємо ��ого зміст використовуючи useUserStore
  // const { isModalOpen, openModal, closeModal } = useModalStore(); // Отримуємо стан модального вікна

  // const handleOpenModal = () => {
  //   openModal(); // Відкриваємо модальне вікно
  // };

  // const handleCloseModal = () => {
  //   closeModal(); // Закриваємо модальне вікно
  // };

  const handleOpenModal = () => {
    setIsModalOpen(true); // Відкриваємо модальне вікно
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Закриваємо модальне вікно
  };

  const handleConfirmLogout = () => {
    localStorage.removeItem("token"); // Видаляємо токен з localStorage
    setCurrentUser(null);
    navigate("/welcome"); // Перенаправляємо на сторінку вітання
    handleCloseModal(); // Закриваємо модальне вікно після підтвердження
  };

  return (
    <div className="flex px-6">
      <button
        onClick={handleOpenModal}
        className="flex justify-between items-center gap-[14px] bg-transparent text-base font-medium hover:fill-[#9DC888]"
      >
        <Icon
          id="logout"
          size={32}
          className="fill-[#BEDBB0] group-hover:fill-[#9DC888]"
        />
        <p className="text-lg font-medium">Log Out</p>
      </button>

      <CustomModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Log Out"
      >
        <p>Are you sure you want to log out?</p>
        <div className="flex justify-between mt-4">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded"
            onClick={handleConfirmLogout}
          >
            Yes
          </button>
          <button
            className="bg-gray-300 text-black px-4 py-2 rounded"
            onClick={handleCloseModal}
          >
            No
          </button>
        </div>
      </CustomModal>
    </div>
  );
};

export default LogOut;
