import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "../api/authService";
// import { User } from "../types/user";
// import useUserStore from "../stores/userStore";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  sub: string; // userId
  email: string;
  exp: number;
}

const useFetchUser = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Token is not available");
    // return "lol";
  }

  // Декодуємо токен, щоб отримати userId
  const decodedToken = jwtDecode<DecodedToken>(token);
  const userId = decodedToken.sub; // отримуємо userId з payload токена

  // const { setCurrentUser } = useUserStore();

  return useQuery({
    queryKey: ["user"], // This is the key for caching/query invalidation
    queryFn: () => getUserInfo(token!, userId), // The function to fetch data
    enabled: !!token && !!userId, // Ensures that the query runs only if there is a token
  });

  // return useQuery<User, Error>("user", () => getUserInfo(token!), {
  //   enabled: !!token,
  //   onSuccess: (data: User) => {
  //     setCurrentUser(data);
  //   },
  //   onError: (error: Error) => {
  //     console.error("Error fetching user info:", error);
  //   },
  // });
};

export default useFetchUser;
