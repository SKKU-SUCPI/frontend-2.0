import { useQuery } from "@tanstack/react-query";
import getStudentActivityItem from "@/apis/student/getStudentActivityItem";

const useStudentActivityItem = (id: string) => {
  return useQuery({
    queryKey: ["studentActivityItem", id],
    queryFn: () => getStudentActivityItem(id),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

export default useStudentActivityItem;
