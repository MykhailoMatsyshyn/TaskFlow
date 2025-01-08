export interface User {
  id: string;
  email: string;
  name: string;
  role: "Admin" | "Project Manager" | "Team Member";
  // avatarUrl?: string; // URL аватара
}
