import { motion } from "framer-motion";
import avatarMobile from "../../assets/avatar/avatar-mobile.png";
import avatarDesktop from "../../assets/avatar/avatar-desktop.png";

/**
 * WelcomeAvatar - Displays animated avatars for the welcome page.
 *
 * Features:
 * - Different avatars for mobile and desktop.
 * - Uses Framer Motion for smooth animations.
 *
 * @returns {JSX.Element} - The animated avatar component.
 */
const WelcomeAvatar = () => {
  return (
    <>
      <motion.img
        src={avatarMobile}
        alt="Task Pro Avatar"
        className="block md:hidden w-[124px] h-[124px] mx-auto"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      />

      <motion.img
        src={avatarDesktop}
        alt="Task Pro Avatar"
        className="hidden md:block w-[162px] h-[162px] mx-auto"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      />
    </>
  );
};

export default WelcomeAvatar;
