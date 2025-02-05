import { motion } from "framer-motion";

interface BurgerButtonProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const BurgerButton = ({ isOpen, toggleSidebar }: BurgerButtonProps) => {
  return (
    <button
      onClick={toggleSidebar}
      className="flex flex-col justify-center items-center w-6 h-10"
    >
      <motion.div
        className="w-6 h-0.5 bg-text rounded"
        animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 6 : 0 }}
        transition={{ duration: 0.3 }}
      />
      <motion.div
        className="w-6 h-0.5 bg-text rounded my-1"
        animate={{ opacity: isOpen ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      />
      <motion.div
        className="w-6 h-0.5 bg-text rounded"
        animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -6 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </button>
  );
};

export default BurgerButton;
