import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface RestrictedRouteProps {
  component: JSX.Element;
  redirectTo?: string;
}

export const RestrictedRoute = ({
  component,
  redirectTo = "/home",
}: RestrictedRouteProps) => {
  const isLoggedIn = useAuth();

  return isLoggedIn ? <Navigate to={redirectTo} /> : component;
};
