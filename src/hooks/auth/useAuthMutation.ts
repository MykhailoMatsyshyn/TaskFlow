import { useQueryClient, useMutation } from "@tanstack/react-query";
import { registerUser, loginUser } from "../../api/authService";
import {
  RegisterUserData,
  LoginCredentials,
  AuthResponse,
  AuthType,
} from "../../types/auth";
import useUserStore from "../../stores/auth/userStore";
import { toast } from "react-toastify";

/**
 * Custom hook for handling user authentication (register/login).
 * @param {AuthType} type - The type of authentication ("register" or "login").
 * @returns {UseMutationResult<AuthResponse, Error, RegisterUserData | LoginCredentials>} - The mutation for handling authentication.
 */
const useAuthMutation = (type: AuthType) => {
  const { setCurrentUser } = useUserStore(); // Access user state management
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
        queryClient.invalidateQueries({ queryKey: ["users"] });
      }
    },
    onError: (error: Error) => {
      console.error("Auth Error:", error.message);
      toast.error(
        type === "register"
          ? "Registration failed. Please try again."
          : "Login failed. Please check your credentials."
      );
    },
  });
};

export default useAuthMutation;
