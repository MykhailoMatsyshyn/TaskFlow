import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/auth/useAuth";

interface RestrictedRouteProps {
  component: JSX.Element;
  redirectTo?: string;
}

/**
 * RestrictedRoute - A route guard that restricts access for authenticated users.
 *
 * Features:
 * - Redirects authenticated users to the specified `redirectTo` route.
 * - Allows unauthenticated users to access the provided `component`.
 *
 * @param {JSX.Element} component - The restricted component (e.g., login or register page).
 * @param {string} [redirectTo="/dashboard"] - The path to redirect authenticated users.
 * @returns {JSX.Element} - The component for unauthenticated users or a redirect.
 */
export const RestrictedRoute = ({
  component,
  redirectTo = "/dashboard",
}: RestrictedRouteProps) => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? <Navigate to={redirectTo} /> : component;
};
