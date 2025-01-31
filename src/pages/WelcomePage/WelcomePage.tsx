import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import avatarMobile from "../../assets/avatar/avatar-mobile.png";
import avatarDesktop from "../../assets/avatar/avatar-desktop.png";
import LogoWithTitle from "../../components/LogoWithTitle/LogoWithTitle";
import { useAuth } from "../../hooks/useAuth";

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
        {/* Аватар */}
        <motion.img
          src={avatarMobile}
          alt="Task Pro Avatar"
          className="block md:hidden w-[124px] h-[124px] mx-auto"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        />

        <motion.img
          src={avatarDesktop}
          alt="Task Pro Avatar"
          className="hidden md:block w-[162px] h-[162px] mx-auto"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        />

        {/* Логотип */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <LogoWithTitle />
        </motion.div>

        {/* Текст */}
        <motion.p
          className="w-[335px] md:w-[473px] mb-[48px] font-normal leading-[129%] tracking-tight"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          Supercharge your productivity and take control of your tasks with Task
          Flow – Don’t wait, start achieving your goals now!
        </motion.p>

        {/* Блок кнопок */}
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
                  className=" text-[#161616] flex items-center justify-center no-underline"
                >
                  Log In
                </NavLink>
              </motion.div>
            </>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default WelcomePage;
