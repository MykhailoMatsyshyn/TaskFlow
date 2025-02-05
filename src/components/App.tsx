import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Suspense, lazy, useMemo } from "react";
import { RestrictedRoute } from "../routes/RestrictedRoute";
import { PrivateRoute } from "../routes/PrivateRoute";
import { useFetchUser } from "../hooks/users/useUsers";
import useUserStore from "../stores/auth/userStore";
import { useEffect } from "react";
import Modal from "react-modal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainLoader from "./Loaders/MainLoader";

// Set the root element for modal dialogs
Modal.setAppElement("#root");

// Lazy load pages for improved performance (code splitting)
const WelcomePage = lazy(() => import("../pages/WelcomePage"));
const AuthPage = lazy(() => import("../pages/AuthPage"));
const Layout = lazy(() => import("./Layout/Layout"));
const ProjectPage = lazy(() => import("../pages/ProjectPage"));
const MainDashboardPage = lazy(() => import("../pages/MainDashboardPage"));
const UserManagementPage = lazy(() => import("../pages/UserManagementPage"));

export default function App() {
  // Fetch user data from API
  const { data, isLoading, isError } = useFetchUser();
  const { setCurrentUser, currentUser } = useUserStore();
  const location = useLocation();

  // Prevent unnecessary re-renders by memoizing the user data as a JSON string
  const userDataStr = useMemo(() => JSON.stringify(data), [data]);

  // Update Zustand store with user data when it changes
  useEffect(() => {
    if (data && userDataStr !== JSON.stringify(currentUser)) {
      setCurrentUser(data);
    }
  }, [userDataStr, currentUser, setCurrentUser, data]);

  useEffect(() => {
    const theme = localStorage.getItem("theme") || "light";
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Show a loading indicator while fetching user data
  if (isLoading) return <MainLoader fullScreen={true} />;

  // Show an error message if user data cannot be retrieved
  if (isError) return <div>Error loading user data!</div>;

  // Define a list of valid routes (basic validation)
  const validRoutes = ["/dashboard", "/users", "/dashboard/:slug"];

  return (
    <>
      {/* Suspense wrapper for lazy-loaded components */}
      <Suspense fallback={<MainLoader fullScreen={true} />}>
        <Routes>
          {/* Public pages (accessible without authentication) */}
          <Route path="/welcome" element={<WelcomePage />} />

          {/* Restricted routes (only for unauthenticated users) */}
          <Route
            path="/auth/:id"
            element={<RestrictedRoute component={<AuthPage />} />}
          />

          {/* Private routes (accessible only for authenticated users) */}
          <Route element={<PrivateRoute component={<Layout />} />}>
            <Route path="/dashboard" element={<MainDashboardPage />} />
            <Route
              path="/users"
              element={
                <PrivateRoute
                  component={<UserManagementPage />}
                  redirectTo="/dashboard"
                  allowedRoles={["Admin"]}
                />
              }
            />
            <Route
              path="/dashboard/:slug"
              element={<PrivateRoute component={<ProjectPage />} />}
            />
          </Route>

          {/* Redirect unknown routes to a valid page */}
          <Route
            path="*"
            element={
              validRoutes.includes(location.pathname) ? (
                <Navigate to="/dashboard" />
              ) : (
                <Navigate to="/welcome" />
              )
            }
          />
        </Routes>
      </Suspense>

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}
