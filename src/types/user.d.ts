export interface User {
  id: string;
  email: string;
  name: string;
  role: "Admin" | "projectManager" | "teamMember";
  // avatarUrl?: string; // URL аватара
}
