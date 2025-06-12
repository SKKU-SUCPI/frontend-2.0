import { useQuery } from "@tanstack/react-query";
import getStudentActivityItem from "@/apis/student/getStudentActivityItem";

const useStudentActivityItem = (id: string) => {
  return useQuery({
    queryKey: ["studentActivityItem", id],
    queryFn: () => getStudentActivityItem(id),
  });
};

export default useStudentActivityItem;
