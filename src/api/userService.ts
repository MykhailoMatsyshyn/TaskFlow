import { User } from "../types/user";
import axiosInstance from "./axiosInstance";
import { UserFilters } from "../types/filters";
import { AxiosError } from "axios";

/**
 * Fetches user info by ID.
 * @param {string} token - The authentication token.
 * @param {number} userId - The ID of the user to fetch.
 * @returns {Promise<User>} - The user object.
 * @throws {Error} - If the request fails.
 */
export const getUserInfo = async (
  token: string,
  userId: number
): Promise<User> => {
  try {
    const { data } = await axiosInstance.get<User>(`/users/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data?.message || "Error fetching user info"
      );
    }
    throw new Error("An unknown error occurred while fetching user info");
  }
};

/**
 * Fetches a list of users based on filters.
 * @param {UserFilters} filters - The filters for fetching users.
 * @returns {Promise<{ data: User[]; totalCount: number }>} - A list of users and the total count.
 * @throws {Error} - If the request fails.
 */
export const getUsers = async (
  filters: UserFilters
): Promise<{ data: User[]; totalCount: number }> => {
  try {
    const query = new URLSearchParams({
      _page: String(filters.pageIndex),
      _limit: String(filters.pageSize),
      ...(filters.name && { name_like: filters.name }),
      ...(filters.email && { email_like: filters.email }),
      ...(filters.role && { role: filters.role }),
      ...(filters.id && { id_like: filters.id }),
    }).toString();

    const response = await axiosInstance.get<User[]>(`/users?${query}`);
    return {
      data: response.data,
      totalCount: parseInt(response.headers["x-total-count"], 10),
    };
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data?.message || "Error fetching users list"
      );
    }
    throw new Error("An unknown error occurred while fetching users list");
  }
};

/**
 * Deletes a user by ID.
 * @param {number} userId - The ID of the user to delete.
 * @returns {Promise<void>} - Resolves when the user is deleted.
 * @throws {Error} - If the deletion fails.
 */
export const deleteUser = async (userId: number): Promise<void> => {
  try {
    await axiosInstance.delete(`/users/${userId}`);
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || "Error deleting user");
    }
    throw new Error("An unknown error occurred while deleting user");
  }
};

/**
 * Updates user info.
 * @param {number} userId - The ID of the user to update.
 * @param {Partial<User>} updatedData - The updated user data.
 * @returns {Promise<User>} - The updated user object.
 * @throws {Error} - If the update fails.
 */
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
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || "Error updating user");
    }
    throw new Error("An unknown error occurred while updating user");
  }
};

/**
 * Fetches team members by email filter.
 * @param {string} [emailLike] - (Optional) The email pattern to filter team members.
 * @returns {Promise<User[]>} - A list of team members.
 * @throws {Error} - If the request fails.
 */
export const getTeamMembers = async (emailLike?: string): Promise<User[]> => {
  try {
    let url = `/users?role=Team%20Member`;

    if (emailLike) {
      url += `&email_like=${encodeURIComponent(emailLike)}`;
    }

    const { data } = await axiosInstance.get<User[]>(url);
    return data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data?.message || "Error fetching team members"
      );
    }
    throw new Error("An unknown error occurred while fetching team members");
  }
};

/**
 * Fetches team members by their IDs in a single request.
 * @param {number[]} ids - An array of user IDs.
 * @returns {Promise<User[]>} - A list of team members.
 * @throws {Error} - If the request fails.
 */
export const getTeamMembersByIds = async (ids: number[]): Promise<User[]> => {
  try {
    if (ids.length === 0) return [];

    const query = ids.map((id) => `id_like=${id}`).join("&");
    const url = `/users?${query}`;

    const { data } = await axiosInstance.get<User[]>(url);
    return data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data?.message ||
          "Error fetching team members by multiple IDs"
      );
    }
    throw new Error(
      "An unknown error occurred while fetching team members by multiple IDs"
    );
  }
};
