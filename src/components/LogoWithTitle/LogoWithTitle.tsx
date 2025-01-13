import { useNavigate, useLocation } from "react-router-dom";
import logoIcon from "../../assets/icons/iconTaskFlow.svg";

const LogoWithTitle = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    if (location.pathname !== "/welcome") {
      navigate("/welcome");
    }
  };

  const isDashboard = location.pathname === "/dashboard";
  return (
    <div
      className={`flex items-center ${
        isDashboard
          ? "font-semibold text-[16px] tracking-[-0.04em] text-white gap-2"
          : "justify-center mt-[14px] mb-[25px] md:mt-[30px] md:mb-[30px]"
      } ${location.pathname !== "/welcome" ? "cursor-pointer" : ""}`}
      onClick={handleClick}
    >
      <img
        src={logoIcon}
        alt="Task Flow Logo"
        className={`w-10 h-10 md:w-12 md:h-12 ${
          isDashboard ? "w-8 h-8 md:w-8 md:h-8" : ""
        }`}
      />
      <h1>Task Flow</h1>
    </div>
  );
};

export default LogoWithTitle;
