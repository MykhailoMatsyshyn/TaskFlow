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
  totalCount,
}: {
  data: User[];
  columns: ColumnDef<User>[];
  totalCount: number;
}) => {
  const { filters, setPagination } = useFilterStore();

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

  const totalPages = Math.ceil(totalCount / filters.pageSize);

  return (
    <div className="mr-[15px] mt-[20px] text-white/50">
      <table className="mb-5 w-full">
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
                        <Filter column={header.column} />
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
      <div className="flex items-center justify-between mt-4">
        <div className="text-base text-white/60">
          <span>
            Total Users: <strong>{totalCount}</strong>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            className="px-3 py-1 text-sm text-white border border-white/20 rounded hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            onClick={() => setPagination(1, filters.pageSize)}
            disabled={filters.pageIndex === 1}
            aria-label="First Page"
          >
            {"<<"}
          </button>
          <button
            className="px-3 py-1 text-sm text-white   border border-white/20 rounded hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            onClick={() =>
              setPagination(filters.pageIndex - 1, filters.pageSize)
            }
            disabled={filters.pageIndex === 1}
            aria-label="Previous Page"
          >
            {"<"}
          </button>
          <span className="text-sm text-white/60">
            Page <strong>{filters.pageIndex}</strong> of{" "}
            <strong>{totalPages}</strong>
          </span>
          <button
            className="px-3 py-1 text-sm text-white   border border-white/20 rounded hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            onClick={() =>
              setPagination(filters.pageIndex + 1, filters.pageSize)
            }
            disabled={filters.pageIndex >= totalPages}
            aria-label="Next Page"
          >
            {">"}
          </button>
          <button
            className="px-3 py-1 text-sm text-white   border border-white/20 rounded hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            onClick={() => setPagination(totalPages, filters.pageSize)}
            disabled={filters.pageIndex >= totalPages}
            aria-label="Last Page"
          >
            {">>"}
          </button>
          <select
            value={filters.pageSize}
            onChange={(e) => setPagination(1, Number(e.target.value))}
            className="px-3 py-1 text-sm text-white  bg-[#1f1f1f] border border-white/20 rounded hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
          >
            {[5, 10, 20, 50].map((size) => (
              <option
                key={size}
                value={size}
                className="  bg-[#1f1f1f]  text-white"
              >
                Show {size}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Table;
