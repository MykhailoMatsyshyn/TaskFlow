import { kebabCase } from "lodash";

interface StatusFilterProps<T> {
  statuses: { label: string; color: string }[];
  currentStatus: string;
  setFilter: (key: keyof T, value: string | number[] | undefined) => void;
  onReset: () => void;
}

/**
 * StatusFilter Component
 *
 * Allows users to filter tasks or projects by status.
 * Displays a list of status options with corresponding colors.
 *
 * Features:
 * - Generic type `T` allows flexibility for different filter types.
 * - Supports resetting the status filter.
 * - Uses kebab-case formatting for values.
 *
 * @param {StatusFilterProps<T>} props - Component properties
 * @returns {JSX.Element} - A filter component for statuses.
 */
const StatusFilter = <T,>({
  statuses,
  currentStatus,
  setFilter,
  onReset,
}: StatusFilterProps<T>) => {
  // Handle status selection changes
  const handleStatusChange = (status: string) => {
    setFilter("status" as keyof T, status === "All" ? "" : kebabCase(status));
  };

  return (
    <div className="flex flex-col items-start gap-3 mb-[14px]">
      {/* Filter Header with Reset Option */}
      <div className="flex items-center justify-between w-full text-text">
        <h4>Status</h4>
        <button
          onClick={onReset}
          className="opacity-50 text-sm font-light underline hover:text-text hover:opacity-100 transition"
        >
          Show all
        </button>
      </div>

      {/* Status Options List */}
      <ul className="flex flex-col gap-2 w-full">
        {statuses.map(({ label, color }) => (
          <li key={label} className="flex items-center gap-3">
            <button
              onClick={() => handleStatusChange(label)}
              className={`flex items-center gap-2 w-full px-3 py-2 text-sm rounded-lg transition ${
                (label === "All" && currentStatus === "") ||
                currentStatus === kebabCase(label)
                  ? "bg-[var(--project-list-scrollbar-track)] text-text"
                  : "bg-transparent text-text opacity-50 hover:bg-white/5"
              }`}
            >
              <span
                className="inline-block w-3 h-3 rounded-full"
                style={{ backgroundColor: color }}
              ></span>
              {label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StatusFilter;
