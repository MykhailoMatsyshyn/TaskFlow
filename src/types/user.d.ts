import { UserRole } from "./common";

export interface User {
  id: number;
  email: string;
  name: string;
  role: UserRole;
}
