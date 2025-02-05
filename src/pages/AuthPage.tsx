import { useParams } from "react-router-dom";
import { AuthForm } from "../components/Forms";
import LogoWithTitle from "../components/UI/LogoWithTitle";

/**
 * AuthPage - The authentication page for login and registration.
 *
 * Features:
 * - Dynamically displays the login or registration form based on the URL parameter.
 * - Uses `useParams` to determine whether the user is accessing the login or registration route.
 * - Displays a logo at the top of the page.
 *
 * @returns {JSX.Element} - The authentication page.
 */
const AuthPage = () => {
  const { id } = useParams(); // Extracts the dynamic route parameter (e.g., "login" or "register")

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-custom-gradient">
      {/* Static logo positioned at the top */}
      <div className="absolute top-5">
        <LogoWithTitle />
      </div>

      {/* Renders the authentication form based on the URL parameter */}
      <AuthForm type={id === "login" ? "login" : "register"} />
    </div>
  );
};

export default AuthPage;
