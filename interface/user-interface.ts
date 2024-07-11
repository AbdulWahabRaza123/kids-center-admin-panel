export type RoleDetails = "admin" | "parent" | "nany" | "finance";
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
export interface ParentDetails {
  user_id: number;
  student_id: number;
  student_name: string;
  role: "parent";
  email: string;
  class: string;
  roll_no: string;
  phone_no: string;
  user_created_at: any;
}
export interface NanyDetails {
  user_id: number;
  email: string;
  role: "nany";
  nany_id: number;
  nany_name: string;
  qualification: string;
  reg_no: string;
  phone_no: string;
  user_created_at: any;
}
