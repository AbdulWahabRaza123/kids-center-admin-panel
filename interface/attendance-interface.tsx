export interface AttendanceDetails {
  attendanceId: number;
  createdById: number;
  createdByName: string;
  createdForId: number;
  createdForName: string;
  attendanceName: string;
  enteredDate: string; // Using string here to accommodate ISO date strings
  checkIn: string;
  note: string;
  createdAt: string; // Using string here to accommodate ISO date strings
}
