import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/auth/useAuth";

interface PrivateRouteProps {
  component: JSX.Element;
  redirectTo?: string;
  allowedRoles?: string[];
}

/**
 * PrivateRoute - A route guard that ensures only authenticated users can access certain pages.
 *
 * Features:
 * - Redirects unauthenticated users to the specified `redirectTo` route.
 * - Optionally restricts access to specific user roles (`allowedRoles`).
 *
 * @param {JSX.Element} component - The protected component to render.
 * @param {string} [redirectTo="/welcome"] - The path to redirect unauthenticated users.
 * @param {string[]} [allowedRoles=[]] - A list of allowed roles for access.
 * @returns {JSX.Element} - The authorized component or a redirect.
 */
export const PrivateRoute = ({
  component,
  redirectTo = "/welcome",
  allowedRoles = [],
}: PrivateRouteProps) => {
  const { isLoggedIn, userRole } = useAuth();

  // If the user is not logged in, redirect to the specified route
  if (!isLoggedIn) {
    return <Navigate to={redirectTo} />;
  }

  // If allowedRoles are specified and the user's role is not permitted, redirect
  const isAuthorized =
    allowedRoles.length === 0 || allowedRoles.includes(userRole || "");

  return isAuthorized ? component : <Navigate to={redirectTo} />;
};
