import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import logoCustomIcon from "../../assets/icons/iconTaskFlow.svg";

const LogoWithTitle = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    if (location.pathname !== "/welcome") {
      navigate("/welcome");
    }
  };

  const isMainPage =
    location.pathname.startsWith("/dashboard") ||
    location.pathname.startsWith("/users");

  return (
    <motion.div
      className={`flex items-center ${
        isMainPage
          ? "font-semibold text-[16px] tracking-[-0.04em] text-white gap-2"
          : "justify-center mt-[14px] mb-[25px] md:mt-[30px] md:mb-[30px]"
      } ${location.pathname !== "/welcome" ? "cursor-pointer" : ""}`}
      onClick={handleClick}
      whileHover={{
        scale: location.pathname !== "/welcome" ? 1.1 : 1,
        rotate: location.pathname !== "/welcome" ? -4 : 0,
        x: location.pathname !== "/welcome" ? 7 : 0,
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <motion.img
        src={logoCustomIcon}
        alt="Task Flow Logo"
        className={`w-10 h-10 md:w-12 md:h-12 ${
          isMainPage ? "w-8 h-8 md:w-8 md:h-8" : ""
        }`}
        animate={{
          scale: location.pathname !== "/welcome" ? 1.05 : 1,
          rotate: location.pathname !== "/welcome" ? 0 : 0,
        }}
        transition={{ duration: 0.3 }}
      />
      <h1 className={` ${isMainPage ? "text-text" : "ml-2"}`}>Task Flow</h1>
    </motion.div>
  );
};

export default LogoWithTitle;
