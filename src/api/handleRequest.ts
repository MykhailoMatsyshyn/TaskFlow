import { AxiosError } from "axios";
import axiosInstance from "./axiosInstance";

export const handleRequest = async <T, D = unknown>(
  url: string,
  data?: D
): Promise<T> => {
  try {
    const response = await axiosInstance.post<T>(url, data);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || error.message);
    }
    throw new Error("An unknown error occurred");
  }
};
