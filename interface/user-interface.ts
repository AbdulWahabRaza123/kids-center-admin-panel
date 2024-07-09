export type RoleDetails = "admin" | "parent" | "nany";
export interface UserDetails {
  id: number;
  email: string;
  role: RoleDetails;
  created_at: any;
}
export interface DBUser {
  message: string;
  token: string;
  user: UserDetails;
}
