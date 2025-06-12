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
  });
};

export default useStudentActivityList;
