import { kebabCase } from "lodash";
import React from "react";

interface StatusFilterProps {
  statuses: { label: string; color: string }[];
  currentStatus: string;
  setFilter: (key: string, value: string) => void;
  onReset: () => void;
}

const StatusFilter: React.FC<StatusFilterProps> = ({
  statuses,
  currentStatus,
  setFilter,
  onReset,
}) => {
  const handleStatusChange = (status: string) => {
    setFilter("status", status === "All" ? "" : kebabCase(status));
  };

  const isAllActive = currentStatus === "";

  return (
    <div className="flex flex-col items-start gap-3 mb-[14px]">
      <div className="flex items-center justify-between w-full">
        <h4>Status</h4>
        <button
          onClick={onReset}
          className="text-white/50 text-sm font-light underline hover:text-white transition"
        >
          Show all
        </button>
      </div>
      <ul className="flex flex-col gap-2 w-full">
        {statuses.map(({ label, color }) => (
          <li key={label} className="flex items-center gap-3">
            <button
              onClick={() => handleStatusChange(label)}
              className={`flex items-center gap-2 w-full px-3 py-2 text-sm rounded-lg transition ${
                (label === "All" && currentStatus === "") ||
                currentStatus === kebabCase(label)
                  ? "bg-white/10 text-white"
                  : "bg-transparent text-white/50 hover:bg-white/5"
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

// import React from "react";
// import useTaskFilterStore from "../../../stores/TaskFilterStore";
// import { kebabCase } from "lodash";

// const StatusFilter: React.FC = () => {
//   const setFilter = useTaskFilterStore((state) => state.setFilter);
//   const currentStatus = useTaskFilterStore((state) => state.filters.status);

//   const statuses = [
//     { label: "To Do", color: "#8FA1D0" },
//     { label: "In Progress", color: "#E09CB5" },
//     { label: "Done", color: "#BEDBB0" },
//     { label: "All", color: "rgba(255, 255, 255, 0.5)" },
//   ];

//   const handleStatusChange = (status: string) => {
//     setFilter("status", status === "All" ? "" : kebabCase(status));
//   };

//   return (
//     <div className="flex flex-col items-start gap-3 mb-[14px]">
//       <div className="flex items-center justify-between w-full">
//         <h4>Status</h4>
//         <button
//           onClick={() => handleStatusChange("All")}
//           className="text-white/50 text-sm font-light underline hover:text-white transition"
//         >
//           Show all
//         </button>
//       </div>
//       <ul className="flex flex-col gap-2 w-full">
//         {statuses.map(({ label, color }) => (
//           <li key={label} className="flex items-center gap-3">
//             <button
//               onClick={() => handleStatusChange(label)}
//               className={`flex items-center gap-2 w-full px-3 py-2 text-sm rounded-lg transition ${
//                 currentStatus === kebabCase(label)
//                   ? "bg-white/10 text-white"
//                   : "bg-transparent text-white/50 hover:bg-white/5"
//               }`}
//             >
//               <span
//                 className="inline-block w-3 h-3 rounded-full"
//                 style={{ backgroundColor: color }}
//               ></span>
//               {label}
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default StatusFilter;
