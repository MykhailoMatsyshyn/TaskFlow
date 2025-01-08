import {
  RegisterUserData,
  LoginCredentials,
  AuthResponse,
} from "../types/auth";
import { User } from "../types/user";
import { handleRequest } from "./handleRequest";
import axiosInstance from "./axiosInstance";

export const registerUser = (
  userData: RegisterUserData
): Promise<AuthResponse> => {
  return handleRequest<AuthResponse, RegisterUserData>("/register", userData);
};

export const loginUser = (
  credentials: LoginCredentials
): Promise<AuthResponse> => {
  return handleRequest<AuthResponse, LoginCredentials>("/login", credentials);
};

export const getUserInfo = (token: string, userId: string): Promise<User> => {
  return axiosInstance
    .get<User>(`/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(
        error.response?.data?.message || "Error fetching user info"
      );
    });
};

export const getUsers = (token: string | null): Promise<User[]> => {
  return axiosInstance
    .get<User[]>("/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(
        error.response?.data?.message || "Error fetching users list"
      );
    });
};
