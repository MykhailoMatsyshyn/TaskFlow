import { useState } from "react";
import CustomModal from "../CustomModal/CustomModal";
import { CustomIcon } from "../CustomIcon/CustomIcon";
import { useCreateTask } from "../../hooks/useCreateTask";
import TaskForm from "../Layout/ProjectForm/TaskForm";

const AddTaskButton = ({ status }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const { mutate: createTask } = useCreateTask();

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleCreateTask = (taskData) => {
    console.log("taskData", taskData, "column", status);

    const newTaskData = {
      ...taskData,
      status,
    };

    createTask(newTaskData, {
      onSuccess: () => {
        console.log("Task created successfully!");
        closeModal();
      },
      onError: (error) => {
        console.error("Failed to create task:", error.message);
      },
    });
  };

  return (
    <>
      <button
        className="flex items-center justify-center gap-2 w-[335px] h-[56px] mt-[14px] mb-[24px] md:mb-[52px] xl:mb-[16px] bg-[#BEDBB0] rounded-lg text-[#161616] font-medium tracking-[-0.02em] transition-transform duration-250 hover:scale-105"
        onClick={openModal}
      >
        <span className="p-[7px] rounded-md bg-[#161616]">
          <CustomIcon id="plus" size={14} className="fill-white" />
        </span>
        Add a card
      </button>

      {isModalOpen && (
        <CustomModal
          isOpen={isModalOpen}
          onClose={closeModal}
          title="Add a Task Card"
        >
          <TaskForm onSubmit={handleCreateTask} onCancel={closeModal} />
        </CustomModal>
      )}
    </>
  );
};

export default AddTaskButton;
