import { Link } from "react-router-dom";

const AuthSwitch = ({ type }: { type: "login" | "register" }) => (
  <div className="flex justify-start gap-[14px] mb-[40px] text-lg font-medium cursor-pointer">
    <Link
      to="/auth/register"
      className={`${type === "register" ? "text-white" : "text-white/30"}`}
    >
      Registration
    </Link>
    <Link
      to="/auth/login"
      className={`${type === "login" ? "text-white" : "text-white/30"}`}
    >
      Log In
    </Link>
  </div>
);

export default AuthSwitch;
