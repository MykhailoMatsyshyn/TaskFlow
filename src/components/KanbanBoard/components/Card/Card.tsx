import { motion } from "framer-motion";
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
const Card = ({ task, isDragging }) => {
  return (
    <div className="py-1">
      <motion.div
        className="rounded-lg"
        initial={{
          scale: 1,
          opacity: 1,
          boxShadow: "0px 0px 0px rgba(0, 0, 0, 0)",
        }}
        animate={{
          scale: isDragging ? 1.07 : 1,
          opacity: isDragging ? 0.85 : 1,
          boxShadow: isDragging
            ? `0px 8px 16px ${
                task.priority === "High"
                  ? "rgba(190, 219, 176, 0.7)"
                  : task.priority === "Medium"
                  ? "rgba(224, 156, 181, 0.7)"
                  : task.priority === "Low"
                  ? "rgba(143, 161, 208, 0.7)"
                  : "#B7B7B7"
              }`
            : "0px 0px 0px rgba(0, 0, 0, 0)",
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div
          className={`relative py-[14px] pl-[20px] pr-[18px] h-[154px] w-[335px] bg-background-highlight rounded-lg rounded-l-[5px]
          before:content-[''] before:absolute before:top-0 before:left-0 before:h-full before:w-[5px] before:rounded-l-[8px] ${
            task.priority === "High"
              ? "before:bg-[#BEDBB0]"
              : task.priority === "Medium"
              ? "before:bg-[#E09CB5]"
              : task.priority === "Low"
              ? "before:bg-[#8FA1D0]"
              : "before:bg-[#B7B7B7]"
          }`}
        >
          {/* Заголовок */}
          <h4 className="font-semibold text-[14px] tracking-[-0.02em] text-text mb-2">
            {task.title}
          </h4>

          {/* Опис */}
          <CardDescription description={task.description} />

          <hr className="mt-[25px] mb-[14px] border-text opacity-10" />

          {/* Футер */}
          <CardFooter task={task} />
        </div>
      </motion.div>
    </div>
  );
};

export default Card;
