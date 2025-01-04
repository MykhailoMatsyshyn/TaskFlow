import {
  RegisterUserData,
  LoginCredentials,
  AuthResponse,
} from "../types/auth";
import { handleRequest } from "./handleRequest";

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
