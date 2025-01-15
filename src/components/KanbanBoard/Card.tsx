import { useDeleteTask } from "../../hooks/useDeleteTask";
import { useState } from "react";
import CustomModal from "../CustomModal/CustomModal";

const Card = ({ task }) => {
  const { mutate: deleteTask } = useDeleteTask(); // Використання мутації
  const [isModalOpen, setIsModalOpen] = useState(false); // Стан модалки

  const openModal = () => setIsModalOpen(true); // Відкрити модалку
  const closeModal = () => setIsModalOpen(false); // Закрити модалку

  const handleDeleteConfirm = () => {
    deleteTask(task.id); // Видалення задачі
    closeModal(); // Закриваємо модалку після видалення
  };

  return (
    <div className="p-4 h-[154px] w-[335px] bg-[#121212] rounded-lg">
      <h4 className="font-bold">{task.title}</h4>
      <p className="text-sm">{task.description}</p>
      <div className="flex gap-2">
        {/* Дії */}
        <button>Move</button>
        <button>Edit</button>
        <button onClick={openModal} className="text-red-500">
          Delete
        </button>
      </div>

      {/* Модалка підтвердження видалення */}
      <CustomModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Confirm Deletion"
      >
        <p>Are you sure you want to delete this task?</p>
        <div className="flex justify-end gap-4 mt-4">
          <button
            onClick={closeModal}
            className="px-4 py-2 bg-gray-500 text-white rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleDeleteConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded"
          >
            Delete
          </button>
        </div>
      </CustomModal>
    </div>
  );
};

export default Card;
