import {
  useReactTable,
  ColumnDef,
  flexRender,
  getCoreRowModel,
} from "@tanstack/react-table";
import { User } from "../../types/user";
import "./TableStyles.css";
import Filter from "../Filter/Filter";
import useFilterStore from "../../stores/filterStore";

const Table = ({
  data,
  columns,
  totalRows,
}: {
  data: User[];
  columns: ColumnDef<User>[];
  totalRows: number;
}) => {
  const { filters, setFilter, setPagination } = useFilterStore();

  const handleFilterChange = (
    columnId: string,
    value: string | number | undefined
  ) => {
    setFilter(columnId, value);
    setPagination(0, filters.pageSize); // Переходимо на першу сторінку при зміні фільтра
  };

  const table = useReactTable({
    data,
    columns,
    debugTable: true,
    state: {
      pagination: {
        pageIndex: filters.pageIndex,
        pageSize: filters.pageSize,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    manualFiltering: true,
    manualSorting: true,
  });

  return (
    <div className="p-2">
      <table className="h-2">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  <div
                    {...{
                      className: header.column.getCanSort()
                        ? "cursor-pointer select-none"
                        : "",
                      onClick: header.column.getToggleSortingHandler(),
                    }}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {header.column.getCanFilter() ? (
                      <div>
                        <Filter
                          column={header.column}
                          onFilterChange={handleFilterChange}
                        />
                      </div>
                    ) : null}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {data.map((_, index) => (
            <tr key={index}>
              {table
                .getRowModel()
                .rows[index]?.getVisibleCells()
                .map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex items-center gap-2">
        <button
          className="border rounded p-1"
          onClick={() => setPagination(0, filters.pageSize)}
          disabled={filters.pageIndex === 0}
        >
          {"<<"}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => setPagination(filters.pageIndex - 1, filters.pageSize)}
          disabled={filters.pageIndex === 0}
        >
          {"<"}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => setPagination(filters.pageIndex + 1, filters.pageSize)}
          disabled={
            filters.pageIndex >= Math.ceil(totalRows / filters.pageSize) - 1
          }
        >
          {">"}
        </button>
        <button
          className="border rounded p-1"
          onClick={() =>
            setPagination(
              Math.ceil(totalRows / filters.pageSize) - 1,
              filters.pageSize
            )
          }
          disabled={
            filters.pageIndex >= Math.ceil(totalRows / filters.pageSize) - 1
          }
        >
          {">>"}
        </button>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {filters.pageIndex + 1} of {Math.ceil(totalRows / filters.pageSize)}
          </strong>
        </span>
        <select
          value={filters.pageSize}
          onChange={(e) => setPagination(0, Number(e.target.value))}
        >
          {[5, 10, 20, 50].map((size) => (
            <option key={size} value={size}>
              Show {size}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Table;

//   return (
//     <div className="p-2">
//       <table className="h-2">
//         {/* <thead>
//           {table.getHeaderGroups().map((headerGroup) => (
//             <tr key={headerGroup.id}>
//               {headerGroup.headers.map((header) => (
//                 <th key={header.id}>
//                   {header.column.getCanFilter() ? (
//                     <Filter
//                       column={header.column}
//                       onFilterChange={onFilterChange}
//                     />
//                   ) : null}
//                 </th>
//               ))}
//             </tr>
//           ))}
//         </thead> */}
//         <thead>
//           {table.getHeaderGroups().map((headerGroup) => (
//             <tr key={headerGroup.id}>
//               {headerGroup.headers.map((header) => {
//                 return (
//                   <th key={header.id} colSpan={header.colSpan}>
//                     <div
//                       {...{
//                         className: header.column.getCanSort()
//                           ? "cursor-pointer select-none"
//                           : "",
//                         onClick: header.column.getToggleSortingHandler(),
//                       }}
//                     >
//                       {flexRender(
//                         header.column.columnDef.header,
//                         header.getContext()
//                       )}
//                       {{
//                         asc: " 🔼",
//                         desc: " 🔽",
//                       }[header.column.getIsSorted() as string] ?? null}
//                       {header.column.getCanFilter() ? (
//                         <div>
//                           <Filter
//                             column={header.column}
//                             onFilterChange={onFilterChange}
//                           />
//                         </div>
//                       ) : null}
//                     </div>
//                   </th>
//                 );
//               })}
//             </tr>
//           ))}
//         </thead>
//         <tbody>
//           {table.getRowModel().rows.map((row) => {
//             return (
//               <tr key={row.id}>
//                 {row.getVisibleCells().map((cell) => {
//                   return (
//                     <td key={cell.id}>
//                       {flexRender(
//                         cell.column.columnDef.cell,
//                         cell.getContext()
//                       )}
//                     </td>
//                   );
//                 })}
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//       <div className="h-2" />
//       <div className="flex items-center gap-2">
//         <button
//           className="border rounded p-1"
//           onClick={() => table.firstPage()}
//           disabled={!table.getCanPreviousPage()}
//         >
//           {"<<"}
//         </button>
//         <button
//           className="border rounded p-1"
//           onClick={() => table.previousPage()}
//           disabled={!table.getCanPreviousPage()}
//         >
//           {"<"}
//         </button>
//         <button
//           className="border rounded p-1"
//           onClick={() => table.nextPage()}
//           disabled={!table.getCanNextPage()}
//         >
//           {">"}
//         </button>
//         <button
//           className="border rounded p-1"
//           onClick={() => table.lastPage()}
//           disabled={!table.getCanNextPage()}
//         >
//           {">>"}
//         </button>
//         <span className="flex items-center gap-1">
//           <div>Page</div>
//           <strong>
//             {table.getState().pagination.pageIndex + 1} of{" "}
//             {table.getPageCount().toLocaleString()}
//           </strong>
//         </span>
//         <span className="flex items-center gap-1">
//           | Go to page:
//           <input
//             type="number"
//             min="1"
//             max={table.getPageCount()}
//             defaultValue={table.getState().pagination.pageIndex + 1}
//             onChange={(e) => {
//               const page = e.target.value ? Number(e.target.value) - 1 : 0;
//               table.setPageIndex(page);
//             }}
//             className="border p-1 rounded w-16"
//           />
//         </span>
//         <select
//           value={table.getState().pagination.pageSize}
//           onChange={(e) => {
//             table.setPageSize(Number(e.target.value));
//           }}
//         >
//           {[5, 10, 15, 20, 25].map((pageSize) => (
//             <option key={pageSize} value={pageSize}>
//               Show {pageSize}
//             </option>
//           ))}
//         </select>
//       </div>
//       <div>
//         Showing {table.getRowModel().rows.length.toLocaleString()} of{" "}
//         {table.getRowCount().toLocaleString()} Rows
//       </div>
//       {/* <pre>{JSON.stringify(table.getState().pagination, null, 2)}</pre> */}
//     </div>
//   );
// };

// export default Table;
