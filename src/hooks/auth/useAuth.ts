import { jwtDecode } from "jwt-decode";
import useUserStore from "../../stores/auth/userStore";

/**
 * Interface representing the decoded JWT token.
 */
interface DecodedToken {
  sub: string; // User ID from token
  email: string; // User email from token
  exp: number; // Token expiration timestamp
}

/**
 * Custom hook for handling user authentication state.
 * Retrieves the user's authentication token from localStorage and decodes it.
 * Also fetches the user role from the state management store.
 *
 * @returns {object} - An object containing authentication details:
 *   - `isLoggedIn` (boolean): Whether the user is authenticated.
 *   - `userRole` (string): The user's role in the system.
 *   - `userId` (string): The user's unique identifier.
 */
export const useAuth = () => {
  const token = localStorage.getItem("token"); // Retrieve authentication token
  const currentUser = useUserStore((state) => state.currentUser); // Get user details from store

  let userId = "";

  // Decode token to extract user ID if available
  if (token) {
    const decodedToken = jwtDecode<DecodedToken>(token);
    userId = decodedToken.sub;
  }

  return {
    isLoggedIn: !!token, // Convert token presence to boolean
    userRole: currentUser?.role || "", // Get user role from store, default to empty string
    userId, // Extracted user ID from token
  };
};
