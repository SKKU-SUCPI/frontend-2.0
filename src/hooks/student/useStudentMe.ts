import { useQuery } from "@tanstack/react-query";
import getStudentMe from "@/apis/student/getStudentMe";

const useStudentMe = () => {
  return useQuery({
    queryKey: ["studentMe"],
    queryFn: getStudentMe,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

export default useStudentMe;

