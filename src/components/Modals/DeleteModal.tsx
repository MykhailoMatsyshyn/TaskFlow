import CustomModal from "../CustomModal/CustomModal";

const DeleteModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Deletion",
  message = "Are you sure you want to delete this item?",
  confirmText = "Delete",
  cancelText = "Cancel",
  extraMessage = "",
}) => {
  return (
    <CustomModal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="flex flex-col justify-between min-h-[100px] w-[335px]  mt-[15px]">
        <p className="text-white text-sm leading-[1.5] break-words text-center">
          {message}
        </p>
        {extraMessage && (
          <p className="text-white/50 text-xs leading-[1.4] break-words text-center mt-2">
            {extraMessage}
          </p>
        )}
        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-white rounded bg-white/20 transition-colors hover:bg-white/10"
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
