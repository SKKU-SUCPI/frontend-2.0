import { useQuery } from "@tanstack/react-query";
import getAdminActivityLists from "@/apis/admin/getAdminActivityLists";

interface pageable {
  page: number;
  size: number;
  sort: string;
}

const useAdminActivityLists = (pageable: pageable) => {
  return useQuery({
    queryKey: ["activityLists", pageable],
    queryFn: () => getAdminActivityLists(pageable),
    enabled: !!pageable,
  });
};

export default useAdminActivityLists;
