import { motion } from "framer-motion";
import LogoWithTitle from "../UI/LogoWithTitle";

/**
 * WelcomeHeader - Displays the logo and motivational message.
 *
 * Features:
 * - Animated logo introduction.
 * - Motivational text to engage users.
 *
 * @returns {JSX.Element} - The welcome page header.
 */
const WelcomeHeader = () => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <LogoWithTitle />
      </motion.div>

      <motion.p
        className="w-[335px] md:w-[473px] mb-[48px] font-normal leading-[129%] tracking-tight"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        Supercharge your productivity and take control of your tasks with Task
        Flow – Don’t wait, start achieving your goals now!
      </motion.p>
    </>
  );
};

export default WelcomeHeader;
