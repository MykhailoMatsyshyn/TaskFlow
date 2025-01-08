import { jwtDecode } from "jwt-decode";
import useUserStore from "../stores/userStore";

interface DecodedToken {
  sub: string; // userId
  email: string;
  exp: number;
}

export const useAuth = () => {
  const token = localStorage.getItem("token");
  const currentUser = useUserStore((state) => state.currentUser);

  let userId = "";
  if (token) {
    const decodedToken = jwtDecode<DecodedToken>(token);
    userId = decodedToken.sub;
  }

  return {
    isLoggedIn: !!token,
    userRole: currentUser?.role || "",
    userId,
  };
};
