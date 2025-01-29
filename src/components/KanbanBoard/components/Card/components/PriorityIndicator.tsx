/**
 * PriorityIndicator Component
 *
 * Displays the priority level of the task with a color-coded dot.
 */
const PriorityIndicator = ({ priority }) => {
  const priorityColors = {
    High: "bg-[#BEDBB0]",
    Medium: "bg-[#E09CB5]",
    Low: "bg-[#8FA1D0]",
    default: "bg-[rgba(255,255,255,0.3)]",
  };

  return (
    <div className="flex flex-col text-white/50 w-[58px]">
      <span className="font-normal text-[8px] tracking-[-0.02em] text-white/50 mb-1">
        Priority
      </span>
      <div className="flex items-center gap-2">
        <span
          className={`w-2.5 h-2.5 rounded-full ${
            priorityColors[priority] || priorityColors.default
          }`}
        ></span>
        <span className="font-normal text-[10px] tracking-[-0.02em]">
          {priority || "Without"}
        </span>
      </div>
    </div>
  );
};

export default PriorityIndicator;
