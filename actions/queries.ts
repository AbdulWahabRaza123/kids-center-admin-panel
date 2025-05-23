import { AuthStatesContext } from "@/context/auth";
import { UserActivityDetails } from "@/interface/activities-interface";
import { AttendanceDetails } from "@/interface/attendance-interface";
import { CommentDetails } from "@/interface/comment-interface";
import { feedbackDetails } from "@/interface/feedback-interface";
import { FeeDetails } from "@/interface/fees-intrface";
import { FileDetails } from "@/interface/file-interface";
import {
  NanyDetails,
  ParentDetails,
  UserDetails,
} from "@/interface/user-interface";
import { client } from "@/lib/client";
import { useQuery } from "@tanstack/react-query";

export function useAllParents(user: UserDetails, token: string) {
  return useQuery({
    enabled: !!user?.email,
    queryKey: ["parents", user?.email],
    queryFn: async () => {
      try {
        const res = await client.get(`/auth/users/parents`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = res.data;
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
    enabled: !!user?.email,
    queryKey: ["nanies", user?.email],
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
    enabled: !!user?.email,
    queryKey: ["financers", user?.email],
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
export function useAllDeactivatedParents(user: UserDetails, token: string) {
  return useQuery({
    enabled: !!user?.id,
    queryKey: ["deactivated-parents", user?.email],
    queryFn: async () => {
      try {
        const res = await client.get(`/auth/users/parents/deactivated`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = res.data;
        return data as ParentDetails[];
      } catch (e) {
        console.log(e);
        throw new Error("Invalid Error found");
      }
    },
  });
}
export function useAllDeactivatedNanies(user: UserDetails, token: string) {
  return useQuery({
    enabled: !!user?.id,
    queryKey: ["deactivated-nanies", user?.email],
    queryFn: async () => {
      try {
        const res = await client.get(`/auth/users/nanies/deactivated`, {
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
export function useAllDeactivatedFinancers(user: UserDetails, token: string) {
  return useQuery({
    enabled: !!user?.id,
    queryKey: ["deactivated-financers", user?.email],
    queryFn: async () => {
      try {
        const res = await client.get(`/auth/users/financers/deactivated`, {
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
        const res = await client.get(`/activities/all-data`, {
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
export function useAllFees(user: UserDetails, token: string) {
  return useQuery({
    enabled: !!user?.id,
    queryKey: ["fees", user?.id],
    queryFn: async () => {
      try {
        const res = await client.get(`/parent/fee/all`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = res.data;
        return data as FeeDetails[];
      } catch (e) {
        console.log(e);
        throw new Error("Invalid Error found");
      }
    },
  });
}
export function useAllFiles(user: UserDetails, token: string) {
  return useQuery({
    enabled: !!user?.id,
    queryKey: ["files", user?.id],
    queryFn: async () => {
      try {
        const res = await client.get(`/parent/file/all`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = res.data;
        return data as FileDetails[];
      } catch (e) {
        console.log(e);
        throw new Error("Invalid Error found");
      }
    },
  });
}
export function useAllComments(user: UserDetails, token: string) {
  return useQuery({
    enabled: !!user?.id,
    queryKey: ["comments", user?.id],
    queryFn: async () => {
      try {
        const res = await client.get(`/comment/all`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = res.data;
        return data as CommentDetails[];
      } catch (e) {
        console.log(e);
        throw new Error("Invalid Error found");
      }
    },
  });
}
export function useAllFeedback(user: UserDetails, token: string) {
  return useQuery({
    enabled: !!user?.id,
    queryKey: ["feedback", user?.id],
    queryFn: async () => {
      try {
        const res = await client.get(`/feedback`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = res.data;
        return data as feedbackDetails[];
      } catch (e) {
        console.log(e);
        throw new Error("Invalid Error found");
      }
    },
  });
}
