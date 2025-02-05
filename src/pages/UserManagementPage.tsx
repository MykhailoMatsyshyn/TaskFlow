import useUsersFilterStore from "../stores/filters/UsersFilterStore";
import { useFetchUsers } from "../hooks/users/useUsers";
import UsersTable from "../components/UserManagement/UsersTable";
import MainLoader from "../components/Loaders/MainLoader";
import FilterSwitcher from "../components/UserManagement/FilterSwitcher";
import CreateUserButton from "../components/UserManagement/CreateUserButton";

/**
 * UserManagementPage Component
 *
 * This page displays a table of users with functionalities to add, edit, and delete users.
 * It also includes filter management and handles data fetching.
 */
const UserManagementPage = () => {
  // Retrieve filter values from Zustand store
  const { filters } = useUsersFilterStore();

  // Fetch users based on current filters
  const { data, isLoading } = useFetchUsers(filters);
  const { users, totalCount } = data || { users: [], totalCount: 0 };

  return isLoading ? (
    // Display loader while fetching data
    <MainLoader />
  ) : (
    <div>
      {/* Top controls: Button for adding users & Filter switcher */}
      <div className="flex justify-end items-center gap-5 mr-[12px]">
        <CreateUserButton /> {/* Opens a modal for user registration */}
        <FilterSwitcher /> {/* Resets user filters */}
      </div>

      {/* Users table displaying list of users with edit & delete options */}
      <UsersTable users={users} totalCount={totalCount} />
    </div>
  );
};

export default UserManagementPage;
