import { CustomIcon } from "./CustomIcon";

interface ActionButtonsProps {
  onEdit: () => void;
  onDelete: () => void;
}

/**
 * ActionButtons Component
 *
 * Reusable component for displaying edit and delete action buttons.
 *
 * @param {Function} onEdit - Function to handle edit action.
 * @param {Function} onDelete - Function to handle delete action.
 */
const ActionButtons = ({ onEdit, onDelete }: ActionButtonsProps) => {
  return (
    <div className="flex gap-2">
      <button
        onClick={onEdit}
        aria-label="Edit"
        className="transition-transform duration-200 ease-in-out hover:scale-125"
      >
        <CustomIcon
          id="edit"
          size={16}
          className="fill-none stroke-text opacity-50"
        />
      </button>
      <button
        onClick={onDelete}
        aria-label="Delete"
        className="transition-transform duration-200 ease-in-out hover:scale-125"
      >
        <CustomIcon
          id="trash"
          size={16}
          className="fill-text stroke-none opacity-50"
        />
      </button>
    </div>
  );
};

export default ActionButtons;
