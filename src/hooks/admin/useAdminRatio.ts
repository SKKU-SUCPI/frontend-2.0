import { useQuery } from "@tanstack/react-query";
import { getAdminRatio } from "@/apis/admin/getAdminRatio";

export const useAdminRatio = () => {
  return useQuery({
    queryKey: ["adminRatio"],
    queryFn: () => getAdminRatio(),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
