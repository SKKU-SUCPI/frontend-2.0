import { useQuery } from "@tanstack/react-query";
import getStudentsList, {
  StudentsListResponse,
} from "@/apis/admin/getStudentsList";

export interface Pageable {
  name: string | null;
  department: string | null;
  keyword: string | null;
  page: number;
  size: number;
  sort: string;
}

const useStudentsList = (pageable: Pageable) => {
  return useQuery<StudentsListResponse>({
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
