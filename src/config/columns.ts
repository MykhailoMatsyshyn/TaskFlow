// // src/config/columns.ts
// import { ColumnDef } from "@tanstack/react-table";
// import { User } from "../types/user";

// export const columns: ColumnDef<User>[] = [
//   {
//     accessorKey: "id",
//     header: "ID",
//     footer: (props) => props.column.id,
//     filter: "includes",
//   },
//   {
//     accessorKey: "name",
//     cell: (info) => info.getValue(),
//     header: "Name",
//     footer: (props) => props.column.id,
//     filter: "includes",
//   },
//   {
//     accessorKey: "email",
//     header: "Email",
//     footer: (props) => props.column.id,
//     filter: "includes",
//   },
//   {
//     accessorKey: "role",
//     header: "Role",
//     footer: (props) => props.column.id,
//     filter: "includes",
//   },
//   {
//     id: "actions", // Вказуємо ідентифікатор для цієї колонки
//     header: "Actions", // Назва колонки
//     cell: ({ row }) => (
//       <div>
//         <button
//           className="border-[2px] border-[#59B17A] border-opacity-50 rounded-[50%] p-2"
//           onClick={() => handleEdit(row.original.id)}
//         >
//           <CustomIcon id={"edit"} size={16} className="stroke-[#59B17A] fill-none" />
//         </button>
//         <button
//           className="border-[2px] border-[#E85050] border-opacity-50 rounded-[50%] p-2"
//           onClick={() => handleDelete(row.original.id)}
//         >
//           <CustomIcon
//             id={"trash2"}
//             size={16}
//             className="stroke-[#E85050] fill-none"
//           />
//         </button>
//       </div>
//     ),
//   },
// ];
