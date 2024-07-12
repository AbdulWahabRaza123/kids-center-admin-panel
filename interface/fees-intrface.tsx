export interface FeeDetails {
  id: number;
  created_by_id: number;
  created_for_id: number;
  month: string;
  payment_date: string; // Use Date if you handle date parsing
  pay_mode: string;
  total_pending: string;
  status: "paid" | "pending" | "cancelled";
  createdByEmail: string;
  createdForEmail: string;
}
