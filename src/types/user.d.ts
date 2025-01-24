export interface User {
  id: number;
  email: string;
  name: string;
  role: "Admin" | "Project Manager" | "Team Member";
  // avatarUrl?: string; // URL аватара
}
