import { useState } from "react";
import { CustomIcon } from "../../../../CustomIcon/CustomIcon";
import DeleteModal from "../../../../Modals/DeleteModal";
import CustomModal from "../../../../CustomModal/CustomModal";
import { useDeleteColumn } from "../../../../../hooks/useDeleteColumn";
import { ColumnForm } from "../../../../Forms";

/**
 * ColumnActions Component
 *
 * Provides action buttons for editing and deleting a column.
 * Includes modals for confirmation and editing.
 *
 * @param {Object} props
 * @param {string} props.projectId - The ID of the project.
 * @param {Object} props.column - The column details.
 * @param {Array} props.existingColumnTitles - List of column titles for uniqueness validation.
 */
const ColumnActions = ({ projectId, column, existingColumnTitles }) => {
  const { mutate: deleteColumn } = useDeleteColumn();
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  const openDeleteModal = () => setDeleteModalOpen(true);
  const closeDeleteModal = () => setDeleteModalOpen(false);
  const openEditModal = () => setEditModalOpen(true);
  const closeEditModal = () => setEditModalOpen(false);

  const handleDeleteConfirm = () => {
    deleteColumn({ projectId, columnId: column.id });
    closeDeleteModal();
  };

  return (
    <div className="flex gap-2">
      <button onClick={openEditModal}>
        <CustomIcon id="edit" size={16} className="fill-none stroke-white/50" />
      </button>
      <button onClick={openDeleteModal}>
        <CustomIcon
          id="trash2"
          size={16}
          className="fill-none stroke-white/50"
        />
      </button>

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteConfirm}
        message={`Are you sure you want to delete the column "${column.title}"?`}
        extraMessage={`(!) All tasks in this column will also be deleted permanently.`}
      />

      {/* Edit Column Modal */}
      <CustomModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        title="Edit Column"
      >
        <ColumnForm
          projectId={projectId}
          existingColumnTitles={existingColumnTitles}
          columnId={column.id}
          initialTitle={column.title}
        />
      </CustomModal>
    </div>
  );
};

export default ColumnActions;
