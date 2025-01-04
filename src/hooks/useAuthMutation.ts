import { useMutation } from "@tanstack/react-query";
import { registerUser, loginUser } from "../api/authService";
import {
  RegisterUserData,
  LoginCredentials,
  AuthResponse,
  AuthType,
} from "../types/auth";

export const useAuthMutation = (type: AuthType) => {
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
