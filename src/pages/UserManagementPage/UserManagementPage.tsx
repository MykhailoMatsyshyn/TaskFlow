import { ColumnDef } from "@tanstack/react-table";
import Table from "../../components/Table/Table";
import { User } from "../../types/user";
import React, { useState } from "react";
import useFetchUsers, { useDeleteUser } from "../../hooks/useFetchUsers";
import { CustomIcon } from "../../components/CustomIcon/CustomIcon";
import useFilterStore from "../../stores/filterStore";
import CustomModal from "../../components/CustomModal/CustomModal";
import useUserStore from "../../stores/userStore";
import EditUserForm from "../../components/UserForms/EditUserForm";
import FilterIcon from "../../components/Table/FilterIcon";
import { RegisterUserData } from "../../types/auth";
import CreateUserForm from "../../components/CreateUserForm";
import useAuthMutation from "../../hooks/useAuthMutation";
import { useUpdateUser } from "../../hooks/useUpdateUser";
import DeleteModal from "../../components/Modals/DeleteModal";

const UserManagementPage = () => {
  const { filters } = useFilterStore();
  const { data } = useFetchUsers(filters);

  const { users, totalCount } = data || { users: [], totalCount: 0 };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState<number | null>(null);
  const [userNameToDelete, setUserNameToDelete] = useState<string | null>(null);
  const [userToEdit, setUserToEdit] = useState<User | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const createUserMutation = useAuthMutation("register");
  const updateUserMutation = useUpdateUser();
  const { mutate: deleteUserMutation } = useDeleteUser();

  const handleCreateUser = () => {
    setIsCreateModalOpen(true);
  };

  const handleCreateUserSubmit = (data: RegisterUserData) => {
    const filteredData = (({ confirmPassword, ...rest }) => rest)(data);

    createUserMutation.mutate(filteredData, {
      onSuccess: () => {
        setIsCreateModalOpen(false);
      },
      onError: (error) => {
        console.error("Error creating user:", error.message);
      },
    });
  };

  const handleEdit = (user: User) => {
    setUserToEdit(user);
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = (updatedData: Partial<User>) => {
    if (userToEdit) {
      updateUserMutation.mutate({
        userId: userToEdit.id,
        updatedData,
      });
      setIsEditModalOpen(false);
    }
  };

  const handleDelete = (id: number, name: string) => {
    setUserIdToDelete(id);
    setUserNameToDelete(name);
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    if (userIdToDelete) {
      const { currentUser, clearUser } = useUserStore.getState();
      deleteUserMutation(userIdToDelete, {
        onSuccess: () => {
          if (currentUser?.id === userIdToDelete) {
            clearUser();
            localStorage.removeItem("token");
            window.location.reload();
          }
        },
      });
      setIsModalOpen(false);
      setUserIdToDelete(null);
      setUserNameToDelete(null);
    }
  };

  const cancelDelete = () => {
    setIsModalOpen(false);
    setUserIdToDelete(null);
    setUserNameToDelete(null);
  };

  const columns = React.useMemo<ColumnDef<User>[]>(() => [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "name",
      cell: (info) => info.getValue(),
      header: "Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "role",
      header: "Role",
    },
    {
      id: "action",
      header: "Action",
      cell: ({ row }) => (
        <div className="flex gap-3">
          <button
            className="border-[2px] border-[#59B17A] border-opacity-50 rounded-[50%] p-2"
            onClick={() => handleEdit(row.original)}
          >
            <CustomIcon
              id={"edit"}
              size={14}
              className=" stroke-[#59B17A] fill-none"
            />
          </button>
          <button
            className="border-[2px] border-[#E85050] border-opacity-50 rounded-[50%] p-2"
            onClick={() => handleDelete(row.original.id, row.original.name)}
          >
            <CustomIcon
              id={"trash2"}
              size={14}
              className="stroke-[#E85050] fill-none"
            />
          </button>
        </div>
      ),
    },
  ]);

  return (
    <div>
      <div className="flex justify-end items-center gap-5 mr-[12px]">
        <button
          className={`px-3 py-2 text-sm rounded-lg border-[2px] transition-all ${
            isCreateModalOpen
              ? "bg-[#BEDBB0] text-black border-[#BEDBB0]"
              : "bg-transparent text-white border-[#BEDBB0] hover:bg-[#BEDBB0] hover:text-black"
          }`}
          onClick={handleCreateUser}
        >
          Register New User
        </button>
        <FilterIcon />
      </div>
      <Table data={users} columns={columns} totalCount={totalCount} />
      <CustomModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Register New User"
      >
        <CreateUserForm onSubmit={handleCreateUserSubmit} />
      </CustomModal>

      <DeleteModal
        isOpen={isModalOpen}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        message={`Are you sure you want to delete ${userNameToDelete}?`}
        confirmText="Yes"
        cancelText="No"
      />

      <CustomModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit User"
      >
        {userToEdit && (
          <EditUserForm
            defaultValues={{ name: userToEdit.name, email: userToEdit.email }}
            onSubmit={handleEditSubmit}
            onCancel={() => setIsEditModalOpen(false)}
          />
        )}
      </CustomModal>
    </div>
  );
};

export default UserManagementPage;
