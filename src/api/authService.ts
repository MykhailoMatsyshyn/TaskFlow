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
  // console.log("      Authorization: `Bearer ${token}`,", token);

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
      // console.log(totalCount);

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

/**
 * Deletes a user by their ID from the backend.
 * @param {number} userId - The ID of the user to be deleted.
 * @returns {Promise<void>} - Resolves when the user is successfully deleted.
 * @throws {Error} - If the deletion fails, throws an error with the response message.
 */
export const deleteUser = async (userId: number): Promise<void> => {
  try {
    await axiosInstance.delete(`/users/${userId}`);
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Error deleting user");
  }
};

export const updateUser = async (
  userId: number,
  updatedData: Partial<User>
): Promise<User> => {
  try {
    const { data } = await axiosInstance.patch<User>(
      `/users/${userId}`,
      updatedData
    );
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Error updating user");
  }
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

export const getTeamMembersByIds = async (ids: number[]): Promise<User[]> => {
  const requests = ids.map((id) => axiosInstance.get<User>(`/users/${id}`));
  const responses = await Promise.all(requests);
  return responses.map((response) => response.data);
};
