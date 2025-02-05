import { motion, AnimatePresence } from "framer-motion";

interface SidebarOverlayProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

/** Dark overlay for mobile sidebar */
const SidebarOverlay = ({ isOpen, toggleSidebar }: SidebarOverlayProps) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-50 z-[5] xl:hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={toggleSidebar}
      />
    )}
  </AnimatePresence>
);

export default SidebarOverlay;
