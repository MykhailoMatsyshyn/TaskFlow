import { useQueryClient, useMutation } from "@tanstack/react-query";
import { registerUser, loginUser } from "../api/authService";
import {
  RegisterUserData,
  LoginCredentials,
  AuthResponse,
  AuthType,
} from "../types/auth";
import useUserStore from "../stores/userStore";

const useAuthMutation = (type: AuthType) => {
  const { setCurrentUser } = useUserStore();
  const queryClient = useQueryClient();

  const mutationFn = (data: RegisterUserData | LoginCredentials) => {
    return type === "register"
      ? registerUser(data as RegisterUserData)
      : loginUser(data as LoginCredentials);
  };

  return useMutation<AuthResponse, Error, RegisterUserData | LoginCredentials>({
    mutationFn,
    onSuccess: (data: AuthResponse) => {
      if (type === "login") {
        localStorage.setItem("token", data.accessToken);

        setCurrentUser({
          email: data.user.email,
          role: data.user.role,
          name: data.user.name,
          id: data.user.id,
        });
      }

      if (type === "register") {
        queryClient.invalidateQueries(["users"]);
      }

      console.log(
        `${type === "register" ? "Registered" : "Logged in"} successfully:`,
        data
      );
    },
    onError: (error: Error) => {
      console.error(
        `${type === "register" ? "Registration" : "Login"} failed:`,
        error.message
      );
    },
  });
};

export default useAuthMutation;
