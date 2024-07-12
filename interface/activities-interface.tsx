interface Activity {
  activityId: number;
  time: string;
  attributes: {
    name: string;
    value: string;
  }[];
}

interface Details {
  [key: string]: Activity;
}

export interface UserActivityDetails {
  id: number;
  createdById: number;
  createdForId: number;
  currentDate: string; //"2024-07-03T19:00:00.000Z"
  checkinTime: string;
  checkoutTime: string; //"17:00:00"
  details: Details;
}
