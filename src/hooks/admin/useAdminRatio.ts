import { useQuery } from "@tanstack/react-query";
import { getAdminRatio } from "@/apis/admin/getAdminRatio";

export const useAdminRatio = () => {
  return useQuery({
    queryKey: ["adminRatio"],
    queryFn: () => getAdminRatio(),
  });
};
