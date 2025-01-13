import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Suspense, lazy } from "react";
import { RestrictedRoute } from "./RestrictedRoute";
import { PrivateRoute } from "./PrivateRoute";
import useFetchUser from "../hooks/useFetchUser";
import useUserStore from "../stores/userStore";
import { useEffect } from "react";
import UserManagementPage from "../pages/UserManagementPage/UserManagementPage";
import Modal from "react-modal";

Modal.setAppElement("#root");

const WelcomePage = lazy(() => import("../pages/WelcomePage/WelcomePage"));
const AuthPage = lazy(() => import("../pages/AuthPage/AuthPage"));
const Layout = lazy(() => import("./Layout/Layout"));

export default function App() {
  const { data, isLoading, isError } = useFetchUser();
  const { setCurrentUser, currentUser } = useUserStore();
  const location = useLocation(); // Для перевірки поточного шляху

  console.log("in App", data);

  useEffect(() => {
    console.log("in useEffect", data);
    console.log("in useEffect currentUser", currentUser);
    if (data && data !== currentUser) {
      console.log("in if useEffect", data);
      setCurrentUser(data);
    }
  }, [data, currentUser, setCurrentUser]);

  if (isLoading) {
    return <div>Loading user data...</div>;
  }

  if (isError) {
    return <div>Error loading user data!</div>;
  }

  // Функція для визначення чи є поточний шлях допустимим
  const isValidRoute = (path: string) => {
    // Додайте тут перевірки на існуючі маршрути, якщо треба
    return path.startsWith("/dashboard"); // Для прикладу перевірка на /dashboard
  };

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* Public Route */}
          <Route path="/welcome" element={<WelcomePage />} />

          {/* Restricted Routes */}
          <Route
            path="/auth/:id"
            element={<RestrictedRoute component={<AuthPage />} />}
          />

          {/* Private Routes */}
          <Route element={<PrivateRoute component={<Layout />} />}>
            <Route path="/dashboard" element={<div>Dashboard Content</div>} />
            <Route
              path="/dashboard/users"
              element={
                <PrivateRoute
                  component={<UserManagementPage />}
                  redirectTo="/dashboard"
                  allowedRoles={["Admin"]}
                />
              }
            />
          </Route>

          {/* Redirect unknown routes */}
          <Route
            path="*"
            element={
              isValidRoute(location.pathname) ? (
                <Navigate to="/dashboard" />
              ) : (
                <Navigate to="/welcome" />
              )
            }
          />
        </Routes>
      </Suspense>
    </div>
  );
}
