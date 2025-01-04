// Type representing authentication types (register or login)
export type AuthType = "register" | "login";

// Interface for registration data
export interface RegisterUserData {
  email: string;
  password: string;
  name: string;
  role: string;
}

// Interface for login credentials
export interface LoginCredentials {
  email: string;
  password: string;
}

// Interface for server response (e.g., access token)
export interface AuthResponse {
  accessToken: string;
}
