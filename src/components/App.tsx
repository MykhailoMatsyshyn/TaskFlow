import { Navigate, Route, Routes } from "react-router-dom";
import WelcomePage from "../pages/WelcomePage/WelcomePage";
import AuthPage from "../pages/AuthPage/AuthPage";
import { RestrictedRoute } from "./RestrictedRoute";
import { PrivateRoute } from "./PrivateRoute";

export default function App() {
  return (
    <div>
      <Routes>
        {/* Public Route*/}
        <Route path="/welcome" element={<WelcomePage />} />

        {/* Restricted Routes */}
        <Route
          path="/auth/:id"
          element={<RestrictedRoute component={<AuthPage />} />}
        />

        {/* Private Routes */}
        <Route
          path="/home"
          element={<PrivateRoute component={<WelcomePage />} />}
        />

        {/* Redirect unknown routes */}
        <Route path="*" element={<Navigate to="/welcome" />} />
      </Routes>
    </div>
  );
}
