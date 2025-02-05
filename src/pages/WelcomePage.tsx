import { motion } from "framer-motion";
import { useAuth } from "../hooks/auth/useAuth";
import WelcomeAvatar from "../components/Welcome/WelcomeAvatar";
import WelcomeHeader from "../components/Welcome/WelcomeHeader";
import WelcomeButtons from "../components/Welcome/WelcomeButtons";

/**
 * WelcomePage - The main landing page of the app.
 *
 * Features:
 * - Displays an animated introduction.
 * - Provides navigation buttons based on authentication state.
 *
 * @returns {JSX.Element} - The animated welcome page.
 */
const WelcomePage = () => {
  const { isLoggedIn } = useAuth();

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center text-center text-[14px] text-[#161616] bg-custom-gradient"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="flex flex-col items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <WelcomeAvatar />
        <WelcomeHeader />
        <WelcomeButtons isLoggedIn={isLoggedIn} />
      </motion.div>
    </motion.div>
  );
};

export default WelcomePage;
