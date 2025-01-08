import { ColumnDef } from "@tanstack/react-table";
import Table from "../../components/Table/Table";
import { User } from "../../types/user";
import React, { useState } from "react";
import useFetchUsers, { useDeleteUser } from "../../hooks/useFetchUsers";
import { Icon } from "../../components/Icon/Icon";
import useModalStore from "../../stores/modalStore";
import Modal from "../../components/Modal/Modal";

const UserManagementPage = () => {
  const { data, isLoading, isError } = useFetchUsers();
  const { openModal, closeModal } = useModalStore();
  const { mutate: deleteUserMutation } = useDeleteUser();
  const [userIdToDelete, setUserIdToDelete] = useState<string | null>(null);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading users.</div>;
  }

  // Перевірка, чи є дані перед передачею їх в таблицю
  if (!data || data.length === 0) {
    return <div>No users available.</div>;
  }

  const handleDelete = (id: string) => {
    setUserIdToDelete(id); // Зберігаємо ID користувача для видалення
    openModal(); // Відкриваємо модальне вікно
  };

  const confirmDelete = () => {
    if (userIdToDelete) {
      deleteUserMutation(userIdToDelete); // Викликаємо мутацію для видалення
      closeModal(); // Закриваємо модальне вікно
    }
  };

  const cancelDelete = () => {
    setUserIdToDelete(null);
    closeModal(); // Закриваємо модальне вікно, якщо скасувати
  };

  // Додаємо колонки для кнопок редагування та видалення
  const columns = React.useMemo<ColumnDef<User>[]>(() => [
    {
      accessorKey: "id",
      header: "ID",
      footer: (props) => props.column.id,
    },
    {
      accessorKey: "name",
      cell: (info) => info.getValue(),
      header: "Name",
      footer: (props) => props.column.id,
    },
    {
      accessorKey: "email",
      header: "Email",
      footer: (props) => props.column.id,
    },
    {
      accessorKey: "role",
      header: "Role",
      footer: (props) => props.column.id,
    },
    {
      id: "actions", // Вказуємо ідентифікатор для цієї колонки
      header: "Actions", // Назва колонки
      cell: ({ row }) => (
        <div>
          <button
            className="border-[2px] border-[#59B17A] border-opacity-50 rounded-[50%] p-2"
            onClick={() => handleEdit(row.original.id)}
          >
            <Icon
              id={"edit"}
              size={16}
              className=" stroke-[#59B17A] fill-none"
            />
          </button>
          <button
            className="border-[2px] border-[#E85050] border-opacity-50 rounded-[50%] p-2"
            onClick={() => handleDelete(row.original.id)}
          >
            <Icon
              id={"trash2"}
              size={16}
              className="stroke-[#E85050] fill-none"
            />
          </button>
        </div>
      ),
    },
  ]);

  const handleEdit = (id: string) => {
    console.log(`Editing user with ID: ${id}`);
    // Логіка для редагування користувача
  };

  return (
    <div>
      <h1>User Management</h1>
      <Table data={data} columns={columns} />

      {/* Модальне вікно для підтвердження видалення */}
      <Modal onClose={cancelDelete}>
        <div>
          <h2>Are you sure you want to delete this user?</h2>
          <div>
            <button onClick={confirmDelete}>Yes</button>
            <button onClick={cancelDelete}>No</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default UserManagementPage;
