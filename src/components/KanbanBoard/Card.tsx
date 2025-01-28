import { useState } from "react";
import CustomModal from "../CustomModal/CustomModal";
import TaskForm from "../Layout/ProjectForm/TaskForm";
import { useDeleteTask } from "../../hooks/useDeleteTask";
import { useUpdateTask } from "../../hooks/useUpdateTask";
import { CustomIcon } from "../CustomIcon/CustomIcon";
import DeleteModal from "../Modals/DeleteModal";

const Card = ({ task }) => {
  const { mutate: deleteTask } = useDeleteTask();
  const { mutate: updateTask } = useUpdateTask();
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  const openDeleteModal = () => setDeleteModalOpen(true);
  const closeDeleteModal = () => setDeleteModalOpen(false);
  const openEditModal = () => setEditModalOpen(true);
  const closeEditModal = () => setEditModalOpen(false);

  const handleDeleteConfirm = () => {
    deleteTask(task);
    closeDeleteModal();
  };

  const handleEditTask = (updatedData) => {
    const updatedTask = {
      ...task,
      ...updatedData,
    };

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

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };
    return date.toLocaleString("en-US", options);
  };

  const getDeadlineStatusIcon = () => {
    if (!task.endDate) return null;

    const today = new Date();
    const taskDate = new Date(task.endDate);

    if (
      today.getFullYear() === taskDate.getFullYear() &&
      today.getMonth() === taskDate.getMonth() &&
      today.getDate() === taskDate.getDate()
    ) {
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
    <div className="py-1">
      <div
        className={`relative py-[14px] pl-[20px] pr-[18px] h-[154px] w-[335px] bg-[#121212] rounded-lg rounded-l-[5px]
    before:content-[''] before:absolute before:top-0 before:left-0 before:h-full before:w-[5px] before:rounded-l-[8px] ${
      task.priority === "High"
        ? "before:bg-[#BEDBB0]"
        : task.priority === "Medium"
        ? "before:bg-[#E09CB5]"
        : task.priority === "Low"
        ? "before:bg-[#8FA1D0]"
        : "before:bg-[rgba(255,255,255,0.3)]"
    }`}
      >
        <h4 className="font-semibold text-[14px] tracking-[-0.02em] text-white mb-2">
          {task.title}
        </h4>

        {task.description ? (
          <p
            className="font-normal text-[12px] leading-[16px] tracking-[-0.02em] text-white/50 overflow-hidden text-ellipsis"
            style={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
              height: "32px",
            }}
          >
            {task.description}
          </p>
        ) : (
          <div style={{ height: "32px" }}></div>
        )}

        <hr className="mt-[25px] mb-[14px] border-white opacity-10" />

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="flex flex-col text-white/50 w-[58px]">
              <span className="font-normal text-[8px] tracking-[-0.02em] text-white/50 mb-1">
                Priority
              </span>
              <div className="flex items-center gap-2">
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    task.priority === "High"
                      ? "bg-[#BEDBB0]"
                      : task.priority === "Medium"
                      ? "bg-[#E09CB5]"
                      : task.priority === "Low"
                      ? "bg-[#8FA1D0]"
                      : "bg-[rgba(255,255,255,0.3)]"
                  }`}
                ></span>
                <span className="font-normal text-[10px] tracking-[-0.02em]">
                  {task.priority !== "Without priority"
                    ? task.priority
                    : "Without"}
                </span>
              </div>
            </div>
            <div className="flex flex-col text-white/50">
              <span className="font-normal text-[8px] tracking-[-0.02em] text-white/50 mb-1">
                Deadline
              </span>
              <span className="font-normal text-[10px] tracking-[-0.02em] text-[#BEDBB0]">
                {task.endDate ? formatDate(task.endDate) : "Select a date"}
              </span>
            </div>
          </div>

          <div className="flex gap-2">
            {getDeadlineStatusIcon()}
            <button onClick={openEditModal}>
              <CustomIcon
                id="edit"
                size={16}
                color="rgba(255, 255, 255, 0.5)"
              />
            </button>
            <button onClick={openDeleteModal}>
              <CustomIcon
                id="trash2"
                size={16}
                color="rgba(255, 255, 255, 0.5)"
              />
            </button>
          </div>
        </div>

        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={closeDeleteModal}
          onConfirm={handleDeleteConfirm}
          message="Are you sure you want to delete this task?"
        />

        <CustomModal
          isOpen={isEditModalOpen}
          onClose={closeEditModal}
          title="Edit Task"
        >
          <TaskForm
            initialData={task}
            onSubmit={handleEditTask}
            onCancel={closeEditModal}
          />
        </CustomModal>
      </div>
    </div>
  );
};

export default Card;
