import { Link } from "react-router-dom"; // Для навігації

const users = [
  { id: "1", name: "John Doe", email: "john@example.com", role: "Admin" },
  { id: "2", name: "Jane Smith", email: "jane@example.com", role: "User" },
];

const UserManagementPage = () => {
  return (
    <div>
      <h1>User Management</h1>
      <div>
        <h2>List of Users</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  {/* Кнопки для редагування або видалення */}
                  <button>Edit</button>
                  <button onClick={() => console.log("deletnuv")}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Кнопка для додавання нового користувача (якщо потрібно) */}
      <Link to="/dashboard/users/add">Add New User</Link>
    </div>
  );
};

export default UserManagementPage;
