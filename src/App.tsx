import { Navigate, Route, Routes } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage/WelcomePage";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/welcome" />} />

        {/* <Route path="/home" element={<HomePage />} /> */}
        <Route path="/welcome" element={<WelcomePage />} />
        {/* <Route path="/auth/:id" element={<AuthPage />} /> */}
      </Routes>
    </div>
  );
}
