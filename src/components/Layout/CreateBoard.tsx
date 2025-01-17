import { useState } from "react";
import { CustomIcon } from "../CustomIcon/CustomIcon";
import CustomModal from "../CustomModal/CustomModal";
import ProjectForm from "./ProjectForm/ProjectForm";
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
        console.log("Project created successfully");
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
        <p className="font-medium text-sm tracking-[-0.02em] h-[42px]">
          Create a <br /> new board
        </p>

        <button
          onClick={handleOpenModal}
          className="px-[10px] py-2 w-10 h-[36px] rounded-md bg-[#BEDBB0]"
        >
          <CustomIcon id="plus" size={20} />
        </button>
      </div>
      <hr className="border-white/10 mb-10" />

      {/* Модальне вікно */}
      <CustomModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Create New Project"
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
