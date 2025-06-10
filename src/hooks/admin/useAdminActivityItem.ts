import { useQuery } from "@tanstack/react-query";
import getAdminActivityItem from "@/apis/admin/getAdminActivityItem";

const useAdminActivityItem = (id: string) => {
  return useQuery({
    queryKey: ["adminActivityItem", id],
    queryFn: () => getAdminActivityItem(id),
    enabled: !!id,
  });
};

export default useAdminActivityItem;
