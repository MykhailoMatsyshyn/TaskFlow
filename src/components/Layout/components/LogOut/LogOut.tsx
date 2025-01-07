import { useNavigate } from "react-router-dom";
import { Icon } from "../../../Icon/Icon";
import Modal from "../../../Modal/Modal"; // Імпортуємо Modal
import useModalStore from "../../../../stores/modalStore"; // Імпортуємо useModalStore для керування станом модального вікна

const LogOut = () => {
  const navigate = useNavigate();
  const { isModalOpen, openModal, closeModal } = useModalStore(); // Отримуємо стан модального вікна

  const handleOpenModal = () => {
    openModal(); // Відкриваємо модальне вікно
  };

  const handleCloseModal = () => {
    closeModal(); // Закриваємо модальне вікно
  };

  const handleConfirmLogout = () => {
    localStorage.removeItem("token"); // Видаляємо токен з localStorage
    navigate("/welcome"); // Перенаправляємо на сторінку вітання
    closeModal(); // Закриваємо модальне вікно після підтвердження
  };

  return (
    <div className="flex px-3">
      <button
        onClick={handleOpenModal} // Відкриваємо модальне вікно при натисканні на кнопку
        className="flex justify-between items-center w-[105px] mt-5 p-0 bg-transparent text-base font-medium hover:fill-[#9DC888]"
      >
        <Icon
          id="logout"
          size={32}
          className="fill-[#BEDBB0] group-hover:fill-[#9DC888]"
        />
        <p className="text-lg font-medium">Log Out</p>
      </button>

      {/* Використовуємо Modal і передаємо пропс isOpen для керування видимістю */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h2>Are you sure you want to log out?</h2>
        <div className="flex justify-between mt-4">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded"
            onClick={handleConfirmLogout}
          >
            Yes
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default LogOut;
