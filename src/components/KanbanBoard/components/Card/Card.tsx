import CardDescription from "./components/CardDescription";
import CardFooter from "./components/CardFooter";

/**
 * Card Component
 *
 * Represents a single task card within a Kanban column.
 * Displays task details like title, description, priority, and deadline.
 * Also includes action buttons for editing and deleting the task.
 *
 */
const Card = ({ task }) => {
  return (
    <div className="py-1">
      <div
        className={`relative py-[14px] pl-[20px] pr-[18px] h-[154px] w-[335px] bg-[#121212] rounded-lg rounded-l-[5px]
          before:content-[''] before:absolute before:top-0 before:left-0 before:h-full before:w-[5px] before:rounded-l-[8px] ${
            task.priority === "High"
              ? "before:bg-[#BEDBB0]"
              : task.priority === "Medium"
              ? "before:bg-[#E09CB5]"
              : task.priority === "Low"
              ? "before:bg-[#8FA1D0]"
              : "before:bg-[rgba(255,255,255,0.3)]"
          }`}
      >
        {/* Заголовок */}
        <h4 className="font-semibold text-[14px] tracking-[-0.02em] text-white mb-2">
          {task.title}
        </h4>

        {/* Опис */}
        <CardDescription description={task.description} />

        <hr className="mt-[25px] mb-[14px] border-white opacity-10" />

        {/* Футер */}
        <CardFooter task={task} />
      </div>
    </div>
  );
};

export default Card;
