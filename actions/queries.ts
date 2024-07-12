import { AuthStatesContext } from "@/context/auth";
import { UserActivityDetails } from "@/interface/activities-interface";
import { AttendanceDetails } from "@/interface/attendance-interface";
import {
  NanyDetails,
  ParentDetails,
  UserDetails,
} from "@/interface/user-interface";
import { client } from "@/lib/client";
import { useQuery } from "@tanstack/react-query";

export function useAllParents(user: UserDetails, token: string) {
  return useQuery({
    enabled: !!user?.id,
    queryKey: ["parents", user?.id],
    queryFn: async () => {
      try {
        const res = await client.get(`/auth/users/parents`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = res.data;
        console.log("This is res ", res);
        return data as ParentDetails[];
      } catch (e) {
        console.log(e);
        throw new Error("Invalid Error found");
      }
    },
  });
}
export function useAllNanies(user: UserDetails, token: string) {
  return useQuery({
    enabled: !!user?.id,
    queryKey: ["nanies", user?.id],
    queryFn: async () => {
      try {
        const res = await client.get(`/auth/users/nanies`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = res.data;
        return data as NanyDetails[];
      } catch (e) {
        console.log(e);
        throw new Error("Invalid Error found");
      }
    },
  });
}
export function useAllFinancers(user: UserDetails, token: string) {
  return useQuery({
    enabled: !!user?.id,
    queryKey: ["financers", user?.id],
    queryFn: async () => {
      try {
        const res = await client.get(`/auth/users/financers`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = res.data;
        return data as UserDetails[];
      } catch (e) {
        console.log(e);
        throw new Error("Invalid Error found");
      }
    },
  });
}
export function useAllActivities(user: UserDetails, token: string) {
  return useQuery({
    enabled: !!user?.id,
    queryKey: ["activities", user?.id],
    queryFn: async () => {
      try {
        const res = await client.get(`/activities/all`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = res.data;
        return data as UserActivityDetails[];
      } catch (e) {
        console.log(e);
        throw new Error("Invalid Error found");
      }
    },
  });
}
export function useAllAttendance(user: UserDetails, token: string) {
  return useQuery({
    enabled: !!user?.id,
    queryKey: ["attendance", user?.id],
    queryFn: async () => {
      try {
        const res = await client.get(`/nany/attendance/all`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = res.data;
        return data as AttendanceDetails[];
      } catch (e) {
        console.log(e);
        throw new Error("Invalid Error found");
      }
    },
  });
}
