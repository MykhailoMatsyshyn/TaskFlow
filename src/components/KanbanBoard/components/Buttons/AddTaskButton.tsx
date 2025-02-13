import { useState } from "react";
import { CustomIcon } from "../../../UI/CustomIcon";
import { useCreateTask } from "../../../../hooks/tasks/useTasks";
import { TaskForm } from "../../../Forms";
import CustomModal from "../../../Modals/CustomModal";
// import CustomModal from "../../../CustomModal/CustomModal";
// import CustomModal from "./../../../CustomModal/CustomModal";

const AddTaskButton = ({ status, projectId }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const { mutate: createTask } = useCreateTask();

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleCreateTask = (taskData) => {
    const newTaskData = {
      ...taskData,
      status,
      projectId,
    };

    createTask(newTaskData, {
      onSuccess: () => {
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
        className="flex items-center justify-center gap-2 w-[335px] h-[56px] mt-[14px] mb-[24px] md:mb-[52px] xl:mb-[16px] bg-[#BEDBB0] rounded-lg text-[#161616] font-medium tracking-[-0.02em] hover:bg-[#9DC888] transition-all duration-400 ease-in-out"
        onClick={openModal}
      >
        <span className="flex items-center justify-center w-[30px] h-[30px] rounded-md bg-[#161616]">
          <CustomIcon id="plus" size={14} className="fill-white stroke-white" />
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
