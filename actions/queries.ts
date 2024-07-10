import { AuthStatesContext } from "@/context/auth";
import { NanyDetails, ParentDetails } from "@/interface/user-interface";
import { client } from "@/lib/client";
import { useQuery } from "@tanstack/react-query";

export function useAllParents() {
    const { user, token } = AuthStatesContext();
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
                console.log("This is res ", res)
                return data as ParentDetails[];
            } catch (e) {
                console.log(e);
                throw new Error("Invalid Error found");
            }
        },
    });
}
export function useAllNanies() {
    const { user, token } = AuthStatesContext();
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