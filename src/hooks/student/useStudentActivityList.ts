import { useQuery } from "@tanstack/react-query";
import getStudentActivityList from "@/apis/student/getStudentActivityList";

interface pageable {
  state: number | null;
  page: number;
  size: number;
  sort: string;
}

const useStudentActivityList = (pageable: pageable) => {
  return useQuery({
    queryKey: ["studentActivityList", pageable],
    queryFn: () => getStudentActivityList(pageable),
    enabled: !!pageable,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

export default useStudentActivityList;
