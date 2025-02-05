import { useState, useCallback } from "react";
import { CustomIcon } from "../../../../UI/CustomIcon";
// import DeleteModal from "../../../../UI/Modals/DeleteModal";
// import CustomModal from "../../../../Modals/CustomModal/CustomModal";
import { useDeleteTask } from "../../../../../hooks/tasks/useTasks";
import { useUpdateTask } from "../../../../../hooks/tasks/useTasks";
import { TaskForm } from "../../../../Forms";
import { toast } from "react-toastify";
import DeleteModal from "../../../../Modals/DeleteModal";
import CustomModal from "../../../../Modals/CustomModal";
import ActionButtons from "../../../../UI/ActionButtons";
// import CustomModal from "../../../../CustomModal/CustomModal";

const CardActions = ({ task }) => {
  const { mutate: deleteTask } = useDeleteTask();
  const { mutate: updateTask } = useUpdateTask();

  const [modalState, setModalState] = useState({
    delete: false,
    edit: false,
  });

  const openModal = (type) =>
    setModalState((prev) => ({ ...prev, [type]: true }));
  const closeModal = (type) =>
    setModalState((prev) => ({ ...prev, [type]: false }));

  const handleDeleteConfirm = useCallback(() => {
    deleteTask(task);
    closeModal("delete");
  }, [deleteTask, task]);

  const handleEditTask = useCallback(
    (updatedData) => {
      updateTask(
        { id: task.id, data: updatedData },
        {
          onSuccess: () => {
            toast.success("Task updated successfully!");
          },
        }
      );
      closeModal("edit");
    },
    [updateTask, task]
  );

  const getDeadlineStatusIcon = () => {
    if (!task.endDate) return null;

    const today = new Date();
    const taskDate = new Date(task.endDate);

    if (today.toDateString() === taskDate.toDateString()) {
      return (
        <CustomIcon
          id="bell"
          size={16}
          color="#BEDBB0"
          className="filter drop-shadow-[0_0_7px_#BEDBB0]"
        />
      );
    }

    if (today > taskDate) {
      return (
        <CustomIcon
          id="bell"
          size={16}
          color="#FF4A4D"
          className="filter drop-shadow-[0_0_7px_#FF4A4D]"
        />
      );
    }

    return null;
  };

  return (
    <div className="flex gap-2">
      {getDeadlineStatusIcon()}

      <ActionButtons
        onEdit={() => openModal("edit")}
        onDelete={() => openModal("delete")}
      />

      {/* Модалка видалення */}
      <DeleteModal
        isOpen={modalState.delete}
        onClose={() => closeModal("delete")}
        onConfirm={handleDeleteConfirm}
        message="Are you sure you want to delete this task?"
      />

      {/* Модалка редагування */}
      <CustomModal
        isOpen={modalState.edit}
        onClose={() => closeModal("edit")}
        title="Edit Task"
      >
        <TaskForm
          initialData={task}
          onSubmit={handleEditTask}
          onCancel={() => closeModal("edit")}
        />
      </CustomModal>
    </div>
  );
};

export default CardActions;
