import {
  RegisterUserData,
  LoginCredentials,
  AuthResponse,
} from "../types/auth";
import axiosInstance from "./axiosInstance";
import { AxiosError } from "axios";

/**
 * Registers a new user.
 * @param {RegisterUserData} userData - The registration data.
 * @returns {Promise<AuthResponse>} - The authentication response.
 */
export const registerUser = async (
  userData: RegisterUserData
): Promise<AuthResponse> => {
  try {
    const { data } = await axiosInstance.post<AuthResponse>(
      "/register",
      userData
    );
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data?.message || "Error registering user"
      );
    }
    throw new Error("An unknown error occurred");
  }
};

/**
 * Logs in a user.
 * @param {LoginCredentials} credentials - The login credentials.
 * @returns {Promise<AuthResponse>} - The authentication response.
 */
export const loginUser = async (
  credentials: LoginCredentials
): Promise<AuthResponse> => {
  try {
    const { data } = await axiosInstance.post<AuthResponse>(
      "/login",
      credentials
    );
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || "Error logging in");
    }
    throw new Error("An unknown error occurred");
  }
};
