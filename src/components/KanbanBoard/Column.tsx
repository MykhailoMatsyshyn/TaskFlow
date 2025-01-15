import { Droppable, Draggable } from "@hello-pangea/dnd";
import Card from "./Card";
import { Task } from "../../types/task";
import AddCardButton from "./AddCardButton";
import { Icon } from "../Icon/Icon";
import { useDeleteColumn } from "../../hooks/useDeleteColumn";
import { useState } from "react";
import CustomModal from "../CustomModal/CustomModal";

const Column = ({
  projectId,
  column,
  tasks,
}: {
  column: { projectId: string; id: string; title: string };
  tasks: Task[];
}) => {
  const { mutate: deleteColumn } = useDeleteColumn();
  const [isModalOpen, setIsModalOpen] = useState(false); // Стан модалки
  const [taskToDelete, setTaskToDelete] = useState<number | null>(null); // ID задачі для видалення

  const openModal = (taskId: number) => {
    setTaskToDelete(taskId); // Зберігаємо ID задачі
    setIsModalOpen(true); // Відкриваємо модалку
  };

  const closeModal = () => {
    setTaskToDelete(null); // Скидаємо ID задачі
    setIsModalOpen(false); // Закриваємо модалку
  };

  const handleDeleteConfirm = () => {
    deleteColumn({ projectId, columnId: column.id });
    closeModal();
  };

  return (
    <div className="flex flex-col w-[347px] h-full font-medium text-[14px] tracking-[-0.02em]">
      {/* Заголовок і кнопки */}
      <div className="flex justify-between items-center h-[56px] w-[335px] px-5 py-[18px] mb-[14px] rounded-lg bg-[#121212]">
        <h3 className="font-bold ">{column.title}</h3>
        <div className="flex gap-2">
          <button
            onClick={() => console.log("✏️", column.id)}
            className="text-blue-500"
          >
            <Icon id="edit" size={16} className="fill-none stroke-white/50" />
          </button>
          <button onClick={openModal} className="text-blue-500">
            <Icon id="trash2" size={16} className="fill-none stroke-white/50" />
          </button>
        </div>
      </div>

      {/* Список задач */}
      <Droppable droppableId={column.id} type="TASK">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="flex flex-col gap-2 overflow-y-auto max-h-[64vh] custom-scrollbar"
          >
            {tasks.map((task, index) => (
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
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      {/* Кнопка додавання задач */}
      <div className="mt-auto">
        <AddCardButton />
      </div>

      {/* Модалка підтвердження видалення */}
      <CustomModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Confirm Deletion"
      >
        <p>Are you sure you want to delete this column?</p>
        <div className="flex justify-end gap-4 mt-4">
          <button
            onClick={closeModal}
            className="px-4 py-2 bg-gray-500 text-white rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleDeleteConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded"
          >
            Delete
          </button>
        </div>
      </CustomModal>
    </div>
  );
};

export default Column;
