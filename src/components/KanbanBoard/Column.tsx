import { Droppable, Draggable } from "@hello-pangea/dnd";
import Card from "./Card";
import { Task } from "../../types/task";
import AddTaskButton from "./AddTaskButton";
import { CustomIcon } from "../CustomIcon/CustomIcon";
import { useDeleteColumn } from "../../hooks/useDeleteColumn";
import { useState } from "react";
import DeleteModal from "../Modals/DeleteModal";

const Column = ({
  projectId,
  column,
  tasks,
}: {
  column: { projectId: string; id: string; title: string };
  tasks: Task[];
}) => {
  const { mutate: deleteColumn } = useDeleteColumn();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    deleteColumn({ projectId, columnId: column.id });
    closeModal();
  };

  return (
    <div className="flex flex-col w-[335px] h-full font-medium text-[14px] tracking-[-0.02em]">
      <div className="flex justify-between items-center h-[56px] w-[335px] px-5 py-[18px] mb-[14px] rounded-lg bg-[#121212]">
        <h3 className="font-bold ">{column.title}</h3>
        <div className="flex gap-2">
          <button
            onClick={() => console.log("✏️", column.id)}
            className="text-blue-500"
          >
            <CustomIcon
              id="edit"
              size={16}
              className="fill-none stroke-white/50"
            />
          </button>
          <button onClick={openModal} className="text-blue-500">
            <CustomIcon
              id="trash2"
              size={16}
              className="fill-none stroke-white/50"
            />
          </button>
        </div>
      </div>

      <Droppable droppableId={column.id} type="TASK">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex flex-col pr-[8px] mr-[-16px] overflow-y-auto overflow-x-hidden h-full custom-scrollbar`}
          >
            <div
              className={`w-[335px] relative ${
                snapshot.isDraggingOver ? "droppable-hover" : ""
              }`}
            >
              {Array.isArray(tasks) &&
                tasks.map(
                  (task, index) =>
                    task && (
                      <Draggable
                        key={task.id}
                        draggableId={task.id.toString()}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <Card task={task} />
                          </div>
                        )}
                      </Draggable>
                    )
                )}
              {provided.placeholder}
            </div>
          </div>
        )}
      </Droppable>

      <div className="mt-auto">
        <AddTaskButton status={column.id} projectId={projectId} />
      </div>

      <DeleteModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={handleDeleteConfirm}
        message={`Are you sure you want to delete the column "${column.title}"?`}
        extraMessage={`(!) All tasks in this column will also be deleted permanently.`}
      />
    </div>
  );
};

export default Column;
