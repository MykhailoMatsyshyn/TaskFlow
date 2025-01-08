import { ColumnDef } from "@tanstack/react-table";
import Table from "../../components/Table/Table";
// import { User } from "../../types/user";
import React from "react";
import { faker } from "@faker-js/faker";
import useFetchUsers from "../../hooks/useFetchUsers";

// const users = [
//   { id: "1", name: "John Doe", email: "john@example.com", role: "Admin" },
//   { id: "2", name: "Jane Smith", email: "jane@example.com", role: "User" },
// ];

const newPerson = (): Person => {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    age: faker.number.int(40), // випадковий вік до 40
    visits: faker.number.int(1000), // випадкова кількість відвідувань
    progress: faker.number.int(100), // випадковий прогрес (від 0 до 100)
    status: faker.helpers.shuffle<Person["status"]>([
      "relationship",
      "complicated",
      "single",
    ])[0]!, // випадковий статус
  };
};

// Генерація масиву фейкових користувачів
export function makeFakeUsers(num: number): Person[] {
  const users: Person[] = [];
  for (let i = 0; i < num; i++) {
    users.push(newPerson()); // додаємо нового користувача
  }
  return users;
}

export type Person = {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  progress: number;
  status: "relationship" | "complicated" | "single";
  subRows?: Person[];
};

const UserManagementPage = () => {
  const token = localStorage.getItem("token");
  const { data } = useFetchUsers(token);

  console.log("UserManagementPage", data);

  const users = makeFakeUsers(30);

  const columns = React.useMemo<ColumnDef<Person>[]>(
    () => [
      {
        accessorKey: "firstName",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row.lastName,
        id: "lastName",
        cell: (info) => info.getValue(),
        header: () => <span>Last Name</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "age",
        header: () => "Age",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "visits",
        header: () => <span>Visits</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "status",
        header: "Status",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "progress",
        header: "Profile Progress",
        footer: (props) => props.column.id,
      },
    ],
    []
  );

  return (
    <div>
      <h1>User Management</h1>
      <Table data={users} columns={columns} />
    </div>
  );
};

export default UserManagementPage;
