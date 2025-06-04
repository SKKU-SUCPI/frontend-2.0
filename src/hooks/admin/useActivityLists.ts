import { useQuery } from "@tanstack/react-query";
import getActivityLists from "@/apis/admin/getActivityLists";

interface pageable {
  page: number;
  size: number;
  sort: string;
}

const useActivityLists = (pageable: pageable) => {
  return useQuery({
    queryKey: ["activityLists", pageable],
    queryFn: () => getActivityLists(pageable),
    enabled: !!pageable,
  });
};

export default useActivityLists;
