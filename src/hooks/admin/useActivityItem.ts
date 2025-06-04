import { useQuery } from "@tanstack/react-query";
import getActivityItem from "@/apis/admin/getActivityItem";

const useActivityItem = (id: string) => {
  return useQuery({
    queryKey: ["activityItem", id],
    queryFn: () => getActivityItem(id),
    enabled: !!id,
  });
};

export default useActivityItem;
