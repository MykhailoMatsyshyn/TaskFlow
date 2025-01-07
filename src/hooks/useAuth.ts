import useUserStore from "../stores/userStore";

export const useAuth = () => {
  const token = localStorage.getItem("token");
  const currentUser = useUserStore((state) => state.currentUser);

  return {
    isLoggedIn: !!token,
    userRole: currentUser?.role || "",
  };
};
