import { useState } from "react";
import { CustomIcon } from "../CustomIcon/CustomIcon";
import CustomModal from "../CustomModal/CustomModal";
import { ProjectForm } from "../Forms";
import { useCreateProject } from "../../hooks/useCreateProject";

const CreateBoard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutate: createProject } = useCreateProject();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCreateProject = (projectData: any) => {
    createProject(projectData, {
      onSuccess: () => {
        handleCloseModal();
      },
      onError: (error) => {
        console.error("Failed to create project:", error.message);
      },
    });
  };

  return (
    <>
      <div className="flex justify-between items-center pr-1 my-[14px]">
        <p className="font-medium text-sm text-text tracking-[-0.02em] h-[42px]">
          Create a <br /> new board
        </p>

        <button
          onClick={handleOpenModal}
          className="px-[10px] py-2 w-10 h-[36px] rounded-md bg-[#BEDBB0]"
        >
          <CustomIcon
            id="plus"
            size={20}
            className="fill-background-highlight stroke-background-highlight"
          />
        </button>
      </div>
      <hr className="text-text opacity-50 mb-10" />

      <CustomModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Create New Project Board"
      >
        <ProjectForm
          onSubmit={handleCreateProject}
          onCancel={handleCloseModal}
        />
      </CustomModal>
    </>
  );
};

export default CreateBoard;
