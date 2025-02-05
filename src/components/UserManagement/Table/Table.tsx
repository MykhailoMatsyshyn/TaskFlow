import {
  useReactTable,
  ColumnDef,
  flexRender,
  getCoreRowModel,
} from "@tanstack/react-table";
import { User } from "../../../types/user";
import TableFilters from "./TableFilters";
import useUsersFilterStore from "../../../stores/filters/UsersFilterStore";
import TablePagination from "./TablePagination";

/**
 * Table Component
 *
 * This component renders a data table for displaying user information.
 * It supports sorting, filtering, and pagination, utilizing `@tanstack/react-table`.
 *
 * Props:
 * - `data`: The array of user objects to be displayed in the table.
 * - `columns`: Column definitions specifying how data should be rendered.
 * - `totalCount`: The total number of users (used for pagination calculations).
 *
 * Features:
 * - Uses `useReactTable` for efficient state management.
 * - Implements column-based filtering using `TableFilters`.
 * - Supports manual pagination via `TablePagination`.
 */
const Table = ({
  data,
  columns,
  totalCount,
}: {
  data: User[];
  columns: ColumnDef<User>[];
  totalCount: number;
}) => {
  // Retrieve filter and pagination states from store
  const { filters, setPagination } = useUsersFilterStore();

  // Initialize table instance with pagination, filtering, and sorting
  const table = useReactTable({
    data,
    columns,
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

  // Calculate total pages based on total users and page size
  const totalPages = Math.ceil(totalCount / filters.pageSize);

  return (
    <div className="mr-[15px] mt-[20px] text-[var(--table-text-color-transparent)]">
      {/* Table Wrapper with Scrollbar */}
      <div className="table-wrapper custom-scrollbar pl-5">
        <table className="mb-5 w-full">
          {/* Table Header */}
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
                      {/* Render header content */}
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {/* Render column filter if applicable */}
                      {header.column.getCanFilter() ? (
                        <div>
                          <TableFilters column={header.column} />
                        </div>
                      ) : null}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          {/* Table Body */}
          <tbody>
            {data.map((_, index) => (
              <tr key={index}>
                {table
                  .getRowModel()
                  .rows[index]?.getVisibleCells()
                  .map((cell) => (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Component */}
      <TablePagination
        pageIndex={filters.pageIndex}
        pageSize={filters.pageSize}
        totalPages={totalPages}
        setPagination={setPagination}
      />
    </div>
  );
};

export default Table;
