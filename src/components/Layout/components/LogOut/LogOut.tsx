import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CustomIcon } from "../../../CustomIcon/CustomIcon";
import useUserStore from "../../../../stores/userStore";
import { useState } from "react";
import CustomModal from "../../../CustomModal/CustomModal";
import { toast } from "react-toastify";

const LogOut = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { setCurrentUser } = useUserStore();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmLogout = () => {
    localStorage.removeItem("token");
    setCurrentUser(null);
    navigate("/welcome");
    handleCloseModal();
    toast.success("You have successfully logged out!");
  };

  return (
    <div className="flex px-6">
      <motion.button
        onClick={handleOpenModal}
        className="flex justify-between items-center gap-[14px] bg-transparent text-base font-medium"
        animate={{ opacity: 0.7, y: isModalOpen ? -4 : 4 }} // Якщо модалка відкрита — залишається піднятим
        whileHover={{ opacity: 1, y: -4 }} // При наведенні теж піднімається
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <CustomIcon
          id="logout"
          size={32}
          color="#BEDBB0"
          className="fill-[#BEDBB0] group-hover:fill-[#9DC888]"
        />
        <p className="text-lg font-medium">Log Out</p>
      </motion.button>

      {/* Custom Modal */}
      <CustomModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Log Out"
      >
        <div className="flex flex-col justify-between min-h-[100px] w-[335px] mt-[15px]">
          {/* Message */}
          <p className="text-white text-sm leading-[1.5] break-words text-center">
            Are you sure you want to log out?
          </p>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-2">
            <button
              onClick={handleCloseModal}
              className="px-4 py-2 text-white rounded bg-white/20 transition-colors hover:bg-white/10"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmLogout}
              className="px-4 py-2 text-black rounded bg-[#BEDBB0] transition-colors hover:bg-[#9DC888] active:bg-[#9DC888]"
            >
              Log Out
            </button>
          </div>
        </div>
      </CustomModal>
    </div>
  );
};

export default LogOut;
