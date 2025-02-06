import { User } from "../../types/user";
import { CustomIcon } from "../UI/CustomIcon";

interface UserActionsProps {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (id: number, name: string) => void;
}

const UserActions: React.FC<UserActionsProps> = ({
  user,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="flex gap-3 justify-center">
      <button
        className="border-[2px] border-[#59B17A] border-opacity-50 rounded-[50%] p-2"
        onClick={() => onEdit(user)}
      >
        <CustomIcon
          id="edit"
          size={14}
          className="stroke-[#59B17A] fill-none"
        />
      </button>
      <button
        className="border-[2px] border-[#E85050] border-opacity-50 rounded-[50%] p-2"
        onClick={() => onDelete(user.id, user.name)}
      >
        <CustomIcon
          id="trash"
          size={14}
          className="stroke-none fill-[#E85050]"
        />
      </button>
    </div>
  );
};

export default UserActions;
