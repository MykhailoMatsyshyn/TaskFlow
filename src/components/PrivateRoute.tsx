import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface PrivateRouteProps {
  component: JSX.Element;
  redirectTo?: string;
  allowedRoles?: string[];
}

export const PrivateRoute = ({
  component,
  redirectTo = "/welcome",
  allowedRoles = [],
}: PrivateRouteProps) => {
  const { isLoggedIn, userRole } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to={redirectTo} />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole || "")) {
    return <Navigate to={redirectTo} />;
  }

  return component;
};
