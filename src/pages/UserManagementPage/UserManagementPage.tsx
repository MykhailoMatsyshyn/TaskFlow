import { ColumnDef } from "@tanstack/react-table";
import Table from "../../components/Table/Table";
import { User } from "../../types/user";
import React, { useState } from "react";
import useFetchUsers, { useDeleteUser } from "../../hooks/useFetchUsers";
import { Icon } from "../../components/Icon/Icon";
import useModalStore from "../../stores/modalStore";
import Modal from "../../components/Modal/Modal";
import useFilterStore from "../../stores/filterStore";

const UserManagementPage = () => {
  const { filters } = useFilterStore();
  // Викликаємо хук для отримання користувачів з фільтрами та пагінацією
  const { data, isLoading, isError } = useFetchUsers(filters);

  console.log("fffff", data);

  // Тепер data містить і users, і totalCount
  const { users, totalCount } = data || { users: [], totalCount: 0 };

  console.log("totalCount", totalCount);
  console.log("users, data", users, data);
  // console.log(data.data, isLoading, isError);

  // const { data, isLoading, isError } = useFetchUsers();
  const { openModal, closeModal } = useModalStore();
  const { mutate: deleteUserMutation } = useDeleteUser();
  const [userIdToDelete, setUserIdToDelete] = useState<string | null>(null);

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  // if (isError) {
  //   return <div>Error loading users.</div>;
  // }

  // // Перевірка, чи є дані перед передачею їх в таблицю
  // if (!data || data.length === 0) {
  //   return <div>No users available.</div>;
  // }

  // const users = data?.data ?? [];

  // Якщо даних немає
  // if (users.length === 0) {
  //   console.log("lox");
  //   // return <div>No users available.</div>;
  // }

  // const handleFilterChange = (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  // ) => {
  //   const { name, value } = e.target;
  //   setFilters((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };

  // const handleFilterChange = (
  //   columnId: string,
  //   value: string | number | undefined
  // ) => {
  //   setFilters((prev) => ({
  //     ...prev,
  //     [columnId]: value,
  //     pageIndex: 1, // Скидаємо до першої сторінки при зміні фільтрів
  //   }));
  // };

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
      filter: "includes",
    },
    {
      accessorKey: "name",
      cell: (info) => info.getValue(),
      header: "Name",
      footer: (props) => props.column.id,
      filter: "includes",
    },
    {
      accessorKey: "email",
      header: "Email",
      footer: (props) => props.column.id,
      filter: "includes",
    },
    {
      accessorKey: "role",
      header: "Role",
      footer: (props) => props.column.id,
      filter: "includes",
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

      {/* <div className="filters">
        <input
          type="text"
          name="id"
          placeholder="Search by ID"
          value={filters.id}
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="name"
          placeholder="Search by Name"
          value={filters.name}
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="email"
          placeholder="Search by Email"
          value={filters.email}
          onChange={handleFilterChange}
        />
        <select name="role" value={filters.role} onChange={handleFilterChange}>
          <option value="">All Roles</option>
          <option value="Admin">Admin</option>
          <option value="Project Manager">Project Manager</option>
          <option value="Team Member">Team Member</option>
        </select>
      </div> */}
      {/* 
      <Table data={users} columns={columns} /> */}

      <Table data={users} columns={columns} totalRows={totalCount} />

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
