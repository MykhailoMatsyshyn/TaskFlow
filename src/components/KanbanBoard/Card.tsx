import { useState } from "react";
import CustomModal from "../CustomModal/CustomModal";
import TaskForm from "../Layout/ProjectForm/TaskForm";
import { useDeleteTask } from "../../hooks/useDeleteTask";
import { useUpdateTask } from "../../hooks/useUpdateTask";

const Card = ({ task }) => {
  const { mutate: deleteTask } = useDeleteTask(); // Використання мутації для видалення
  const { mutate: updateTask } = useUpdateTask(); // Використання мутації для оновлення
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false); // Стан модалки видалення
  const [isEditModalOpen, setEditModalOpen] = useState(false); // Стан модалки редагування

  const openDeleteModal = () => setDeleteModalOpen(true); // Відкрити модалку видалення
  const closeDeleteModal = () => setDeleteModalOpen(false); // Закрити модалку видалення

  const openEditModal = () => setEditModalOpen(true); // Відкрити модалку редагування
  const closeEditModal = () => setEditModalOpen(false); // Закрити модалку редагування

  const handleDeleteConfirm = () => {
    deleteTask(task.id); // Видалення задачі
    closeDeleteModal(); // Закриваємо модалку після видалення
  };

  const handleEditTask = (updatedData) => {
    console.log(
      "========================\n updatedData\n",
      updatedData,
      "\n========================"
    );

    const updatedTask = {
      ...task,
      ...updatedData,
    };

    console.log(
      "========================\n updatedTask\n",
      updatedTask,
      "\n========================"
    );

    updateTask(
      { id: task.id, data: updatedData },
      {
        onSuccess: () => {
          console.log("Task updated successfully");
        },
        onError: (error) => {
          console.error("Failed to update task:", error.message);
        },
      }
    );
  };

  return (
    <div className="p-4 h-[154px] w-[335px] bg-[#121212] rounded-lg">
      <h4 className="font-bold">{task.title}</h4>
      <p className="text-sm">{task.description}</p>
      <div className="flex gap-2">
        {/* Дії */}
        <button>Move</button>
        <button onClick={openEditModal} className="text-blue-500">
          Edit
        </button>
        <button onClick={openDeleteModal} className="text-red-500">
          Delete
        </button>
      </div>

      {/* Модалка підтвердження видалення */}
      <CustomModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        title="Confirm Deletion"
      >
        <p>Are you sure you want to delete this task?</p>
        <div className="flex justify-end gap-4 mt-4">
          <button
            onClick={closeDeleteModal}
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

      {/* Модалка редагування */}
      <CustomModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        title="Edit Task"
      >
        <TaskForm
          initialData={task} // Передаємо поточні дані задачі
          onSubmit={handleEditTask} // Функція для обробки оновлення
          onCancel={closeEditModal} // Закриття модалки
        />
      </CustomModal>
    </div>
  );
};

export default Card;
