import { useQuery } from "@tanstack/react-query";
import { getAdminStudents } from "@/apis/admin/getAdminStudents";

export const useAdminStudents = () => {
  return useQuery({
    queryKey: ["adminStudents"],
    queryFn: () => getAdminStudents({ page: 0, size: 10 }),
  });
};
