/**
 * DeadlineIndicator Component
 *
 * Displays the deadline date of the task.
 */
const DeadlineIndicator = ({ endDate }) => {
  return (
    <div className="flex flex-col text-white/50">
      <span className="font-normal text-[8px] tracking-[-0.02em] text-white/50 mb-1">
        Deadline
      </span>
      <span className="font-normal text-[10px] tracking-[-0.02em] text-[#BEDBB0]">
        {endDate
          ? new Date(endDate).toLocaleDateString("en-US")
          : "Select a date"}
      </span>
    </div>
  );
};

export default DeadlineIndicator;
