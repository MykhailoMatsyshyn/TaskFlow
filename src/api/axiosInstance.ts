import axios from "axios";

const token = localStorage.getItem("token");

const axiosInstance = axios.create({
  // baseURL: "http://localhost:3000",
  baseURL: "https://taskflow-6ok6.onrender.com/",
  headers: {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || "Something went wrong";
    return Promise.reject(new Error(message));
  }
);

export default axiosInstance;
