import { createAvatar } from "@dicebear/avatars";
import * as style from "@dicebear/avatars-bottts-sprites";

const UserIcon = () => {
  const avatarSvg = createAvatar(style, {
    seed: Math.random().toString(36).substring(2, 15),
    dataUri: true,
  });

  return (
    <div>
      <img src={avatarSvg} alt="User Avatar" className="w-8 h-8 bg-black" />
    </div>
  );
};

export default UserIcon;
