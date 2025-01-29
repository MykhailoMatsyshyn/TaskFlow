import PriorityIndicator from "./PriorityIndicator";
import DeadlineIndicator from "./DeadlineIndicator";
import CardActions from "./CardActions";

/**
 * CardFooter Component
 *
 * Displays priority indicator, deadline, and task actions.
 */
const CardFooter = ({ task }) => {
  return (
    <div className="flex justify-between items-center">
      {/* Priority and Deadline Information */}
      <div className="flex items-center gap-3">
        <PriorityIndicator priority={task.priority} />
        <DeadlineIndicator endDate={task.endDate} />
      </div>

      {/* Task Actions (Edit, Delete) */}
      <CardActions task={task} />
    </div>
  );
};

export default CardFooter;
