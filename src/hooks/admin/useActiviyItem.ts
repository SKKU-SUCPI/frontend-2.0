import { useQuery } from "@tanstack/react-query";
import getActivityItem from "@/apis/admin/getActivityItem";

const useActiviyItem = (id: string) => {
  return useQuery({
    queryKey: ["activityItem", id],
    queryFn: () => getActivityItem(id),
  });
};

export default useActiviyItem;
