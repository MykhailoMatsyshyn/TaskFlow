import CustomModal from "./CustomModal";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  extraMessage?: string;
}

/**
 * DeleteModal Component
 *
 * A confirmation modal for delete actions.
 *
 * Features:
 * - Displays a title and message to confirm deletion.
 * - Provides 'Cancel' and 'Delete' buttons.
 * - Accepts optional extra messages for clarification.
 *
 * @param {DeleteModalProps} props - The properties required for the modal.
 * @returns {JSX.Element} - The delete confirmation modal.
 */
const DeleteModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Deletion",
  message = "Are you sure you want to delete this item?",
  confirmText = "Delete",
  cancelText = "Cancel",
  extraMessage = "",
}: DeleteModalProps) => {
  return (
    <CustomModal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="flex flex-col justify-between min-h-[100px] mt-[15px]">
        <p className="text-text text-sm leading-[1.5] break-words text-center">
          {message}
        </p>
        {extraMessage && (
          <p className="text-text opacity-50 text-xs leading-[1.4] break-words text-center mt-2">
            {extraMessage}
          </p>
        )}
        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-[var(--text-inverted)] rounded bg-text opacity-70 transition-colors hover:opacity-50"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-black rounded bg-[#BEDBB0] transition-colors hover:bg-[#9DC888] active:bg-[#9DC888]"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </CustomModal>
  );
};

export default DeleteModal;
