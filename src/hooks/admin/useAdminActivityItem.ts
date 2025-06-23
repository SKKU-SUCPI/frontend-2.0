import { useQuery } from "@tanstack/react-query";
import getAdminActivityItem from "@/apis/admin/getAdminActivityItem";

const useAdminActivityItem = (id: string) => {
  return useQuery({
    queryKey: ["adminActivityItem", id],
    queryFn: () => getAdminActivityItem(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

export default useAdminActivityItem;
