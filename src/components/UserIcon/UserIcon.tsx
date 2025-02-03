import { CustomIcon } from "../CustomIcon/CustomIcon";

/**
 * UserIcon Component
 *
 * A simple user avatar placeholder. Currently, it displays a user icon inside
 * a rounded background. Can be extended to include a profile image in the future.
 */
const UserIcon: React.FC = () => {
  return (
    <div className="w-8 h-8 bg-background rounded">
      <CustomIcon
        id={"user"}
        size={32}
        className="fill-text-inverted stroke-text-inverted"
      />
    </div>
  );
};

export default UserIcon;
