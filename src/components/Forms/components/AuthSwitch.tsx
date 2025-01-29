import { Link } from "react-router-dom";

const AuthSwitch = ({ type }: { type: "login" | "register" }) => (
  <div className="flex justify-center space-x-6 mb-6">
    <Link
      to="/auth/register"
      className={`text-sm font-medium cursor-pointer ${
        type === "register" ? "text-white" : "text-gray-500"
      }`}
    >
      Registration
    </Link>
    <Link
      to="/auth/login"
      className={`text-sm font-medium cursor-pointer ${
        type === "login" ? "text-white" : "text-gray-500"
      }`}
    >
      Log In
    </Link>
  </div>
);

export default AuthSwitch;
