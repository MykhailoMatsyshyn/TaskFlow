import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { User } from "../../types/user";
import Table from "./Table/Table";
import UserActions from "./UserActions";
import CustomModal from "../Modals/CustomModal";
import DeleteModal from "../Modals/DeleteModal";
import { EditUserForm } from "../Forms";
import { useUpdateUser, useDeleteUser } from "../../hooks/users/useUsers";

interface UsersTableProps {
  users: User[];
  totalCount: number;
}

/**
 * UsersTable Component
 *
 * Displays a table of users with actions for editing and deleting.
 * Manages modal state for editing and deleting users.
 */
const UsersTable: React.FC<UsersTableProps> = ({ users, totalCount }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState<User | null>(null);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  const updateUserMutation = useUpdateUser();
  const deleteUserMutation = useDeleteUser();

  // Handle user edit
  const handleEditSubmit = (updatedData: Partial<User>) => {
    if (userToEdit) {
      updateUserMutation.mutate(
        { userId: userToEdit.id, updatedData },
        {
          onSuccess: () => {
            setIsEditModalOpen(false);
          },
        }
      );
    }
  };

  // Handle user delete
  const confirmDelete = () => {
    if (userToDelete) {
      deleteUserMutation.mutate(userToDelete.id, {
        onSuccess: () => {
          setIsDeleteModalOpen(false);
        },
      });
    }
  };

  const columns = [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "name", cell: (info) => info.getValue(), header: "Name" },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "role", header: "Role" },
    {
      id: "action",
      header: "Action",
      cell: ({ row }) => (
        <UserActions
          user={row.original}
          onEdit={() => {
            setUserToEdit(row.original);
            setIsEditModalOpen(true);
          }}
          onDelete={() => {
            setUserToDelete(row.original);
            setIsDeleteModalOpen(true);
          }}
        />
      ),
    },
  ] as ColumnDef<User>[];

  return (
    <div>
      <Table data={users} columns={columns} totalCount={totalCount} />

      {/* Edit User Modal */}
      <CustomModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit User"
      >
        {userToEdit && (
          <EditUserForm
            defaultValues={{
              name: userToEdit.name,
              email: userToEdit.email,
            }}
            onSubmit={handleEditSubmit}
          />
        )}
      </CustomModal>

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        message={`Are you sure you want to delete ${userToDelete?.name}?`}
        confirmText="Yes"
        cancelText="No"
      />
    </div>
  );
};

export default UsersTable;
