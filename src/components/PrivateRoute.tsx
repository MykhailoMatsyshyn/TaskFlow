import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface PrivateRouteProps {
  component: JSX.Element;
  redirectTo?: string;
}

export const PrivateRoute = ({
  component,
  redirectTo = "/welcome",
}: PrivateRouteProps) => {
  const isLoggedIn = useAuth();

  return isLoggedIn ? component : <Navigate to={redirectTo} />;
};
