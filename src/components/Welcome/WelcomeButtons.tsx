import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

interface WelcomeButtonsProps {
  isLoggedIn: boolean;
}

/**
 * WelcomeButtons - Displays navigation buttons based on authentication state.
 *
 * Features:
 * - If logged in → Redirects to the dashboard.
 * - If not logged in → Provides options for login and registration.
 * - Uses Framer Motion for button animations.
 *
 * @param {boolean} isLoggedIn - Whether the user is authenticated.
 * @returns {JSX.Element} - Navigation buttons.
 */
const WelcomeButtons = ({ isLoggedIn }: WelcomeButtonsProps) => {
  return (
    <motion.div
      className="flex flex-col w-[335px] mx-auto tracking-tight font-medium"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.2 },
        },
      }}
    >
      {isLoggedIn ? (
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <NavLink
            to="/dashboard"
            className="bg-[#161616] h-[49px] text-white rounded-[8px] mb-[14px] flex items-center justify-center no-underline"
          >
            Boost Productivity Now
          </NavLink>
        </motion.div>
      ) : (
        <>
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <NavLink
              to="/auth/register"
              className="bg-[#161616] h-[49px] text-white rounded-[8px] mb-[14px] flex items-center justify-center no-underline"
            >
              Registration
            </NavLink>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <NavLink
              to="/auth/login"
              className="text-[#161616] flex items-center justify-center no-underline"
            >
              Log In
            </NavLink>
          </motion.div>
        </>
      )}
    </motion.div>
  );
};

export default WelcomeButtons;
