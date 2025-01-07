import { User } from "./user";

// Type representing authentication types (register or login)
export type AuthType = "register" | "login";

// Interface for registration data
export interface RegisterUserData {
  email: string;
  password: string;
  name: string;
  role: "Admin" | "Project Manager" | "Team Member";
}

// Interface for login credentials
export interface LoginCredentials {
  email: string;
  password: string;
}

// Interface for server response
export interface AuthResponse {
  accessToken: string;
  user: User;
}
