import { useQuery } from "@tanstack/react-query";
import getStudentsList from "@/apis/admin/getStudentsList";

interface pageable {
  name: string | null;
  department: string | null;
  page: number;
  size: number;
  sort: string;
}

const useStudentsList = (pageable: pageable) => {
  return useQuery({
    queryKey: ["studentsList", pageable],
    queryFn: () => getStudentsList(pageable),
    enabled: !!pageable,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

export default useStudentsList;
