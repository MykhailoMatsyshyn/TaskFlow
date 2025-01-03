import { Link } from "react-router-dom";
import avatarMobile from "../../assets/avatar/avatar-mobile.png";
import avatarDesktop from "../../assets/avatar/avatar-desktop.png";
import logoIcon from "../../assets/icons/iconTaskFlow.svg";

const WelcomePage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center text-center text-[14px] text-[#161616] bg-custom-gradient ">
      <div>
        <img
          src={avatarMobile}
          alt="Task Pro Avatar"
          className="block md:hidden w-[124px] h-[124px] mx-auto"
        />

        <img
          src={avatarDesktop}
          alt="Task Pro Avatar"
          className="hidden md:block w-[162px] h-[162px] mx-auto"
        />

        <div className="flex items-center justify-center gap-5 mt-[14px] mb-[25px] md:mt-[30px]mb-[30px]">
          <img
            src={logoIcon}
            alt="Task Flow Logo"
            className="w-10 h-10 md:w-12 md:h-12"
          />

          <h1 className="font-semibold text-[28px] tracking-tight md:text-[40px] ">
            Task Flow
          </h1>
        </div>

        <p className="w-[335px] md:w-[473px] mb-[48px] font-normal  leading-[129%] tracking-tight">
          Supercharge your productivity and take control of your tasks with Task
          Flow – Don’t wait, start achieving your goals now!
        </p>

        <div className="flex flex-col w-[335px] mx-auto tracking-tight font-medium">
          <button className="bg-[#161616] h-[49px] text-white rounded-[8px] mb-[14px]">
            <Link to="/auth/register">Registration</Link>
          </button>

          <button>
            <Link to="/auth/login">Log In</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
