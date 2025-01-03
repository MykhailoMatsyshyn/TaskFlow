import { useParams } from "react-router-dom";
import AuthForm from "../../components/AuthForm/AuthForm";
import LogoWithTitle from "../../components/LogoWithTitle/LogoWithTitle";

const AuthPage = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-custom-gradient">
      <div className="absolute top-5">
        <LogoWithTitle />
      </div>

      <AuthForm type={id === "login" ? "login" : "register"} />
    </div>
  );
};

export default AuthPage;
