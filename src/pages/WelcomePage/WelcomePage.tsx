import { NavLink } from "react-router-dom";
import avatarMobile from "../../assets/avatar/avatar-mobile.png";
import avatarDesktop from "../../assets/avatar/avatar-desktop.png";
import LogoWithTitle from "../../components/LogoWithTitle/LogoWithTitle";
import { useAuth } from "../../hooks/useAuth";

const WelcomePage = () => {
  const { isLoggedIn } = useAuth();

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

        <LogoWithTitle />

        <p className="w-[335px] md:w-[473px] mb-[48px] font-normal  leading-[129%] tracking-tight">
          Supercharge your productivity and take control of your tasks with Task
          Flow – Don’t wait, start achieving your goals now!
        </p>

        <div className="flex flex-col w-[335px] mx-auto tracking-tight font-medium">
          {isLoggedIn ? (
            <NavLink
              to="/dashboard"
              className="bg-[#161616] h-[49px] text-white rounded-[8px] mb-[14px] flex items-center justify-center no-underline"
            >
              Boost Productivity Now
            </NavLink>
          ) : (
            <>
              <NavLink
                to="/auth/register"
                className="bg-[#161616] h-[49px] text-white rounded-[8px] mb-[14px] flex items-center justify-center no-underline"
              >
                Registration
              </NavLink>

              <NavLink
                to="/auth/login"
                className=" text-[#161616]  flex items-center justify-center no-underline"
              >
                Log In
              </NavLink>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
