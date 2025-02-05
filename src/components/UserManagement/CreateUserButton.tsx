import { useState } from "react";
import CustomModal from "../Modals/CustomModal";
import { CreateUserForm } from "../Forms";
import { RegisterUserData } from "../../types/auth";
import useAuthMutation from "../../hooks/auth/useAuthMutation";
import { toast } from "react-toastify";

/**
 * CreateUserButton Component
 *
 * This component renders a button that opens a modal for user registration.
 * Inside the modal, there is a form to create a new user.
 */
const CreateUserButton: React.FC = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const createUserMutation = useAuthMutation("register");

  const handleCreateUserSubmit = (data: RegisterUserData) => {
    createUserMutation.mutate(data, {
      onSuccess: () => {
        setIsCreateModalOpen(false);
        toast.success("User created successfully!");
      },
    });
  };

  return (
    <>
      <button
        className={`px-3 py-2 text-sm rounded-lg border-[2px] transition-all ${
          isCreateModalOpen
            ? "bg-[#BEDBB0] text-text-inverted border-[#BEDBB0]"
            : "bg-transparent text-text border-[#BEDBB0] hover:bg-[#BEDBB0] hover:text-text-inverted"
        }`}
        onClick={() => setIsCreateModalOpen(true)}
      >
        Register New User
      </button>

      {/* Modal for creating a new user */}
      <CustomModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Register New User"
      >
        <CreateUserForm onSubmit={handleCreateUserSubmit} />
      </CustomModal>
    </>
  );
};

export default CreateUserButton;
