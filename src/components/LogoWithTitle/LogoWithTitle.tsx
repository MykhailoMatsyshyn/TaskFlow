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

  return (
    <div
      className={`flex items-center justify-center gap-5 mt-[14px] mb-[25px] md:mt-[30px] md:mb-[30px] ${
        location.pathname === "/welcome" ? "" : "cursor-pointer"
      }`}
      onClick={handleClick}
    >
      <img
        src={logoIcon}
        alt="Task Flow Logo"
        className="w-10 h-10 md:w-12 md:h-12"
      />
      <h1 className="font-semibold text-[28px] tracking-tight md:text-[40px]">
        Task Flow
      </h1>
    </div>
  );
};

export default LogoWithTitle;
