interface ActivityAttribute {
  name: string;
  value: string;
}

interface Activity {
  id: number;
  type: string;
  time: string;
  attributes: ActivityAttribute[];
}

interface NanyDetails {
  name: string;
  qualification: string;
  regNo: string;
  phoneNo: string;
}

interface StudentDetails {
  name: string;
  class: string;
  rollNo: string;
  phoneNo: string;
}

interface User {
  id: number;
  email: string;
  role: "nany" | "parent";
  nanyDetails?: NanyDetails | null;
  studentDetails?: StudentDetails | null;
}

export interface UserActivityDetails {
  id: number;
  createdBy: User;
  createdFor: User;
  currentDate: string;
  checkinTime: string;
  checkoutTime: string;
  activities: Activity[];
}
