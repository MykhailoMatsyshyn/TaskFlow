interface PaginationProps {
  pageIndex: number;
  pageSize: number;
  totalPages: number;
  setPagination: (page: number, size: number) => void;
}

/**
 * TablePagination Component
 *
 * This component provides pagination controls for navigating through pages of user data.
 * It includes buttons for first, previous, next, and last pages, as well as a dropdown to select the page size.
 *
 * Props:
 * - `pageIndex`: Current active page index.
 * - `pageSize`: Number of items per page.
 * - `totalPages`: Total number of pages.
 * - `setPagination`: Function to update the pagination state (page and page size).
 */
const TablePagination: React.FC<PaginationProps> = ({
  pageIndex,
  pageSize,
  totalPages,
  setPagination,
}) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between mt-4 gap-3">
      {/* Total users count */}
      <span className="text-base text-text opacity-60 md:ml-[20px]">
        Total Users: <strong>{totalPages * pageSize}</strong>
      </span>

      {/* Pagination controls (always visible) */}
      <div className="flex flex-wrap justify-center items-center gap-2">
        <button
          className="px-3 py-1 text-sm text-text border border-white/20 rounded hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          onClick={() => setPagination(1, pageSize)}
          disabled={pageIndex === 1}
          aria-label="First Page"
        >
          {"<<"}
        </button>
        <button
          className="px-3 py-1 text-sm text-text border border-white/20 rounded hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          onClick={() => setPagination(pageIndex - 1, pageSize)}
          disabled={pageIndex === 1}
          aria-label="Previous Page"
        >
          {"<"}
        </button>

        {/* Current page indicator */}
        <span className="text-sm text-text opacity-60">
          Page <strong>{pageIndex}</strong> of <strong>{totalPages}</strong>
        </span>

        <button
          className="px-3 py-1 text-sm text-text border border-white/20 rounded hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          onClick={() => setPagination(pageIndex + 1, pageSize)}
          disabled={pageIndex >= totalPages}
          aria-label="Next Page"
        >
          {">"}
        </button>
        <button
          className="px-3 py-1 text-sm text-text border border-white/20 rounded hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          onClick={() => setPagination(totalPages, pageSize)}
          disabled={pageIndex >= totalPages}
          aria-label="Last Page"
        >
          {">>"}
        </button>
      </div>

      {/* Page size selector (always visible) */}
      <div className="flex items-center justify-center">
        <label htmlFor="pageSize" className="text-sm text-text opacity-60 mr-2">
          Show:
        </label>
        <select
          id="pageSize"
          value={pageSize}
          onChange={(e) => setPagination(1, Number(e.target.value))}
          className="px-3 py-1 text-sm text-text bg-background border border-white/20 rounded hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
        >
          {[5, 10, 20, 50].map((size) => (
            <option key={size} value={size} className="bg-background text-text">
              {size}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default TablePagination;
