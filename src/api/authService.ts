import {
  RegisterUserData,
  LoginCredentials,
  AuthResponse,
} from "../types/auth";
import { User } from "../types/user";
import { handleRequest } from "./handleRequest";
import axiosInstance from "./axiosInstance";
import { UserFilters } from "../types/filters";

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
  console.log("      Authorization: `Bearer ${token}`,", token);

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

export const getUsers = (
  filters: UserFilters
): Promise<{ data: User[]; totalCount: number }> => {
  const query = new URLSearchParams({
    _page: String(filters.pageIndex),
    _limit: String(filters.pageSize),
    ...(filters.name && { name_like: filters.name }),
    ...(filters.email && { email_like: filters.email }),
    ...(filters.role && { role: filters.role }),
    ...(filters.id && { id_like: filters.id }),
  }).toString();

  return axiosInstance
    .get<User[]>(`/users?${query}`)
    .then((response) => {
      const totalCount = parseInt(response.headers["x-total-count"], 10); // Загальна кількість записів
      console.log(totalCount);

      return {
        data: response.data,
        totalCount,
      };
    })
    .catch((error) => {
      throw new Error(
        error.response?.data?.message || "Error fetching users list"
      );
    });
};

export const deleteUser = (userId: string): Promise<void> => {
  return axiosInstance
    .delete(`/users/${userId}`)
    .then(() => {
      console.log(`User with ID ${userId} has been deleted.`);
    })
    .catch((error) => {
      throw new Error(error.response?.data?.message || "Error deleting user");
    });
};

export const getTeamMembers = (emailLike: string): Promise<User[]> => {
  return axiosInstance
    .get<User[]>(`/users?role=Team%20Member&email_like=${emailLike}`)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(
        error.response?.data?.message || "Error fetching team members"
      );
    });
};
